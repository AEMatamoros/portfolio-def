# Apply progress: portfolio-redesign

Change `portfolio-redesign` | store `openspec` | mode Standard (strict TDD off, no test runner) | delivery `single-pr` with recorded `size:exception` (user-approved).

Batch 1 covers units 1 to 6, batch 2 covers units 7 to 9. Units 10 to 19 are pending. Manual browser scenarios are never marked done by the apply executor; they are listed under "Deferred manual checks".

## Unit status

| Unit | Commit subject | Status |
| ---- | -------------- | ------ |
| 1 | chore: remove dead code and assets | committed (61262d1) |
| 2 | perf: remove splash screen | committed (baf95c5) |
| 3 | perf: convert images to webp | committed (028ab9c) |
| 4 | refactor(animations): css-driven split text | committed (81d4bf6) |
| 5 | build(deps): upgrade react 19, i18next 26 and tooling | committed (1b0ebd6) |
| 6 | refactor: adopt feature-first structure and single alias | committed (63c571d) |
| 7 | feat(theme): add theme provider and token palette | committed (be6b7e7) |
| 8 | feat(i18n): type nested locales and sync html lang | committed (this commit; see git log) |

## Unit 1: chore: remove dead code and assets

Work Unit Evidence

| Evidence                          | Value                                                                                                                                                          |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Focused test command and result   | `rg -n "BlurText\|ui/pagination\|ui/separator\|text-detail\|text-darksecondary\|sticky-nav\|goTop\|sidebarEffect\|sticky-header\|transformation\|items-left" src .cursor openspec/config.yaml`: no matches (exit 1); `ls` of the 8 removed paths: "No such file or directory" for each |
| Gate                              | `pnpm check`: green (tsc, eslint, prettier); `pnpm build`: green, main 330.82 kB raw / 110.76 kB gzip, Contact 89.60 kB / 31.04 kB                              |
| Runtime harness                   | `pnpm preview --port 4173` smoke via curl: `/`, favicon, main JS and CSS return 200. Visual EN/ES light/dark comparison is a deferred manual check (1.8)       |
| Rollback boundary                 | Revert the unit-1 commit: restores the 8 deleted files, the removed CSS blocks, the ShinyText self-import, the class tokens and the BlurText rule wording      |

Baseline (task 1.1, measured with `pnpm build` at 186670c because `pnpm build:analyze` opens a browser): main 330.88 kB raw / 110.79 kB gzip; Contact 89.60 kB raw / 31.04 kB gzip; image sum under `dist/assets` 5096 KB (18 png/jpg files, `du -ck`).

Notes: `src/assets/img/profile.webp` and `main-bg-dark.png` were already unreferenced and never reached `dist`. `tasks.md` and this file are committed with each unit so the working tree stays clean.

## Unit 2: perf: remove splash screen

Work Unit Evidence

| Evidence | Value |
| -------- | ----- |
| Focused test command and result | `rg -n "SplashScreen" src`: no matches (exit 1); `rg -n "text-dark\b" src`: no matches; `grep -n localStorage dist/index.html`: hit at line 9 inside `<head>` |
| Gate | `pnpm check`: green; `pnpm build`: green, main 329.85 kB raw / 110.35 kB gzip, Contact 89.60 kB / 31.04 kB |
| Runtime harness | `pnpm preview --port 4173` smoke via curl: `/`, favicon, main JS and CSS return 200. The Performance filmstrip at CPU 6x and the stored-`dark` no-flash check are deferred manual checks (2.6) |
| Rollback boundary | Revert the unit-2 commit: restores `SplashScreen.tsx`, the `main.tsx` render, the `index.html` interim script, the hero `ref` in `App.tsx` and the `heroRef` entry in `useScrollAnimation.tsx` |

Declared motion change 1: splash fade removed (also recorded in the commit body). The interim pre-paint script in `index.html` mirrors the old toggle default (adds `dark` only when `localStorage.theme === "dark"`) and is replaced by the final script in unit 7. The hero section no longer takes part in the GSAP reveal, so it can never go visible, hidden, visible.

