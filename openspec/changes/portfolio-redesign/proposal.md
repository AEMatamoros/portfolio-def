# Proposal: Portfolio Redesign

## Intent

The portfolio is the owner's professional showcase, yet it ships heavy, partly inaccessible and hard to maintain:

- **Performance**: ~5 MB of raster images; a 2.5 s splash on every load; `@react-spring/web`, `axios`, `notiflix` in the bundle.
- **Accessibility**: no `<h1>` or `<main>`, nested `<section>`, unnamed icon buttons, clickable `<svg>` scroll-to-top, no reduced-motion handling, marquee without pause.
- **Correctness**: contact input interpolated into HTML; `=== "es"` breaks `es-MX`; timeline always English; light flash for dark users; duplicate React keys; leaked scroll listener; `<html lang>` never synced.
- **Structure/tooling**: custom files inside shadcn `ui/`, 9 aliases (4 dead), untyped data, ~700 dead lines and ~2 MB unused assets, `@ts-nocheck`, react-hooks plugin with zero rules, no CI, React 18 runtime under React-19-style shadcn primitives (dropped `SheetTrigger` ref).

**Measured baseline**: images ~5 MB; main chunk 330 KB (110 KB gzip); Contact chunk 89 KB (31 KB gzip); `pnpm check` green.

## Scope

### In Scope
- Feature-first structure, shared atomic kit, container/presentational split, single `@/` alias, lint-enforced boundaries.
- Token-first monochrome editorial redesign of the current identity.
- Splash screen removed; hero flash fixed (hero excluded from reveal, pre-paint theme script).
- Own `ThemeProvider` (light/dark/system), one synced toggle.
- Typed nested i18n, `useLocale()`, `<html lang>` sync, localized data and `Intl` dates.
- CSS SplitText, ShinyText kept, hardened GSAP, one reduced-motion policy.
- Hardened contact form with `sonner` feedback; company and phone optional.
- Accessibility landmarks, names, focus ring; meta/OG tags; favicon fix.
- WebP images, CVs in `public/cv/`, dead code/assets removed, lazy mobile Sheet, idle chunk prefetch.
- Dependency upgrades (table below), `packageManager`, `engines.node >= 20.19`, `.nvmrc`, CI, `.env.example`.
- `BlurText.tsx` deleted explicitly; `CLAUDE.md`, `openspec/config.yaml`, `.cursor/` updated.

### Out of Scope
- ESLint 10, Vite 8, TypeScript 6, `@commitlint` 21, `lint-staged` 17, `@types/node` major.
- Vitest or any test runner (follow-up).
- Server-side fix of the contact API (flagged follow-up).
- Content data corrections; copy edits beyond obvious EN typos.
- Chained PRs.

## Capabilities

### New Capabilities
- `page-shell`: landmarks, skip link, single `<h1>`, section semantics, header (pill on scroll, active section, mobile menu), footer, side rails, scroll-to-top, meta/OG/favicon, no splash.
- `theming`: light/dark/system, persistence, pre-paint application, synced toggle, token palette, focus ring.
- `localization`: EN/ES detection incl. regional codes, typed EN/ES parity, `<html lang>` sync, localized content and dates.
- `motion`: SplitText, ShinyText, scroll reveal, tech marquee, theme-change animation, reduced-motion policy.
- `portfolio-sections`: hero CTAs and CV downloads, experience timeline, tech showcase, project grid with "show more".
- `contact-form`: validation messages, honeypot, escaping, timeout, toast feedback, mailto fallback.
- `performance-budget`: image payload, chunk sizes, lazy loading and prefetch, static CV URLs.
- `codebase-conventions`: folder boundaries, single alias, lint rules, pnpm/Node pinning, CI.

### Modified Capabilities
None (`openspec/specs/` is empty).

## Approach

- **Structure** (exploration option d): `src/app`, `src/features/{hero,experience,techs,projects,contact}` (section container + presentational `components/`, typed `data/`), shared `src/components/{ui,animations,atoms,molecules,layout}`, plus `hooks`, `lib`, `types`, `i18n/locales`. `ui/` is shadcn-only. Promote to shared only when 2+ features use it. Core `no-restricted-imports` blocks shared → features and feature → sibling imports.
- **Design**: Geist, shadcn neutral tokens (dark `oklch(0.145)`), name-pattern hero background swapped via `.dark`, typography utilities, `SectionShell` + `SectionHeader`, floating inverted pill header, 2-column timeline and contact, project grid with "show more", marquee (`-50%` loop, pause on hover/focus, `aria-hidden` duplicate, heading, static grid under reduced motion), `BrandIcon` atom.
- **Motion** (declared explicitly): splash fade removed, BlurText (unused) deleted, react-spring SplitText → CSS (same props, `as` prop), project fade-pagination → "show more", GSAP reveal per section after mount, once-only, `ScrollTrigger.refresh()` after lazy mounts, `gsap.matchMedia()`.
- **Optimization**: `pnpm dlx sharp-cli@5 --input <in> --output <out.webp> --format webp --quality 80` (validated 775 KB → 10 KB), project images ≤ ~800 px, originals deleted.
- **Contact**: URL from `VITE_CONTACT_API_URL` (public configurability, not secrecy), every field HTML-escaped, RHF native rules with i18n messages, honeypot, `fetch` + `AbortController` timeout, mailto fallback when unset; `sonner` wrapper on the local theme hook (no `next-themes`), mounted in the lazy Contact chunk.
- **Tooling**: react-hooks v7 `recommended`, jsx-a11y, `no-console` warn, unused vars error; CI runs `pnpm install --frozen-lockfile`, `pnpm check`, `pnpm build`.

