# Exploration: portfolio-redesign

Artifact language: English. Store mode: openspec (target file `openspec/changes/portfolio-redesign/exploration.md`; the explore executor had no file-write tool, so this Engram observation is the authoritative copy and the orchestrator MUST materialize it to that path). All sizes marked "est." are estimates to be validated with `pnpm build:analyze`.

## Current State

Single-page SPA: `index.html` -> `src/main.tsx` (i18next instance, `I18nextProvider`, `SplashScreen` sibling of `App`) -> `src/App.tsx` (Header, eager Hero, lazy Timeline/Techs/Projects/Contact in `Suspense`, Footer, fixed rails GoToTop/ContactOptions/EmailOptions). No router, store, StrictMode, ErrorBoundary or tests. Quality gate: `pnpm check` (tsc -b + eslint + prettier --check) plus `pnpm build`.

### Smells verified in code (file:line)
- i18n: `i18n.language === "es"` at `Header.tsx:110,152`, `Timeline.tsx:26,35`, `LangToogle.tsx:15` (es-MX shows EN label while rendering Spanish); `formatDate(..., "EN")` always (`Timeline.tsx:23`); Timeline always shows `descriptionEN` (`Timeline.tsx:32`); `CONTACT.SUCESS` typo key; `<html lang>` never synced (`index.html:2`).
- Theme: `dark` class is applied inside `useEffect` after first render (`ThemeToogle.tsx:17-26`) -> flash of light theme for dark users; `ThemeToggle` mounted twice (desktop + Sheet) with independent state; `useDocumentDark` (MutationObserver) exists only to swap the hero image (`Hero.tsx:10`); `index.html:9` body uses `bg-white dark:bg-black`, not tokens.
- Techs: 404 lines, ~380 of inline SVG JSX; `[...TECHS, ...TECHS]` keyed by `name` -> duplicate keys (`Techs.tsx:389-391`); `hoverColor` unused; no heading/id.
- Marquee is not seamless: `.carousel-track` holds two copies but animates `translateX(-100%)` (`index.css:126-133`); a seamless loop needs `-50%`. No pause control.
- Contact: `useContactForm.tsx:21-29` posts to a hardcoded Vercel URL with user input interpolated into an HTML string (injection); `useForm()` untyped; `errors` never rendered; notiflix + axios.
- Header duplicates nav links for desktop and Sheet; inline `useScroll`; `GoToTop.tsx:8-12` adds a scroll listener that is never removed and is a clickable `<svg>` (not keyboard reachable, invisible yet focusable).
- A11y: no `<h1>` (SplitText renders the name as `<p>`), no `<main>`, nested `<section>` (`App.tsx:35-57` wrap each component that renders its own `<section>`), `target="__blank"` without rel (`ContactOptions.tsx:15,33`), Footer `href="#"` and flowbite link (`Footer.tsx:10-30`), `console.log` in `ContactOptions.tsx:52-54`, no `prefers-reduced-motion` handling, `scroll-behavior: smooth` unconditional, no `scroll-padding-top` for the fixed header, icon-only buttons without names.
- Dead code/assets: `App.css`, `assets/react.svg`, `public/vite.svg`, `main-bg-dark.png` (975 KB, unreferenced), `profile.webp`, `ui/pagination.tsx`, `ui/separator.tsx`, `animations/BlurText.tsx` (unused), project fields `icon`/`hoverColor`, undefined classes (`text-detail`, `text-darksecondary`, `text-dark`, `animate-clip-shrink`, `sticky-nav`, `goTop`, `transformation`, `items-left`, `md:sticky-header`), `ShinyText.tsx:1` imports itself.
- Tooling: `eslint-plugin-react-hooks` and `eslint-plugin-import` are registered with zero rules (`eslint.config.js:26-28,38-57`); `globals.jest`/`globals.node` in browser code; aliases `@Store/@Router/@Interfaces/@Mock` point to missing folders in 3 tsconfigs + `vite.config.ts`; `import App from "@/App.tsx"` uses an extension; no CI, no `packageManager`/`engines`; favicon `<link rel="icon" type="image/svg+xml" href="./public/favicon.ico">` is wrong (`index.html:5`).
- Data: `constants/projects.ts` and `experience.ts` are untyped; ISO-less date strings; `DateFormatter` builds EN/ES by concatenation.