## Unit 3: perf: convert images to webp

Work Unit Evidence

| Evidence | Value |
| -------- | ----- |
| Focused test command and result | `find dist/assets \( -name "*.webp" -o -name "*.png" -o -name "*.jpg" \) -print0 \| xargs -0 du -ck \| tail -1`: 280 KB (was 5096 KB), no png/jpg listed; `ls dist/cv`: `Alexis_Matamoros_CV_EN.pdf`, `Alexis_Matamoros_CV_ES.pdf`; `find dist/assets -name "*.pdf"`: empty; `find src \( -name "*.png" -o -name "*.jpg" \)`: empty |
| Gate | `pnpm check`: green; `pnpm build`: green, main 329.86 kB raw / 110.33 kB gzip, Contact 89.60 kB / 31.04 kB |
| Runtime harness | `pnpm preview --port 4173` via curl: `/cv/Alexis_Matamoros_CV_EN.pdf` 200 application/pdf 93416 B and `..._ES.pdf` 200 application/pdf 94831 B; EN PDF bytes identical to the original in git history. Hero sharpness at 1440 px, thumbnail framing and the per-language CV download are deferred manual checks (3.10) |
| Rollback boundary | Revert the unit-3 commit: restores the PNG/JPG originals and `src/assets/files`, removes the WebP files, `public/cv` and `src/constants/site.ts`, and returns the imports in `Hero.tsx`, `projects.ts` and `Header.tsx` |

Image pipeline: sharp-cli 5 via `pnpm dlx`. Hero patterns converted with `resize 1024 --withoutEnlargement -f webp --quality 80` (sources are already 1024x1024; 9.7 KB and 10.2 KB). The 20 project images use `resize 800 450 --fit cover --position top --withoutEnlargement -f webp --quality 80`; `--position top` is listed in `resize --help`, so it was used (task 3.1 and design section 8) instead of `attention`. Sources smaller than 800x450 are not enlarged and keep their own dimensions. Six thumbnails under 4 KB (`calendar`, `calendarb`, `expencefront`, `noimg`, `qr`, `weather`) are inlined by Vite as data URLs, so `dist/assets` holds 16 WebP files totalling 280 KB (`du -ck`).

New and edited imports in this unit use the `@/` alias (`@/constants/site`, `@/assets/img/...`); the legacy aliases disappear in unit 6.

## Unit 4: refactor(animations): css-driven split text

Work Unit Evidence

| Evidence | Value |
| -------- | ----- |
| Focused test command and result | `rg -n "react-spring" src package.json pnpm-lock.yaml`: no matches (exit 1); `grep -l "react-spring" dist/assets/*.js`: no matches; `pnpm remove @react-spring/web`: removed (6 packages dropped from the lockfile). `pnpm build:analyze` was not run because it opens a browser (`open: true`); the grep above is the substitute |
| Gate | `pnpm check`: green; `pnpm build`: green, main 289.95 kB raw / 94.22 kB gzip (was 330.88 kB / 110.79 kB at baseline), Contact 89.60 kB / 31.04 kB |
| Runtime harness | `pnpm preview --port 4173` + headless Chrome `--dump-dom` on the React 18 runtime: both hero `SplitText` roots render with `data-inview="true"` (IntersectionObserver trigger works), 179 `.split-char` letters, `sr-only` text holds the full string once, 2 `aria-hidden` letter trees; no runtime error. With `--force-prefers-reduced-motion` a screenshot shows the final hero text at once. Timing and stagger parity against the base build, and the Accessibility tree check, are deferred manual checks (4.7) |
| Rollback boundary | Revert the unit-4 commit: restores react-spring `SplitText.tsx`, the `package.json` and lockfile entries, the `index.css` split-text block and the `easing` props in `Hero.tsx`; `src/hooks/useInView.ts` is removed |

Implementation notes

