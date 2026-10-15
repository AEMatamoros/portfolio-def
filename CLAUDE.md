# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Single-page personal portfolio (Alexis Matamoros) built with Vite 6, React 19, TypeScript (strict), Tailwind CSS v4 and shadcn/ui (`radix-nova` style). There is no router, no global store and no backend in this repo. There is no splash screen: the first paint is the hero.

## Commands

Use **pnpm only**. The lockfile is `pnpm-lock.yaml`; never add `package-lock.json` or `yarn.lock`. Node is pinned by `.nvmrc` (22, with `engines.node` `>=20.19`) and pnpm by `packageManager` in `package.json`.

```bash
pnpm install        # install dependencies (CI uses --frozen-lockfile)
pnpm dev            # Vite dev server
pnpm build          # tsc -b && vite build -> dist/
pnpm preview        # serve dist/
pnpm check          # typecheck + lint + format:check (quality gate, run before finishing)
pnpm typecheck      # tsc -b
pnpm lint           # eslint .
pnpm lint:fix       # eslint ./src --fix
pnpm format         # prettier --write .
pnpm build:analyze  # build with rollup-plugin-visualizer -> dist/stats.html (opens a browser)
```

There is no test runner. Verification is `pnpm check`, `pnpm build` and manual checks in a browser (`pnpm dev`, or `pnpm build && pnpm preview`).

**CI.** `.github/workflows/ci.yml` runs `pnpm install --frozen-lockfile`, `pnpm check` and `pnpm build` on pull requests and pushes to `main`.

**Hooks.** Husky `pre-commit` runs lint-staged (eslint --fix + prettier on staged `src/**`); `commit-msg` runs commitlint. Commit messages must follow Conventional Commits (`feat:`, `fix:`, `refactor:`, `chore:`, `perf:`, `ci:`, `docs:`).

**Images.** Raster images are WebP, resized at the source so `dist/assets` stays small. Convert with `sharp-cli` (no install needed):

```bash
pnpm dlx sharp-cli@5 resize <w> <h> --fit cover --position top --withoutEnlargement -i <in> -o <out>.webp -f webp --quality 80
```

Project thumbnails are 800x450 (`--position top` keeps the site header of a screenshot); hero patterns are 1024 px wide (omit `<h>` and the `--fit` and `--position` flags). Commit only the `.webp`, never the PNG or JPG original. CV PDFs live in `public/cv/` with ASCII names.

## Architecture

**Layout and boundaries.** Code is feature-first: five features (`hero`, `experience`, `techs`, `projects`, `contact`) plus a small shared kit. ESLint (`no-restricted-imports` in `eslint.config.js`) enforces who may import whom:

| Tier | Paths                                                                 | May import                                                |
| ---- | --------------------------------------------------------------------- | --------------------------------------------------------- |
| 0    | `src/lib`, `src/types`                                                | tier 0 only                                               |
| 1    | `src/config`, `src/i18n`, `src/theme`, `src/hooks`                    | tiers 0 and 1                                             |
| 2    | `src/components` (`ui`, `animations`, `atoms`, `molecules`, `layout`) | tiers 0 to 2                                              |
| 3    | `src/features/<name>`                                                 | tiers 0 to 2 and its own feature, never a sibling feature |
| 4    | `src/main.tsx`, `src/app`                                             | everything                                                |

Only `main.tsx` imports `app`. Promote code to the shared kit only when two or more features use it. `src/components/ui` holds shadcn primitives only.

**Imports.** The only alias is `@/` (to `src/`), declared in `vite.config.ts`, `tsconfig.json` (the shadcn CLI reads it) and `tsconfig.app.json`; keep them in sync. Relative imports (`./`, `../`) and file extensions in import paths are banned. Components use named exports; only modules loaded with `React.lazy` (`*Section.tsx`, `MobileMenu.tsx`) use a default export.

**Page flow.** `main.tsx` renders `StrictMode` > `AppProviders` (i18next and theme providers) > `App`. `App` is a skip link, `Header`, `<main id="main">`, `Footer`, side rails and scroll-to-top. `HeroSection` is eager and owns the only `<h1>`; the other four sections are `React.lazy` chunks that mount after first paint (`useDeferredSections`: browser idle within 1.5 s, an initial hash, `hashchange` or the first scroll), so `/#contact` and nav links work before a chunk arrives. The mobile menu (`MobileMenu`, a shadcn Sheet) loads on first use. Every section is one `SectionShell` `<section>` named by its `SectionHeader` heading; sections never nest, and ids come from `config/site.ts`.

**Containers and presentation.** A file at a feature root is a container: it reads data, calls `useTranslation` or `useLocale` and builds the view model. Files in `features/*/components` take props only. Portfolio content lives in typed `features/*/data/*.ts` with `Localized` EN/ES fields; images sit next to their feature in `assets/`.

**Theme.** `ThemeProvider` and `useTheme` live in `src/theme`. The mode (`light`, `dark` or `system`) is stored in `localStorage.theme`; a missing or invalid value means system. An inline script in `index.html` applies the `dark` class and `color-scheme` before first paint, so there is no flash. Design tokens are the shadcn oklch variables in `src/index.css` (`:root` and `.dark`, exposed through `@theme inline`): use `bg-background`, `text-muted-foreground`, ... rather than hardcoded `bg-white dark:bg-black` pairs.

**i18n.** Nested camelCase keys in one `translation` namespace: `src/i18n/locales/en.ts` is the source of truth and `es.ts` must have exactly the same shape, otherwise `pnpm check` fails (keys passed to `t()` are typed too). Add every user-facing string to both files; never change existing Spanish copy. Read the language with `useLocale()` (`"en" | "es"`), never by comparing `i18n.language`. The initial language comes from the stored `i18nextLng`, then the browser languages, then English, and regional codes such as `es-MX` resolve to their primary language (`src/i18n/detect-locale.ts`). `<html lang>` follows the active language.

**Motion.** Hero text uses the CSS-driven `SplitText` and `ShinyText` (`src/components/animations`), the tech marquee is CSS, and section reveals are GSAP: `useReveal` (called by `SectionShell`) lazy-loads GSAP through `lib/gsap.ts` and fades each section's content in once; the hero is excluded and content stays visible if GSAP fails to load. One `prefers-reduced-motion: reduce` block in `src/index.css`, plus matching JavaScript checks, turns off reveals, the marquee, the shine, smooth scrolling and the theme transition. Never remove animation behavior silently.

**Contact form.** `features/contact` uses react-hook-form with validation codes translated at render time, `fetch` with a 10 s abort, an escaped HTML message body and sonner toasts (the Toaster stays inside the Contact chunk). The endpoint is the public build-time variable `VITE_CONTACT_API_URL` (an `http:` or `https:` URL read in `src/config/env.ts`; see `.env.example`, copy it to `.env.local`). When it is unset the section shows a localized `mailto:` fallback instead of the form.

**shadcn/ui.** Primitives live in `src/components/ui` (added with `pnpm dlx shadcn@latest add <name>` per `components.json`; check that the CLI did not rewrite the `cn` import away from `@/lib/utils`). Use them plus `cn()` from `@/lib/utils` instead of ad-hoc styled elements. `react-refresh/only-export-components` is disabled for that folder.

## Spec-Driven Development

The repo uses OpenSpec under `openspec/`: `config.yaml` holds per-phase rules and the quality commands, active changes live in `openspec/changes/<name>/`, and merged specs live in `openspec/specs/`. Read `openspec/config.yaml` before planning a non-trivial change.