### New findings (not in the mapper inventory)
1. shadcn primitives are React-19 style (plain function components using ref-as-prop): `button.tsx:44-65`, `sheet.tsx:12-16`. Under React 18.3, `Header.tsx:72-81` (`SheetTrigger asChild > Button`) drops the forwarded ref (dev warning, lost focus-return to the trigger on close). `input.tsx`/`textarea.tsx` still use `forwardRef` (mixed generation). `@types/react` is already 19.2.14, so the TS side of React 19 is done; only runtime/peers remain.
2. `@react-spring/web@9.7.5` peers cap at React 18 (`pnpm-lock.yaml:1405-1409`). v10.1.2 supports React 19 (npm registry) but is only needed by SplitText (BlurText is unused); both carry `@ts-nocheck`.
3. ESLint 10 is blocked: `eslint-plugin-react@7.37.5` peer `^9.7` max, `eslint-plugin-import@2.32.0` peer up to `^9`, `eslint-plugin-jsx-a11y@6.10.2` up to `^9`. `eslint-plugin-react-hooks@7.1.1` and `eslint-plugin-react-refresh@0.5.7` already allow 10.
4. CV PDFs are NOT in the JS bundle: Vite emits `.pdf` imports as hashed asset URLs (see `dist/assets/Alexis_Matamoros_CV_*.pdf`); lazy-loading them yields no performance gain. Moving them to `public/cv/` gives stable, ASCII, shareable URLs (the ES file name contains `ñ`).
5. `lucide-react@1.8.0` ships no brand icons (`github.js`/`linkedin.js` absent from `dist/esm/icons`), which is why GitHub/LinkedIn SVGs are pasted by hand; a local `BrandIcon` atom is required.
6. shadcn's `sonner` wrapper imports `next-themes` (registry `radix-nova/sonner.json` lists `sonner` + `next-themes`). In this Vite app it must be adapted to the local theme hook and `next-themes` dropped.
7. GSAP `from()` sets `opacity: 0` only after the async import resolves (`useScrollAnimation.tsx:20-51`), so the hero flashes visible -> hidden -> visible; today this is masked by the 2.5 s splash (1500 ms + 1000 ms fade, `SplashScreen.tsx:8,15`). Removing or shortening the splash exposes it (exclude the hero from reveal).
8. ScrollTrigger positions are computed before lazy sections mount (fallback is `min-h-[24vh]`, `App.tsx:15-17`); `autoRefreshEvents` does not cover Suspense resolution, so start offsets are stale.
9. Project data errors: three entries share one repo URL (`projects.ts:219,231,243` = PA-YA), two share `our-expence` (`:154,164`), `Leer para Empoderarse` has `url: ""` (`:113`, link reloads the page); both-language descriptions exist but are never rendered.
10. `Hero.tsx:69` button uses `hover:bg-black hover:text-black` on a black button; `Hero.tsx:54` has a stray `p-` class.

Baseline (from orchestrator measurements): ~5 MB images in build (hero PNGs 775 KB each, clinpays 1.15 MB, imprema 887 KB, atlantida 749 KB), main chunk 330 KB (110 KB gzip), Contact chunk 89 KB (31 KB gzip), `pnpm check` green.

## Affected Areas
- `index.html`, `public/*` (favicon, CV PDFs, meta/OG, pre-paint theme script).
- `src/main.tsx`, `src/App.tsx`, `src/index.css` (tokens, typography utilities, motion rules, dead CSS removal).
- `src/components/**` (every file moves or is rewritten; `ui/` returns to shadcn-only).
- `src/hooks/**`, `src/utils/**`, `src/constants/**`, `src/i18n/**`, `src/lib/**`.
- `src/assets/**` (WebP conversion, deletions).
- `package.json`, `pnpm-lock.yaml`, `eslint.config.js`, `vite.config.ts`, `tsconfig*.json`, `components.json` (aliases stay valid).
- Docs: `CLAUDE.md`, `openspec/config.yaml` (architecture + import rules + BlurText mention), `.cursor/rules/portfolio.mdc`, `.cursor/skills/portfolio/SKILL.md`.
- New: `.github/workflows/ci.yml`, `.env.example`, `.nvmrc`/`engines`.

