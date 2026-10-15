# Apply progress: portfolio-redesign

Change `portfolio-redesign` | store `openspec` | mode Standard (strict TDD off, no test runner) | delivery `single-pr` with recorded `size:exception` (user-approved).

Batch 1 covers units 1 to 6. Units 7 to 19 are pending. Manual browser scenarios are never marked done by the apply executor; they are listed under "Deferred manual checks".

## Unit status

| Unit | Commit subject | Status |
| ---- | -------------- | ------ |
| 1 | chore: remove dead code and assets | committed |
| 2 | perf: remove splash screen | committed |
| 3 | perf: convert images to webp | committed |
| 4 | refactor(animations): css-driven split text | committed |
| 5 | build(deps): upgrade react 19, i18next 26 and tooling | committed (see git log) |
| 6 | refactor: adopt feature-first structure and single alias | pending |

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

## Deferred manual checks

These sub-tasks stay unchecked in `tasks.md`; the orchestrator must run them in a browser.

- 1.8: `pnpm preview` page visually unchanged in EN/ES, light/dark (header, hero, timeline, carousel, projects pagination, contact).
- 2.6: DevTools Performance at CPU 6x, cache disabled, hard reload: no overlay or fixed delay before the hero, hero never visible, hidden, visible; with `localStorage.theme="dark"` no light frame.
- 3.10: hero pattern is sharp at 1440 px in both themes (if blurry, redo 3.2 at 1600 px); project thumbnails keep the top of each screenshot; header CV links download the right language. The two `curl` 200 checks were done with GET through `pnpm preview` and are recorded above.
- 4.7: build the base for comparison (`git worktree add <scratch> c34a50f`, `pnpm install --frozen-lockfile`, `pnpm build`, `pnpm preview --port 4174`) and compare hero timing and stagger side by side with the new build; DevTools Accessibility shows one name for the hero text; reduced motion shows final text at once; no layout shift when letters animate. Known and expected: word gaps are about 4 px narrower at 60 px (real spaces instead of the 0.3em spacer).
- 5.9: Sheet opens and focus returns to the trigger on close (the React 18 dropped-ref bug is gone); language switch works; theme toggle still works.