### Dependency scope (npm registry, 2026-10-14)

| Package | Change | Verdict / evidence |
|---|---|---|
| react, react-dom | 18.3.1 → 19.3.1 | Upgrade; `@types/react` already 19.2.14; peers allow 19 |
| i18next / react-i18next | 24.2.3 → 26.4.5 / 15.7.4 → 17.0.16 | Upgrade together; react-i18next 17 needs `i18next >= 26.2.0` |
| @vitejs/plugin-react-swc | 3.11.0 → 4.3.3 | Upgrade; Node `^20.19 \|\| >=22.12` |
| eslint-plugin-react-hooks | 5.2.0 → 7.1.1 | Upgrade, enable `recommended` |
| typescript-eslint, gsap, lucide-react, radix-ui, tailwindcss, @tailwindcss/vite, tailwind-merge, prettier, shadcn, react-hook-form | caret minors | `pnpm update` |
| sonner / eslint-plugin-jsx-a11y | add 2.0.8 / 6.10.2 (dev) | peers React 18-19 / ESLint ≤ 9 |
| @react-spring/web, axios, notiflix, eslint-plugin-import | remove | CSS, `fetch`, sonner; import plugin has zero rules |
| eslint 10, vite 8, typescript 6 | defer | ESLint 10 blocked by plugin peers |

### Work units (one commit each; `pnpm check` + `pnpm build` green after each)

| # | Commit | Notes | Needs |
|---|---|---|---|
| 1 | `chore: remove dead code and assets` | incl. BlurText and rules naming it | – |
| 2 | `perf: remove splash screen` | pre-paint theme script, hero excluded from reveal | – |
| 3 | `perf: convert images to webp` | CVs to `public/cv/` | 1 |
| 4 | `refactor(animations): css-driven split text` | drop react-spring | – |
| 5 | `build(deps): upgrade react 19, i18next 26 and tooling` | ESLint rules, pinning | 4 |
| 6 | `refactor: adopt feature-first structure and single alias` | move-only, boundary lint | 1–5 |
| 7 | `feat(theme): add theme provider and token palette` | | 6 |
| 8 | `feat(i18n): type nested locales and sync html lang` | EN typo fixes | 6 |
| 9 | `feat(ui): add section shell, typography and motion base` | | 7, 8 |
| 10 | `feat(layout): rebuild header, mobile menu and skip link` | | 9 |
| 11 | `feat(layout): rebuild footer, side rails and scroll-to-top` | | 10 |
| 12 | `feat(hero): add h1, ctas and token background` | | 9 |
| 13 | `feat(experience): type data and localize timeline` | | 8, 9 |
| 14 | `feat(techs): type icon data and make marquee accessible` | | 9 |
| 15 | `feat(projects): type data and add responsive grid` | | 9 |
| 16 | `feat(contact): harden form and add sonner feedback` | `.env.example` | 8, 9 |
| 17 | `perf(motion): per-section reveal and chunk prefetch` | | 10–16 |
| 18 | `ci: add quality workflow` | | 5 |
| 19 | `docs: align project conventions` | | all |

## EN/ES Impact

- `src/i18n/EN.ts`/`ES.ts` → `src/i18n/locales/en.ts`/`es.ts`: nested camelCase keys typed via `CustomTypeOptions`; ES must match EN's shape.
- Keys renamed (e.g. `CONTACT.SUCESS` → `contact.success`); every `t()` call updated.
- New keys in both files: techs heading, hero lead/CTAs, skip link, aria-labels, validation, toast and fallback messages, "show more", current/duration plurals, footer.
- Hardcoded strings (Actualidad/Current, Ver Mas, email body) move to keys; both-language data fields rendered.
- EN: obvious typos only; ES: new keys only. Meta/OG tags stay static English (no SSR).

## Affected Areas