- `useInView` (`src/hooks/useInView.ts`): the ref callback stores the element in state; a `useEffect` creates the `IntersectionObserver` and disconnects in cleanup; `setInView` runs only inside the observer callback. No React 19 ref cleanup is used.
- `SplitText` is a named export with the design 5.2 props. Markup: `sr-only` text plus an `aria-hidden` letter tree (`Array.from(word)`, `key={text}`, `--i` per letter, `data-last` on the last letter). The previous `@ts-nocheck` and both eslint-disable headers are gone.
- Parity details: `.split-text` stays `display: inline` like the old `<p>` (the old `overflow: hidden` had no effect on an inline box and was dropped); `delay` is still milliseconds between letters (hero name 150, lead 10); the defaults are 700 ms duration and an ease-out-cubic bezier. Hero call sites only lose the ignored `easing="easeOutCubic"` prop.
- Reduced-motion rule: the unit-4 media block uses `.split-text .split-char, .split-text[data-inview] .split-char`. A bare `.split-char { animation: none }` would lose to `.split-text[data-inview] .split-char` on specificity, so unit 9 must keep a selector of at least that specificity when it merges this rule into the single policy block.
- Observed visual difference: word gaps are real spaces (about 0.25em) instead of the old 0.3em spacer span, so the name is about 4 px narrower at 60 px and no longer shifted left by the trailing spacer. This follows design 5.2 ("separated by real spaces so lines wrap normally") and is listed for the manual side-by-side.

## Unit 5: build(deps): upgrade react 19, i18next 26 and tooling

Work Unit Evidence

| Evidence | Value |
| -------- | ----- |
| Focused test command and result | `pnpm ls react react-dom i18next react-i18next`: react 19.3.1, react-dom 19.3.1, i18next 26.4.5, react-i18next 17.0.16; `pnpm install --frozen-lockfile`: Done (lockfile consistent); `rg -n "eslint-plugin-import\|react-spring" package.json pnpm-lock.yaml`: no matches; `ls package-lock.json yarn.lock`: both absent |
| Gate | `pnpm check`: green (tsc, eslint with 0 errors and 0 warnings, prettier); `pnpm build`: green, main 383.82 kB raw / 123.14 kB gzip, Contact 111.73 kB / 38.24 kB |
| Runtime harness | `pnpm preview --port 4173` + headless Chrome `--dump-dom` on React 19 and i18next 26: the hero, Experience, Projects and Contact sections all render, 179 split letters, 2 `data-inview`, no console error besides macOS display-link noise. Sheet focus return, language switch and theme toggle are deferred manual checks (5.9) |
| Rollback boundary | Revert the unit-5 commit: restores `package.json`, `pnpm-lock.yaml`, `eslint.config.js`, `ui/input.tsx`, `ui/textarea.tsx`, the two console calls, the Footer disable comments and the `useScrollAnimation` dependency array; removes `.nvmrc`. Units 6 onward depend on it |

Dependency changes

- Added or moved: `react` and `react-dom` ^19.3.1, `i18next` ^26.4.5, `react-i18next` ^17.0.16, `@vitejs/plugin-react-swc` ^4.3.3, `eslint-plugin-react-hooks` ^7.1.1, `eslint-plugin-jsx-a11y` ^6.10.2, `gsap` ^3.15.0. Removed: `eslint-plugin-import`. `pnpm update` moved only in-range versions (for example vite 6.4.4, eslint 9.39.5, typescript-eslint 8.71.2, shadcn 4.21.5, tailwindcss 4.3.3, prettier 3.9.10); eslint 9, vite 6, typescript 5.7, `@types/node` 22, commitlint 20, lint-staged 16 and `globals` 15 did not change major. No peer conflicts; every exact target version resolved.
- Added `"packageManager": "pnpm@10.33.0"`, `"engines": { "node": ">=20.19" }` and `.nvmrc` with `22`.
- pnpm reported `Ignored build scripts: @swc/core` (the harmless "approve-builds" notice); the SWC native binding still loads and the build works.

Lint and code adjustments