## Approaches

### 1. Project structure
| Option | Description | Pros | Cons | Effort |
|---|---|---|---|---|
| (a) Atomic folders + container/presentational | `components/{atoms,molecules,organisms,templates}`; containers separate | Familiar vocabulary; discoverable shared pieces | One section spreads over 3-4 folders (low cohesion); taxonomy debates (is ThemeToggle an atom or molecule?); `templates` has no use in a one-page app; data/types/hooks still need a home | Medium-High |
| (b) Feature-first + shared ui | `features/{hero,experience,techs,projects,contact}` each with components/data/hooks/types; shared `components/ui` | High cohesion, section = lazy-load boundary, easy to delete/replace, screams the domain | Needs a "when to promote to shared" rule; atomic decomposition is not visible in folders | Medium |
| (c) Minimal cleanup | Keep flat `components/`, fix names, move custom files out of `ui/` | Smallest diff | Does not deliver "improve structure"; Techs/Projects/Timeline stay monoliths; data/types still untyped | Low |
| **(d) Recommended hybrid** | (b) for sections + a small atomic shared kit (`ui` shadcn, `atoms`, `molecules`, `layout`) with a strict rule: promote to shared only when 2+ features use it | Cohesion of (b) + atomic extraction "where needed" + container/presentational inside each feature | Slightly more rules to document | Medium |

Container/presentational rule: the section root (`XSection.tsx`) is the container (reads `useTranslation`/`useLocale`, data, hooks, picks localized fields); `components/*` are presentational (props only, no i18n/data imports) so they are trivially re-skinnable and unit-testable.

### 2. Design direction ("quiet monochrome editorial", evolving the current identity)
- Tokens first: all surfaces use `bg-background text-foreground`, `text-muted-foreground`, `border-border`; the inverted pattern used today (black/white header pill, footer, email rail, hero CTA) becomes `bg-foreground text-background`/`bg-primary text-primary-foreground`. Removes ~37 hardcoded `bg-white dark:bg-black`/`text-gray-*` pairs. Light stays `oklch(1)`; dark moves from pure `#000` to the existing shadcn `oklch(0.145)` (room for elevated cards at 0.205). Add `--success` for form feedback. Fixes contrast failures such as `text-gray-400` on white (~2.5:1) in the timeline.
- Typography (Geist Variable, no new font dep): `@utility` classes `text-display` (clamp ~2.75-5rem, semibold, tight tracking), `text-title` (section titles), `text-lead` (muted lead paragraph), `text-eyebrow` (xs, uppercase, wide tracking; optional `font-mono` system stack). Body 16px/1.6.
- Layout rhythm: `Container` (max-w-6xl, px-5/md:px-8), sections `py-20 md:py-28`, `scroll-padding-top` for the fixed header, `min-h-svh` for hero.
- `SectionHeader` molecule (eyebrow index + title + lead) replaces `HeaderSeparator` (6 px grey bar); `SectionShell` renders one `<section id aria-labelledby>` (fixes nesting).
- Header: keep the idea (full bar -> floating inverted pill on scroll at md+) built from tokens; active-section indicator via IntersectionObserver (`aria-current="location"`); optional scroll-progress bar using CSS `animation-timeline: scroll()` (the existing dead `sticky-header` attempt); mobile uses the shadcn Sheet; skip link + `<main id="main">`.
- Hero: real `<h1>` (SplitText `as` prop), lead from i18n, primary CTA (`Button asChild` + `ShinyText`) and secondary CV download, token-based bottom fade (`from-transparent to-background`, one element instead of two theme-specific gradients), pattern swapped with CSS `.dark` selectors instead of `useDocumentDark`.
- Timeline: 2-column on md+ (date/duration left, content right), token rail, `current` dot, localized role/description, `<time datetime>`, stack as `Badge secondary`, tools as `Badge outline`.
- Techs: monochrome icons via `currentColor` (`text-muted-foreground hover:text-foreground`), edge-fade mask, seamless `-50%` loop, pause on hover/focus, duplicate set `aria-hidden`, `prefers-reduced-motion` -> static wrapped grid; add a heading (new key `section.techs`).
- Projects: responsive grid (1/2/3 cols), whole card as one link, 16:9 WebP, localized 2-line description, tech badges, external-link affordance, "Show more" (6, then +6) instead of fade-pagination, non-link card when `url` is empty.
- Contact: 2 columns on lg (copy + direct links | form card), field-level errors with `aria-invalid`/`aria-describedby`, submit/pending state, honeypot, toast feedback.
- Motion policy: one `prefers-reduced-motion: reduce` block disables marquee, hero bg drift, shine, reveals, smooth scroll; `useReducedMotion` hook for JS (GSAP via `gsap.matchMedia()`). Optional polish: View Transitions API for the theme change circle-reveal (replaces `animate-clip-expand` on the root div), skipped under reduced motion.
- Focus: global `:focus-visible` ring from `--ring`; icon buttons >= 40 px with accessible names.

