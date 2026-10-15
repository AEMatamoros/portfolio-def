---
name: portfolio
description: Maintain this Vite + React portfolio — pnpm, shadcn/ui, Husky/commitlint, and performance-sensitive patterns.
---

# Portfolio skill

When changing this repo:

1. Run `pnpm check` before finishing (typecheck, ESLint, Prettier), and `pnpm build` when you touch imports, assets or config.
2. Use shadcn components under `src/components/ui` and `@/lib/utils` `cn()`.
3. Do not add `package-lock.json`; use `pnpm-lock.yaml` only.
4. Commits must pass `commitlint` (conventional commits).
5. Import with the single `@/` alias only. Relative imports are banned.
6. Respect the import tiers that ESLint enforces:

   | Tier | Paths                                              | May import                       |
   | ---- | -------------------------------------------------- | -------------------------------- |
   | 0    | `src/lib`, `src/types`                             | tier 0                           |
   | 1    | `src/config`, `src/i18n`, `src/theme`, `src/hooks` | tiers 0 and 1                    |
   | 2    | `src/components`                                   | tiers 0 to 2                     |
   | 3    | `src/features/<name>`                              | tiers 0 to 2 and its own feature |
   | 4    | `src/main.tsx`, `src/app`                          | everything                       |

7. Add user-facing strings to both `src/i18n/locales/en.ts` and `es.ts` with the same nested shape, and read the language with `useLocale()`.
8. Convert images to WebP with `pnpm dlx sharp-cli@5 resize <w> <h> --fit cover --position top --withoutEnlargement -i <in> -o <out>.webp -f webp --quality 80`, and never commit PNG or JPG originals.
9. Keep animations (`SplitText`, `ShinyText`, the GSAP `useReveal` hook) and honor `prefers-reduced-motion`.