- `eslint.config.js` rewritten per design 9.2 without boundaries: `defineConfig`/`globalIgnores`, `eslint-config-prettier/flat` last, react `version: "detect"`, jsx-a11y recommended on `src/**`, `reactHooks.configs.recommended.rules`, `globals.browser` only, `no-console` warn, unused vars as errors with `^_` ignores, and `NO_RELATIVE` plus a `restrict()` helper so unit 6 only adds patterns.
- Findings fixed: three `jsx-a11y/anchor-is-valid` errors on the `href="#"` placeholders in `Footer.tsx` take `{/* eslint-disable-next-line jsx-a11y/anchor-is-valid -- rebuilt in unit 9 */}` (unit 9.12 replaces the placeholders and must drop these); the two `console.log` calls in `ContactOptions.tsx` are removed; `useScrollAnimation` now lists its three section refs in the effect dependency array (new `react-hooks/exhaustive-deps` warning under v7; refs are stable, so behavior is unchanged).
- `src/hooks/useDocumentDark.ts` was left untouched: react-hooks 7.1.1 does not flag its synchronous `sync()` call (the design predicted `set-state-in-effect`), and removing it would drop a safeguard for class changes between render and effect. The file is deleted in unit 12.
- `src/components/ui/input.tsx` and `textarea.tsx` were regenerated with `pnpm dlx shadcn@latest add input textarea --overwrite --yes` (ref-as-prop, no `forwardRef`). The CLI (4.21.5) wrote `import { cn } from "cn"`, which does not resolve, so the import was restored to `@/lib/utils` and both files were formatted with Prettier. No other file was touched by the CLI.
- `src/main.tsx` and `src/i18n/init.ts` needed no change for i18next 26 or react-i18next 17 (types and runtime verified).

Bundle note (risk): react-dom 19.3.1 is about 23 KB gzip larger than 18.3.1 (esbuild minify of `react-dom/client`: 142.4 KB raw / 45.6 KB gz vs 222.9 KB raw / 68.9 KB gz), so the main chunk is 123.14 KB gzip after this unit against the final budget of < 110 KB. Unit 10 (lazy Sheet) and later units must recover roughly 13 KB gzip or the performance-budget scenario needs a budget decision at verify. Contact is 38.24 KB gzip and is expected to drop below 31 KB when axios and notiflix go in unit 16.

## Unit 6: refactor: adopt feature-first structure and single alias

Work Unit Evidence

| Evidence | Value |
| -------- | ----- |
| Focused test command and result | `rg -n "@Components\|@Hooks\|@Constants\|@Utils\|@Assets\|from \"\.\.?/" src`: no matches (exit 1); `rg -n 'from "[^"]+\.(tsx?\|jsx?)"' src`: no matches; `ls src/components/ui`: `badge button card input label sheet textarea` only; boundary probes (below) each fail `pnpm lint` and were reverted byte-identically (SHA-1 compared) |
| Gate | `pnpm check`: green; `pnpm build`: green (2191 modules), main 386.43 kB raw / 123.86 kB gzip, Contact 111.76 kB / 38.25 kB |
| Runtime harness | `pnpm preview --port 4173` via curl: `/`, favicon, main JS and CSS return 200; `/cv/Alexis_Matamoros_CV_EN.pdf` 200 (93416 B) and `..._ES.pdf` 200 (94831 B). Headless Chrome `--dump-dom`: hero pattern and project thumbnails served as `/assets/*.webp`, 179 split letters, Experience, Projects and Contact headings mounted. The full browser smoke identical to unit 5 is a deferred manual check (6.12) |
| Rollback boundary | Revert the unit-6 commit: it is move-only plus import rewrites and config, so `git revert` restores every old path, the nine aliases in `vite.config.ts` and the tsconfig files, `build.target: "esnext"` and the unit-5 `eslint.config.js` |

Boundary probes (task 6.10), each run with `pnpm lint` and reverted:

1. `import "@/features/hero/HeroSection";` prepended to `src/hooks/useDocumentDark.ts`: error `no-restricted-imports` ("config, i18n, theme and hooks must not import components, features or app").
2. `import "@/features/projects/data/projects";` prepended to `src/features/experience/ExperienceSection.tsx`: error `no-restricted-imports` ("src/features/experience must not import the app shell or sibling features; promote shared code instead").
3. `import "../hooks/useInView";` prepended to `src/lib/utils.ts`: error `no-restricted-imports` ("Use the @/ alias instead of relative imports").

Implementation notes

- Moves follow design section 1.5 exactly with `git mv` (renames preserved in history); `useContactForm.tsx` and `useScrollAnimation.tsx` became `.ts`; `src/assets`, `src/constants`, `src/utils` and `src/components/common` no longer exist. Default exports and component identifiers (`LangToogle`, `GoTop`, ...) are unchanged because the unit is move-only; later units rename them when they rebuild each file.
- Imports rewritten with one mapping script (old specifier to new `@/...` path); `main.tsx` now imports `@/app/App` without the `.tsx` suffix.
- `vite.config.ts` keeps one alias `"@": fileURLToPath(new URL("./src", import.meta.url))`, drops the `path` import and the `build` block (`target: "esnext"` removed, D20). `tsconfig.app.json` keeps `baseUrl` with only `@/*` and drops `allowImportingTsExtensions`; `tsconfig.json` keeps `baseUrl` and `paths` only (shadcn CLI); `tsconfig.node.json` drops `baseUrl` and `paths`; `components.json` is unchanged.
- `eslint.config.js` gained `FEATURES`, `NO_APP`, `NO_FEATURES_OR_APP`, `NO_UI_TIERS`, `LEAF_ONLY`, `featureOnly` and the base, app, components, infra, leaf and per-feature overrides from design 1.3. Every moved file already satisfied the import matrix, so no lint finding appeared.
- Removing `build.target: "esnext"` changed the main chunk from 123.14 to 123.86 kB gzip (default browser baseline transpiles more syntax); Contact is unchanged at 38.25 kB gzip.
- Docs that still mention the old aliases or `src/constants` (`CLAUDE.md`, `openspec/config.yaml`, `.cursor/rules/portfolio.mdc`) are intentionally left for unit 19.

## Unit 7: feat(theme): add theme provider and token palette

Work Unit Evidence

| Evidence | Value |
| -------- | ----- |
| Focused test command and result | `grep -n localStorage dist/index.html`: one hit at line 8, inside `<head>` (lines 3 to 24) and before `<body>` (line 25), ahead of the stylesheet link; `rg -n "bg-white dark:bg-black" index.html`: no matches (exit 1); `rg -n "THEME_OPTIONS\|theme-options" src`: no matches; no `.light` selector in `src/index.css` |
| Gate | `pnpm check`: green (tsc, eslint, prettier); `pnpm build`: green, main 388.55 kB raw / 124.32 kB gzip, Contact 111.76 kB / 38.25 kB |
| Runtime harness | `pnpm build && pnpm preview --port 4173` driven through headless Chrome over CDP (scratchpad script, not committed): empty storage + emulated OS dark gives `html.dark`, `color-scheme: dark`, body `oklch(0.145 0 0)` and label "Theme: System"; three clicks walk system, light, dark, system with `localStorage.theme` following and the label updating each time; light chosen under OS dark persists after reload; `theme="zzz"` falls back to system with no console error; flipping the emulated OS scheme in system mode toggles `html.dark` live; with `prefers-reduced-motion: reduce` the click applies the theme instantly; at 375 px a click on the toggle inside the sheet updates the header toggle label and `html.dark`; zero console errors. The visual View Transition reveal, the Performance filmstrip at CPU 6x and the Accessibility tree check are deferred manual checks (7.13) |
| Rollback boundary | Revert the unit-7 commit: removes `src/theme/{theme,theme-context,useTheme,theme-transition}.ts` and `ThemeProvider.tsx`, `src/app/AppProviders.tsx`; restores `theme-options.ts`, the interim `index.html` script and body classes, the old toggle, the `main.tsx` render, the `App.tsx` wrapper classes, the `clipPathExpand` CSS and the previous `--ring` values; drops the four `THEME.*` keys from `en.ts` and `es.ts` |