### 3. Optimization
- Images: convert at source to WebP (`pnpm dlx sharp-cli@5 ... --format webp --quality 80`, no repo dependency). Hero patterns 775 KB -> ~10 KB each. Project images resized to <= ~800 px wide then WebP (est. 20-60 KB each). Total est. ~5 MB -> < 0.6 MB. Build-time plugins (`vite-imagetools`, image-optimizer) rejected: add native `sharp` to the build and slow CI for a one-time asset set. Document the command in `CLAUDE.md`. Originals are removed from the tree (history keeps them).
- PDFs: no perf work needed (finding 4); move to `public/cv/` for stable URLs.
- Dead code: ~700 lines + ~2 MB of unreferenced assets removed (see Smells).
- Bundle (est., validate): drop `@react-spring/web` (~20 KB gz) by re-implementing `SplitText` with CSS (`--i` stagger via `animation-delay`, IntersectionObserver trigger, same props API, easeOutCubic -> `cubic-bezier(0.215,0.61,0.355,1)`); lazy-load the mobile Sheet (Radix Dialog stack, est. 10-15 KB gz) on first interaction; replace `axios` with `fetch` (~13 KB gz) and `notiflix` with `sonner` inside the Contact chunk (Contact est. 31 -> ~17 KB gz); optional `manualChunks` for react/i18n vendor caching; idle prefetch of lazy section chunks to avoid pop-in.
- Splash: see Product decision 1.
- Scroll hygiene: one passive `useScrolled(threshold)` hook (replaces Header `useScroll` + GoToTop leak); IntersectionObserver for active section; no layout reads in handlers.
- GSAP: keep (lazy, off critical path) but move the trigger creation into each section after mount (`useReveal(ref)` inside `SectionShell`) so ScrollTrigger measures real layout, exclude hero, guard with `gsap.matchMedia()` for reduced motion, and call `ScrollTrigger.refresh()` after lazy mounts; replace `toggleActions: "play none none reset"` (content disappears when scrolling back up) with once-only unless the user wants it kept.
- Meta: `description`, Open Graph/Twitter tags, `theme-color` (light/dark), `color-scheme`, correct favicon, `noscript`.

