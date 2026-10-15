# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Single-page personal portfolio (Alexis Matamoros) built with Vite 6, React 18, TypeScript (strict), Tailwind CSS v4 and shadcn/ui (`radix-nova` style). There is no router, no global store and no backend in this repo.

## Commands

Use **pnpm only**. The lockfile is `pnpm-lock.yaml`; never add `package-lock.json`.

```bash
pnpm install        # install dependencies
pnpm dev            # Vite dev server
pnpm build          # tsc -b && vite build -> dist/
pnpm preview        # serve dist/
pnpm check          # typecheck + lint + format:check (quality gate, run before finishing)
pnpm typecheck      # tsc -b
pnpm lint           # eslint .
pnpm lint:fix       # eslint ./src --fix
pnpm format         # prettier --write .
pnpm build:analyze  # build with rollup-plugin-visualizer -> dist/stats.html
```

There is no test runner. Verification is `pnpm check`, `pnpm build` and manual checks in `pnpm dev`.

Husky hooks: `pre-commit` runs lint-staged (eslint --fix + prettier on staged `src/**`), `commit-msg` runs commitlint. Commit messages must follow Conventional Commits (`feat:`, `fix:`, `refactor:`, `chore:`).

## Architecture

**Rendering flow.** `index.html` loads `src/main.tsx`, which creates the i18next instance (browser language detector, EN/ES resources from `src/i18n/`) and renders `<I18nextProvider>` with `SplashScreen` and `App`. `src/App.tsx` is the whole page: `Header`, an eager `Hero`, then `Timeline`, `Techs`, `Projects` and `Contact` behind `React.lazy` + `Suspense`, then `Footer` and the fixed rails (`GoToTop`, `ContactOptions`, `EmailOptions`). Each lazy section becomes its own chunk.

**Theme.** Dark mode is the `dark` class on `<html>` (`@custom-variant dark` in `src/index.css`), toggled by the theme toggle component and persisted in `localStorage.theme`. Design tokens are the shadcn oklch variables under `:root` / `.dark` in `src/index.css`, exposed through `@theme inline`. Prefer those tokens (`bg-background`, `text-muted-foreground`, ...) over hardcoded `bg-white dark:bg-black` pairs.

**i18n.** Flat keys in a single `translation` namespace (`src/i18n/EN.ts`, `src/i18n/ES.ts`). Every user-facing string must exist in both files. Compare the language with `i18n.language.startsWith("es")`, never `=== "es"`: the detector can return regional codes such as `es-MX`.

**Animations.** `useScrollAnimation` (used once, in `App`) dynamically imports GSAP and ScrollTrigger and applies a fade-up to the section wrappers. `SplitText` and `ShinyText` under `src/components/animations` are the hero text effects (react-spring + CSS in `index.css`). Keep these modules; never remove animation behavior silently.

**Data.** Portfolio content lives in `src/constants/` (`projects.ts`, `experience.ts`) as plain arrays that section components map over. Project images are static imports from `src/assets/img/portfolio`.

**Contact form.** `useContactForm` (react-hook-form + axios) posts to an external mail API and reports the result with notiflix toasts.

**Imports.** Relative imports (`./`, `../`) are banned by the ESLint `no-restricted-imports` rule. Use `@/` or the aliases `@Components`, `@Hooks`, `@Constants`, `@Utils`, `@Assets`. Aliases are declared in both `vite.config.ts` and `tsconfig.app.json`; keep them in sync.

**shadcn/ui.** Primitives live in `src/components/ui` (lowercase files, added with `pnpm dlx shadcn@latest add <name>` per `components.json`). Use them plus `cn()` from `@/lib/utils` instead of ad-hoc styled elements. `react-refresh/only-export-components` is disabled for that folder.

## Spec-Driven Development

The repo uses OpenSpec under `openspec/`: `config.yaml` holds per-phase rules and the quality commands, active changes live in `openspec/changes/<name>/`, and merged specs live in `openspec/specs/`. Read `openspec/config.yaml` before planning a non-trivial change.