Implementation notes

- Theme modules follow design 2.1 as written: `theme.ts` (plain TS, mirrors the inline script), `theme-context.ts` (context, value type and `ThemeOrigin`, no components), `useTheme.ts` (`use(ThemeContext)`, throws outside the provider), `theme-transition.ts` (View Transition with `--theme-x/y/r`, skipped under reduced motion or when `document.startViewTransition` is missing) and `ThemeProvider.tsx` (`useState(readStoredMode)`, `useSyncExternalStore` for the OS scheme, `useLayoutEffect` apply, `setMode` with `flushSync` inside the transition). `writeStoredMode` swallows storage errors so a blocked store never throws.
- `ThemeToggle` is a named export: ghost icon `Button` with Sun (light), Moon (dark) or Monitor (system) chosen by an explicit conditional, `aria-label` from `t("THEME.TOGGLE", { mode })`, click passes the button rect centre. It takes an optional `className` and defaults to `text-current hover:bg-current/10 hover:text-current` so it stays legible on the inverted scrolled-header pill (black in light, near-white in dark) until unit 10 rebuilds the header.
- `Header.tsx` (rebuilt in unit 10) changed minimally: the named `ThemeToggle` import and the desktop toggle wrapper now applies the existing `linkClass(...)` colour so the ghost button, which inherits `currentColor`, is visible on the pill. No other header markup changed.
- `index.html`: the final ES5 pre-paint script sits right after `<meta charset>`, before the favicon, viewport, title, and the stylesheet link that Vite injects. `class="bg-white dark:bg-black"` is gone from `<body>`; `@layer base` supplies `bg-background`. The favicon `href` and `type` stay wrong until unit 10 (task 10.9).
- `src/index.css`: light `--ring` is `oklch(0.556 0 0)`, dark `--ring` is `oklch(0.708 0 0)` (the two values were swapped from the shadcn defaults); `@keyframes clipPathExpand` and `.dark .animate-clip-expand` are replaced by the `::view-transition-*` and `theme-reveal` rules from design 2.1.
- Flat keys `THEME.TOGGLE`, `THEME.MODE_LIGHT`, `THEME.MODE_DARK`, `THEME.MODE_SYSTEM` were added to both locale files in the existing flat style (ES values are new; no existing string changed). Unit 8 migrates them to `theme.toggle` and `theme.modes.*`.
- Declared motion change 4 (flagged for verify, the motion spec lists three): the dark-only load-time clip reveal is replaced by a user-triggered View Transition. The commit body states it.

## Unit 8: feat(i18n): type nested locales and sync html lang

Work Unit Evidence

| Evidence | Value |
| -------- | ----- |
| Focused test command and result | Parity probes, each reverted byte-identically (SHA-1 compared): (1) deleting `contact.fields.phone` from `es.ts` only makes `pnpm check` exit 2 with `TS2741 Property 'phone' is missing` in `es.ts`; (2) `t("does.not.exist")` in `Footer.tsx` makes `pnpm check` exit 2 with `TS2345` on the `t` call; (3) an extra `nav.extra` key in `es.ts` fails with `TS2353 Object literal may only specify known properties`. `rg -n 'i18n\.language' src`: no matches (exit 1); the only `=== "es"` left are `locale === "es"` comparisons from `useLocale()`. A scripted compare against `c34a50f` (`git show` of the old flat files vs the new nested ones, mapped by the design 3.2 table): 17 of 17 Spanish values byte-identical, 2 English values changed (the two typo fixes) |
| Gate | `pnpm check`: green; `pnpm build`: green, main 388.54 kB raw / 123.54 kB gzip, Contact 111.76 kB / 38.19 kB |
| Runtime harness | `pnpm build && pnpm preview --port 4173` driven through headless Chrome over CDP (scratchpad script, not committed): browser language `es-MX` with empty storage gives `html lang="es"`, a Spanish UI ("Mi nombre es ...", Experiencia, Proyectos, Contacto), toggle "Cambiar idioma" showing `ES` and theme label "Tema: Sistema"; after the toggle `html lang="en"` and English copy; `fr-FR` gives English; switching to Spanish and reloading keeps Spanish (`i18nextLng` = `es`); zero console errors or warnings in the production build. The existing dev server on port 5173 (React dev build under `StrictMode`) showed only the known marquee duplicate-key errors (baseline, fixed in unit 14) and no new warnings. The manual browser-setting scenarios remain deferred (8.11) |
| Rollback boundary | Revert the unit-8 commit: restores the flat `translation` locale files and `init.ts` config object, the `main.tsx` instance creation, the default `App` export and the old `LangToogle`; removes `types/localized.ts`, `lib/localize.ts`, `hooks/useLocale.ts` and `i18n/i18next.d.ts`; every `t()` caller returns to the old keys |