### 4. Correctness and practices
- Types: `Localized<T = string> = { en: T; es: T }`, `Project`, `Experience`, `Tech`; data files use `satisfies`; ISO dates (`"2025-04"`), `current` derived from missing `end`; `pickLocale()` in `lib/`; durations/ranges via `Intl.DateTimeFormat` + i18next plural keys (no concatenated "Since").
- i18n: `useLocale()` returns `"en" | "es"` from `i18n.resolvedLanguage` with `supportedLngs: ["en","es"]`, `nonExplicitSupportedLngs: true` (no more `=== "es"`; CLAUDE.md currently prescribes `startsWith("es")` and should be updated); nested camelCase keys with typed resources (`CustomTypeOptions`) so typos like `SUCESS` fail `tsc`; ES keys constrained to EN's shape; `i18n.on("languageChanged")` syncs `<html lang>`; all hardcoded strings (Actualidad/Current, Ver Mas, footer year, aria-labels, email body) move to keys; copy fixes limited to obvious typos (EN "u can", "in a future projects").
- Contact: endpoint from `import.meta.env.VITE_CONTACT_API_URL` (typed in `vite-env.d.ts`, `.env.example`); if unset the section degrades to a mailto CTA. NOTE: a `VITE_*` value is public, so this is configurability, not secrecy. Client-side: RHF native rules (required/pattern/maxLength) with i18n messages (no zod: 5 fields, ~13 KB gz not justified), typed `ContactFormValues`, honeypot, `fetch` + `AbortController` timeout, a pure `buildMessageHtml()` that HTML-escapes every field, `autoComplete` attributes. Out of repo scope but must be reported: the external API accepts raw HTML, so any third party can relay arbitrary HTML email through it; the real fix is server-side (accept structured fields, escape, rate-limit, CORS allowlist).
- Feedback UI: `sonner` via `pnpm dlx shadcn@latest add sonner`, then replace the `next-themes` import with the local `useTheme`, drop `next-themes`; mount `<Toaster/>` inside the Contact feature so it ships in the lazy chunk.
- A11y: skip link, `<main>`, single `<h1>`, one `<section>` per block with `aria-labelledby`, accessible names for all icon controls (theme, language, menu, go-to-top, social), `target="_blank"` + `rel="noopener noreferrer"` through one `ExternalLink` atom, SplitText exposes `aria-label` on the wrapper and `aria-hidden` on letter spans, GoToTop is a real `Button` and `inert`/`aria-hidden` while hidden, marquee pause + reduced-motion.
- ESLint: enable `eslint-plugin-react-hooks` v7 flat `recommended` (expect new compiler-based findings to fix), add `eslint-plugin-jsx-a11y` (dev), remove unused `eslint-plugin-import` (zero rules, caps ESLint at 9) and `globals.node/jest/React`, `no-console` warn, `@typescript-eslint/no-unused-vars` to error, set `react.version` to `detect`, keep `no-restricted-imports` (`./*`, `../*`) and add folder boundaries with core `no-restricted-imports` overrides (shared layers must not import `@/features/*`; features must not import sibling features) - no new resolver dependency. Import-order enforcement is low value and dropped.
- Aliases: collapse to the single `@/` alias (matches `components.json`); delete `@Components/@Hooks/@Constants/@Utils/@Assets` and the 4 dead aliases; keep alias config only in `vite.config.ts` + `tsconfig.app.json` (remove duplicated `paths` from `tsconfig.json`/`tsconfig.node.json`); drop the `.tsx` extension in imports. Update `CLAUDE.md`, `openspec/config.yaml`, `.cursor/rules/portfolio.mdc` which currently document the PascalCase aliases.
- Theme: own `ThemeProvider` (light | dark | system, `matchMedia` listener, `localStorage.theme`), a ~6-line inline script in `<head>` that sets the class before first paint, a single `ThemeToggle` molecule consuming context (desktop and Sheet stay in sync), `useDocumentDark` and `constants/theme.ts` deleted.
- Hygiene: `packageManager: pnpm@10.33.0` (from `node_modules/.modules.yaml`), `engines.node >= 20.19`, `.nvmrc`, GitHub Actions (`pnpm install --frozen-lockfile`, `pnpm check`, `pnpm build`), favicon fix, `.env.example`.

