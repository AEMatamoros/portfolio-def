# Alexis Matamoros — Portfolio

Bilingual (English and Spanish) single-page portfolio built with **React 19**, **TypeScript**, **Vite 6**, **Tailwind CSS v4** and **shadcn/ui**. It has light, dark and system themes, lazy-loaded sections, a contact form with a `mailto:` fallback, and no backend in this repo.

## Quick start

Requirements: Node 22 (see `.nvmrc`; `>=20.19` works) and [pnpm](https://pnpm.io/) (the exact version is pinned in `package.json`). Use pnpm only: this repo ships `pnpm-lock.yaml`.

```bash
pnpm install
pnpm dev        # http://localhost:5173
```

Before opening a pull request, run the same checks CI runs:

```bash
pnpm check      # typecheck + lint + format check
pnpm build      # tsc -b && vite build -> dist/
```

## Scripts

| Command              | What it does                                            |
| -------------------- | ------------------------------------------------------- |
| `pnpm dev`           | Vite dev server with HMR                                |
| `pnpm build`         | Typecheck, then production build into `dist/`           |
| `pnpm preview`       | Serve `dist/` locally (run `pnpm build` first)          |
| `pnpm check`         | `typecheck` + `lint` + `format:check`, the quality gate |
| `pnpm lint:fix`      | ESLint with autofix on `src`                            |
| `pnpm format`        | Prettier write                                          |
| `pnpm build:analyze` | Build and open the bundle treemap (`dist/stats.html`)   |

There is no test runner. Verification is `pnpm check`, `pnpm build` and a manual pass in the browser.

## Configuration

| Variable               | Required | Purpose                                                                                                                                            |
| ---------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `VITE_CONTACT_API_URL` | No       | `http:` or `https:` endpoint that receives the contact message (`POST` JSON `{ "html": "..." }`). Unset shows a `mailto:` link instead of the form |

Copy `.env.example` to `.env.local` and fill it in. `VITE_*` values are inlined into the public bundle, so never put secrets there. Set the variable in the hosting dashboard for Production and Preview before deploying.

## Project structure

The code is feature-first. ESLint enforces the import direction, and the only alias is `@/` (to `src/`).

| Path                                                    | Contents                                                                  |
| ------------------------------------------------------- | ------------------------------------------------------------------------- |
| `src/features/{hero,experience,techs,projects,contact}` | One folder per page section: container, `components/`, `data/`, `assets/` |
| `src/components`                                        | Shared kit: `ui` (shadcn), `animations`, `atoms`, `molecules`, `layout`   |
| `src/{hooks,lib,types}`                                 | Shared hooks, framework-free helpers and types                            |
| `src/{config,i18n,theme}`                               | Site constants and env, typed EN/ES locales, theme provider               |
| `src/app`, `src/main.tsx`                               | App shell and providers                                                   |
| `public/cv`                                             | Static CV PDFs, one per language                                          |

See `CLAUDE.md` for the full rules (import tiers, i18n, theme, motion, contact form).

## Images

Raster images are WebP. Convert a new image with `sharp-cli`, then commit only the `.webp`:

```bash
pnpm dlx sharp-cli@5 resize 800 450 --fit cover --position top --withoutEnlargement -i input.png -o output.webp -f webp --quality 80
```

## Contributing

- Commits follow [Conventional Commits](https://www.conventionalcommits.org/); Husky runs lint-staged and commitlint.
- Add every user-facing string to both `src/i18n/locales/en.ts` and `es.ts`; `pnpm check` fails if their shapes differ.
- CI (`.github/workflows/ci.yml`) runs `pnpm install --frozen-lockfile`, `pnpm check` and `pnpm build` on pull requests and pushes to `main`.