Implementation notes

- Locale files are nested camelCase: `en.ts` is `export const en = {...} as const` with `Messages` (EN deep-widened to `string`), `es.ts` is `export const es = {...} satisfies Messages`, and `i18next.d.ts` augments `CustomTypeOptions` with `defaultNS: "translation"` and `resources: { translation: typeof en }`. All 17 existing keys follow the design 3.2 table; the unit-7 theme keys became `theme.toggle` and `theme.modes.*`; `language.toggle` is new (EN "Switch language", ES "Cambiar idioma").
- English edits are the two typo fixes only: `hero.description` drops "both", `contact.description` reads "you can ... in future projects". The `CONTACT.SUCESS` key typo is fixed by the new name `contact.success`. Spanish values were moved verbatim (compared by script).
- `init.ts` exports the `i18n` instance created with `i18next.createInstance()` and follows design 3.1: `supportedLngs`, `nonExplicitSupportedLngs`, `load: "languageOnly"`, `fallbackLng`, `initAsync: false`, detector order `localStorage`, `navigator` with the `i18nextLng` cache key, and `syncHtmlLang` once after init and on `languageChanged`. `AppProviders` now owns `I18nextProvider` and `ThemeProvider`; `main.tsx` is `StrictMode` > `AppProviders` > `App` and no longer builds an i18n instance.
- `App` became a named export (D4); `HeroSection`, `ExperienceSection`, `ProjectsSection`, `ContactSection`, `TechsSection` keep their default exports because they are loaded with `React.lazy` or rebuilt in later units.
- `useLocale()` (T1 hook) returns `toLocale(i18n.resolvedLanguage)`. `Header` takes the CV link from `SITE.cv[locale]` (`SITE.cv` now `satisfies Localized`). `ExperienceSection` replaces its two `i18n.language === "es"` checks with `locale === "es"`; the inline "Actualidad"/"Current" literal and the always-`"EN"` `formatDate` call stay until unit 13 (which adds `experience.current` and `Intl` dates).
- `LanguageToggle` is now a named export with `aria-label={t("language.toggle")}` and a label from `useLocale()`, so `es-MX` shows `ES`. The visible text is the language code, the accessible name is the action; this is the design 3.1 contract.
- Removed the `|| "Ver Más"` fallback in `ProjectsSection` (the typed key always exists).

## Deferred manual checks

These sub-tasks stay unchecked in `tasks.md`; the orchestrator must run them in a browser.