| Area | Impact | Description |
|---|---|---|
| `index.html`, `public/` | Modified | pre-paint script, meta/OG, favicon, `cv/` |
| `src/main.tsx`, `src/App.tsx` → `src/app/` | Moved/Modified | providers, landmarks, no splash |
| `src/index.css` | Modified | tokens, typography, motion policy |
| `src/components/**` | Moved/Rewritten | shadcn-only `ui/`; atoms, molecules, layout |
| `src/features/**` | New | sections, typed data, assets |
| `src/hooks`, `src/lib`, `src/types`, `src/i18n` | New/Modified | locale, scroll, reveal, dates, escaping |
| `src/constants`, `src/utils`, `useDocumentDark.ts` | Removed | absorbed by features/lib/theme |
| `src/assets/` | Modified | WebP only |
| `package.json`, `pnpm-lock.yaml`, `.nvmrc` | Modified/New | deps, pinning |
| `eslint.config.js`, `vite.config.ts`, `tsconfig*.json` | Modified | rules, boundaries, single alias |
| `.github/workflows/ci.yml`, `.env.example` | New | CI, env template |
| `CLAUDE.md`, `openspec/config.yaml`, `.cursor/` | Modified | conventions |

## Risks

| Risk | Likelihood | Mitigation |
|---|---|---|
| Review load ~4.5–5k authored lines (~12x budget) | High | recorded `size:exception`; commit-per-unit review |
| No test runner; dark, `es-MX`, reduced-motion regressions | Med | manual matrix per unit; logic isolated in `src/lib` |
| React 19 / react-hooks v7 fallout | Med | isolated unit 5; fixes in same commit |
| CSS SplitText visual parity | Med | before/after comparison; fallback react-spring 10.1.2 |
| Hero flash or stale ScrollTrigger offsets | Med | units 2 and 17 |
| Hero pattern seams on `oklch(0.145)` | Med | visual check; adjust pattern or token |
| Bundle estimates unvalidated | Med | `pnpm build:analyze` after units 4, 5, 16, 17 |
| Hosting/CI Node < 20.19 | Low | `engines`, `.nvmrc`, CI pin |
| `VITE_CONTACT_API_URL` unset in deploy | Med | mailto fallback; `.env.example` |
| Boundary lint patterns misbehave | Low | verify with a deliberate violating import |

## Rollback Plan

- Keep per-unit commits on merge (no squash); revert a unit together with its dependents (Needs column), newest first. If squashed, rollback is whole-change: revert, `pnpm install --frozen-lockfile`, redeploy the previous build.
- **Unit 5 (deps)**: revert restores `package.json` and lockfile; reinstall frozen. React 18 stays viable because unit 4 already removed react-spring.
- **Unit 6 (structure)**: move-only, no behavior change; land only after `pnpm check`, `pnpm build` and a smoke run so later units build on a green base.
- **Unit 4 (SplitText)**: revert restores the react-spring version; after unit 5, pair it with `@react-spring/web@10.1.2`.

## Dependencies

- Recorded `size:exception` before apply (single-pr).
- Node >= 20.19 locally, in CI and on hosting.
- `pnpm dlx sharp-cli@5`, `pnpm dlx shadcn@latest add sonner` (no new build dependency).

## Success Criteria

- [ ] `pnpm check` and `pnpm build` green locally and in CI.
- [ ] Image payload in `dist/assets` < 600 KB (baseline ~5 MB).
- [ ] Main chunk gzip < 111 KB (amended from < 110 KB: React 19 adds about 23 KB gzip; measured 110.69 KB, below the 110.79 KB baseline); Contact chunk gzip < 31 KB (measured 25.36 KB; the ~17 KB estimate was not reached), per `pnpm build:analyze` or the `pnpm build` size table.
- [ ] `@react-spring/web`, `axios`, `notiflix`, `eslint-plugin-import` absent.
- [ ] No splash; no light flash for dark users; no hero flash.
- [ ] One `<h1>`, one `<main>`, skip link, no nested `<section>`.
- [ ] Every icon-only control has an accessible name; every `target="_blank"` has `rel="noopener noreferrer"`.
- [ ] `<html lang>` matches the active language, including `es-MX`.
- [ ] Zero undefined CSS classes.
- [ ] No `@ts-nocheck`, `console.log`, relative imports or non-`@/` aliases in `src/`.
- [ ] EN/ES parity enforced by `tsc`.
- [ ] Contact fields HTML-escaped; mailto fallback when unset; honeypot; request timeout.
- [ ] Reduced motion: static tech grid, no reveals, no smooth scroll.
- [ ] Manual matrix: EN/ES × light/dark × 375/768/1440 px × keyboard-only × reduced motion.

## Owner Follow-ups

- Contact API accepts raw HTML (open relay): fix server-side (structured fields, escaping, rate limit, CORS allowlist).
- Set `VITE_CONTACT_API_URL` for Production and Preview.
- Correct repo URLs: LECO, Consume Weather API, Our Expences API.
- URL or removal for "Leer para Empoderarse" (non-link card meanwhile).
- Confirm whether Informática Atlántida is still current.
- Follow-up changes: Vitest for `src/lib`; ESLint 10 / Vite 8 / TypeScript 6.