### 5. Dependency scope (npm registry data fetched 2026-10-14)
| Package | Current -> Latest | Verdict | Evidence |
|---|---|---|---|
| react, react-dom | 18.3.1 -> 19.3.1 | Include | `@types/react` already 19.2.14; shadcn primitives are ref-as-prop; radix-ui, react-hook-form 7.90, react-i18next peers allow 19 |
| @react-spring/web | 9.7.5 -> 10.1.2 | Remove (CSS SplitText); fallback: bump to 10.1.2 | v9 peers cap at React 18 |
| i18next + react-i18next | 24.2.3 -> 26.4.5 / 15.7.4 -> 17.0.16 | Include together | react-i18next 17 peer `i18next >= 26.2.0`; migration guide v25 (changeLanguage ordering, `getBestMatchFromCodes`) and v26 (removed `interpolation.format`, `initImmediate`, `showSupportNotice`) do not touch `src/i18n/init.ts` |
| @vitejs/plugin-react-swc | 3.11.0 -> 4.3.3 | Include | peer `vite ^4..^8`; engines Node `^20.19 || >=22.12` (confirm local/CI/Vercel Node) |
| eslint-plugin-react-hooks | 5.2.0 -> 7.1.1 | Include | peers allow eslint up to 10; stricter `recommended` |
| typescript-eslint | 8.58.1 -> 8.71.2 | Minor bump | peer `typescript >=4.8.4 <6.1.0` |
| eslint, @eslint/js, globals | 9 / 9 / 15 -> 10 | Defer | blocked by react/import/jsx-a11y plugin peers |
| vite | 6.4.2 -> 8.3.4 | Defer (own change) | plugin-react-swc 4 is forward compatible |
| typescript | ~5.7.3 | Defer | no need |
| notiflix, axios | - | Remove | replaced by sonner, fetch |
| sonner | - -> 2.0.8 | Add | peers react ^18 or ^19; wrapper adapted (no next-themes) |
| eslint-plugin-jsx-a11y | - -> 6.10.2 | Add (dev) | peers eslint <= 9 |
| minors: gsap 3.15.0, lucide-react, radix-ui 1.8.1, tailwindcss + @tailwindcss/vite, tailwind-merge, prettier, shadcn, react-hook-form, typescript-eslint | within caret ranges | Include via `pnpm update` | low risk |
| @commitlint/* 21, lint-staged 17 | tooling majors | Optional | verify Node engines; no runtime impact |
| @types/node | 22 | Keep aligned with the Node runtime; do not jump to 26 | |

## Recommendation

Adopt the hybrid structure (d), the token-first monochrome direction, React 19 + i18next 26 + plugin-react-swc 4, CSS SplitText (drop react-spring), keep GSAP hardened, WebP at source, own ThemeProvider with a pre-paint script, typed `Localized` data, hardened contact form, and a single `@/` alias.

Target tree:
```
index.html                       # meta/OG, fixed favicon, pre-paint theme script, no body bg classes
public/ favicon.ico  cv/Alexis_Matamoros_CV_EN.pdf  cv/Alexis_Matamoros_CV_ES.pdf
src/
  main.tsx                       # entry only: css import + <AppProviders><App/></AppProviders>
  app/
    App.tsx                      # skip link, Header, <main>, lazy sections, Footer, rails
    AppProviders.tsx             # I18nextProvider + ThemeProvider (+ html lang sync)
    theme/ ThemeProvider.tsx  theme-context.ts  useTheme.ts   # split for react-refresh rule
    config/ site.ts (name, email, socials, cv urls, section ids, nav items)  env.ts (typed VITE_*)
  components/
    ui/          # shadcn primitives ONLY (badge button card input label sheet textarea sonner[, alert])
    animations/  # SplitText (CSS), ShinyText
    atoms/       # Logo, BrandIcon, ExternalLink, TechIcon
    molecules/   # SectionHeader, ThemeToggle, LanguageToggle, NavLinks, SocialLinks
    layout/      # Header, MobileMenu, Footer, SideRails, ScrollToTop, SectionShell, SkipLink
  features/
    hero/        HeroSection.tsx  components/HeroBackground.tsx
    experience/  ExperienceSection.tsx  components/{Timeline,TimelineItem}.tsx  data/experience.ts  experience.types.ts
    techs/       TechsSection.tsx  components/TechMarquee.tsx  data/techs.ts
    projects/    ProjectsSection.tsx  components/{ProjectCard,ProjectGrid}.tsx  data/projects.ts  projects.types.ts  assets/*.webp
    contact/     ContactSection.tsx  components/ContactForm.tsx  hooks/useContactForm.ts  services/contact.service.ts  contact.schema.ts
  hooks/         useScrolled  useActiveSection  useReducedMotion  useLocale  useReveal
  i18n/          init.ts  locales/{en,es}.ts  i18next.d.ts
  lib/           utils.ts (cn)  dates.ts  localize.ts  escape-html.ts
  types/         localized.ts
  assets/img/    hero-pattern-light.webp  hero-pattern-dark.webp
  index.css      tokens, @theme, @utility typography, motion rules
```
`components.json` aliases (`@/components`, `@/components/ui`, `@/lib`, `@/hooks`) remain valid, so `shadcn add` keeps writing to `src/components/ui`. The 5 custom files currently in `ui/` (HeaderSeparator, LangToogle, SplashScreen, GoToTop, ThemeToogle) leave that folder.

## Scope slicing (single PR, commit-level work units)
Estimated authored changes (additions + deletions, excluding lockfile and binaries; +/-30%): ~4,500-5,000 lines, roughly 11-12x the 400-line budget. Under `single-pr` this needs an explicit `size:exception`; no honest cohesive split fits 400 per PR short of ~12 chained PRs.

| # | Conventional commit | Content | Est. lines | Needs |
|---|---|---|---|---|
| 1 | chore: remove dead code and assets | App.css, BlurText*, pagination, separator, react/vite svgs, main-bg-dark.png, profile.webp | ~330 (deletions) | - |
| 2 | perf: convert images to webp | hero + project images, import paths | ~45 text + binaries | 1 |
| 3 | refactor: css-driven SplitText | drop react-spring, remove `@ts-nocheck`, `as` prop, aria | ~170 | - |
| 4 | build(deps): react 19, i18next 26, tooling | package.json, ESLint (hooks v7, jsx-a11y, drop import plugin), packageManager/engines, fallout | ~200 | 3 |
| 5 | refactor: feature-first structure, single `@/` alias | moves + import rewrite + tsconfig/vite alias collapse | ~250 | 1,4 |
| 6 | feat(theme): provider, pre-paint script, token palette | | ~300 | 5 |
| 7 | feat(i18n): typed nested locales, useLocale, html lang | | ~350 | 5 |
| 8 | feat(ui): SectionShell/Header, typography, motion base | | ~220 | 6,7 |
| 9 | feat(layout): header, mobile menu, skip link, main | | ~350 | 6-8 |
| 10 | feat(layout): footer, side rails, scroll-to-top | | ~300 | 9 |
| 11 | feat(hero): h1, CTAs, token background, splash policy | | ~220 | 8 |
| 12 | feat(experience): typed data, Intl dates, timeline | | ~350 | 7,8 |
| 13 | feat(techs): typed icon data, accessible marquee | ~400 deletions + ~150 additions | ~550 (exception unit) | 8 |
| 14 | feat(projects): typed data, grid, show more | | ~450 | 8 |
| 15 | feat(contact): validation, fetch service, env, sonner | | ~380 | 7,8 |
| 16 | perf(motion): per-section reveal, refresh, prefetch | | ~180 | 9-15 |
| 17 | docs/ci: CLAUDE.md, openspec config, cursor rules, workflow, .env.example | | ~150 | all |

Verification per unit: `pnpm check` + `pnpm build`; manual matrix EN/ES x light/dark x 375/768/1440 px x keyboard-only x `prefers-reduced-motion`; `pnpm build:analyze` before/after (units 3, 4, 15, 16). Commit 3 precedes 4 so react-spring never needs a React 19 bump.

## Product decisions
1. Splash screen. Options: (A) remove; (B) keep, once per session (`sessionStorage`), <= ~1 s total, skipped under reduced motion; (C) keep as is (2.5 s every load). Consequences: A best LCP/perceived speed, loses brand moment; C hurts LCP/Lighthouse and hides the GSAP flash. Default: B.
2. React 19 in this change. Options: include / defer. Defer keeps react-spring 9 + `@ts-nocheck` and the dropped-ref bug in the Sheet trigger. Default: include.
3. Contact backend. Options: (A) keep external API with env URL, escaped input, honeypot, mailto fallback; (B) mailto only; (C) third-party form service. A keeps behavior but the API itself is an open HTML relay (outside this repo); B is simplest and removes the risk; C adds a vendor. Default: A, and flag the API issue to the owner.
4. Feedback UI. Options: sonner toast / inline `role="status"` alert / keep notiflix. Default: sonner (shadcn-sanctioned, lazy in Contact chunk, themed, needs the next-themes adaptation).
5. Tech marquee. Options: keep infinite marquee with pause + reduced-motion fallback / static grid. Default: keep with safeguards (WCAG 2.2.2 may need an explicit pause control).
6. Research lane (`sdd-research`) before proposing. Default: skip; package peer/engine facts were verified from the npm registry here and the open questions are product/visual, which research does not settle.
7. Delivery size. Single PR of ~4.5-5k lines needs `size:exception`, or chain PRs (e.g. foundation 1-8, shell+hero 9-11, sections+contact+polish 12-17; each still above 400). Default: single PR with commit-by-commit review and recorded `size:exception`.
8. Animation implementation (constraint: keep behavior unless replaced by an equivalent). Options: (A) CSS SplitText (drop react-spring) + keep GSAP hardened; (B) keep both libs (bump react-spring to 10.1.2); (C) also replace GSAP with an IntersectionObserver reveal and drop `gsap`. Default: A (react-spring sits on the eager critical path, GSAP is already lazy). Requires a visual parity check of the hero text animation.
9. `BlurText.tsx` (unused, `@ts-nocheck`) is named in `openspec/config.yaml` and `.cursor` rules. Default: delete explicitly (not silently) and update those rules.
10. Vitest for pure logic (dates, localize, escape-html, data integrity). Default: defer to a follow-up change; keep logic isolated in `lib/` so adding tests later is trivial.

Content questions for the owner (data, not code): correct repo URLs for LECO, Consume Weather API, Our Expences API; URL or removal for Leer para Empoderarse; whether Informatica Atlantida is still current (flag set, no end date, overlaps Clinpays); make company and phone optional in the form (default yes); scope of EN copy fixes (default: obvious typos only).

## Risks
- Review load: ~12x the 400-line budget; commit-by-commit review is the mitigation, not a cure.
- No test runner: every visual/behavioral claim is manual; regressions in dark mode, es-MX and reduced motion are the likeliest escapes.
- Dark background shifts from `#000` to `oklch(0.145)`; the dark hero pattern raster has a near-black base, so seams must be checked (fallback: regenerate/adjust the pattern or keep `--background` darker).
- CSS SplitText parity (timing, easing, per-letter stagger on ~190 letters) and selector-based pattern swap need visual comparison.
- plugin-react-swc 4 and Vite tooling require Node >= 20.19; confirm local, CI and Vercel Node versions before upgrading.
- `eslint-plugin-react-hooks` v7 may flag existing effects (`useDocumentDark`, `SplashScreen`); fix cost is unknown until enabled.
- Typed i18n keys plus key renames touch every `t()` call; EN/ES parity must be enforced at type level to avoid missing-key regressions.
- Contact: the deployed environment must define `VITE_CONTACT_API_URL` (Production and Preview) or the form falls back to mailto; the external API flaw remains until fixed server-side.
- Boundary lint via `no-restricted-imports` negation patterns must be verified to behave as intended.
- GSAP reveal flash and stale ScrollTrigger offsets reappear if reveal is not created per section after mount.
- Deleted source images are only recoverable from git history.

## Ready for Proposal
Yes. The orchestrator should surface Product decisions 1-8 (9-10 can use defaults) before `sdd-propose`, record the `size:exception` choice, and recommend skipping `sdd-research`. The proposal should cover: structure (d), design direction, dependency scope table, work-unit order (17 units), and rollback per unit (each commit is independently revertable; units 3-4 and 5 are the riskiest and should land early so later units build on a green base).