- 1.8: `pnpm preview` page visually unchanged in EN/ES, light/dark (header, hero, timeline, carousel, projects pagination, contact).
- 2.6: DevTools Performance at CPU 6x, cache disabled, hard reload: no overlay or fixed delay before the hero, hero never visible, hidden, visible; with `localStorage.theme="dark"` no light frame.
- 3.10: hero pattern is sharp at 1440 px in both themes (if blurry, redo 3.2 at 1600 px); project thumbnails keep the top of each screenshot; header CV links download the right language. The two `curl` 200 checks were done with GET through `pnpm preview` and are recorded above.
- 4.7: build the base for comparison (`git worktree add <scratch> c34a50f`, `pnpm install --frozen-lockfile`, `pnpm build`, `pnpm preview --port 4174`) and compare hero timing and stagger side by side with the new build; DevTools Accessibility shows one name for the hero text; reduced motion shows final text at once; no layout shift when letters animate. Known and expected: word gaps are about 4 px narrower at 60 px (real spaces instead of the 0.3em spacer).
- 5.9: Sheet opens and focus returns to the trigger on close (the React 18 dropped-ref bug is gone); language switch works; theme toggle still works.
- 6.12: `pnpm preview` smoke identical to unit 5 (images, CVs, theme toggle, language switch, Sheet).
- 7.13: DevTools Rendering emulation checks in a real browser: first visit under OS dark reads dark with the toggle at "System"; light chosen under OS dark persists after reload; `localStorage.theme="zzz"` falls back to system with no console error; flipping the OS scheme in system mode updates live; at 375 px the sheet toggle updates the header toggle label; screen reader name updates after each activation; Chrome shows the circular reveal from the toggle and reduced motion switches instantly; hard reload at CPU 6x with a dark preference shows no light frame. A scripted CDP run already covered the state, storage, label, live-flip, reduced-motion and sheet-sync logic (see Unit 7 evidence); the visual reveal and the filmstrip are not covered.
- 8.11: with the browser language set to `es-MX` and empty storage the UI is Spanish, the toggle reads ES and `document.documentElement.lang` starts with `es`, then starts with `en` after switching; `fr-FR` gives English; switching to Spanish and reloading keeps Spanish; the dev server shows no new StrictMode warnings. A scripted CDP run emulating `es-MX` and `fr-FR` already passed on the production build (see Unit 8 evidence); a real browser-setting run is still needed.

## Deviations, risks and notes

- Image position: `--position top` was used for the 20 project thumbnails (task 3.1 and design section 8 say to use it when `resize --help` lists it, and it does) instead of `attention` from the launch brief. The hero patterns are 1024x1024 sources, so no crop was applied.
- SplitText accessibility: the root exposes the full text through an `sr-only` span and hides the letter tree with `aria-hidden="true"` (design 5.2 and task 4.2) instead of an `aria-label` on the wrapper, because ARIA 1.2 forbids `aria-label` on `p` and generic elements. The accessible name is still a single string.
- `pnpm build:analyze` was never run (it opens a browser). Bundle checks use plain `pnpm build` output, `grep` over `dist`, and a temporary non-opening visualizer config that was deleted afterwards.
- `useDocumentDark.ts` keeps its synchronous `sync()` call because react-hooks 7.1.1 does not flag it (design 9.2 predicted a `set-state-in-effect` finding); the hook is deleted in unit 12.
- The shadcn CLI 4.21.5 wrote `import { cn } from "cn"` into `input.tsx` and `textarea.tsx`; the import was restored to `@/lib/utils`.
- Footer `href="#"` anchors carry three `eslint-disable-next-line jsx-a11y/anchor-is-valid -- rebuilt in unit 9` comments. Unit 9.12 replaces the placeholders and must drop them; the final grep for `rebuilt in unit` must return nothing.
- Unit 9 must keep the SplitText reduced-motion selector at least as specific as `.split-text[data-inview] .split-char` when merging it into the single policy block, otherwise the animation still runs.
- Risk: the main chunk is 123.86 kB gzip after unit 6 (React 19 alone adds about 23 kB gzip to react-dom). The performance-budget target of < 110 kB gzip at unit 17 needs the lazy Sheet and later units to recover about 14 kB, or a budget decision at verify. Contact is 38.25 kB gzip and is expected to drop under 31 kB when axios and notiflix leave in unit 16.
- Commit bodies keep every line at or below 100 characters because commitlint `body-max-line-length` rejects longer lines (unit 3 was committed on the second attempt for that reason).
- `tasks.md` and this file are committed with each unit so the tree stays clean. `openspec/changes/portfolio-redesign/state.yaml` is orchestrator-owned: it was already modified before this batch started and was never staged or edited.
- No follow-up `fix(...)` commits were needed in this batch.
