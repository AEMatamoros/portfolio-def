# Apply progress: portfolio-redesign

Change `portfolio-redesign` | store `openspec` | mode Standard (strict TDD off, no test runner) | delivery `single-pr` with recorded `size:exception` (user-approved).

Batch 1 covers units 1 to 6. Units 7 to 19 are pending. Manual browser scenarios are never marked done by the apply executor; they are listed under "Deferred manual checks".

## Unit status

| Unit | Commit subject | Status |
| ---- | -------------- | ------ |
| 1 | chore: remove dead code and assets | committed |
| 2 | perf: remove splash screen | committed (see git log) |
| 3 | perf: convert images to webp | pending |
| 4 | refactor(animations): css-driven split text | pending |
| 5 | build(deps): upgrade react 19, i18next 26 and tooling | pending |
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

## Deferred manual checks

These sub-tasks stay unchecked in `tasks.md`; the orchestrator must run them in a browser.

- 1.8: `pnpm preview` page visually unchanged in EN/ES, light/dark (header, hero, timeline, carousel, projects pagination, contact).
- 2.6: DevTools Performance at CPU 6x, cache disabled, hard reload: no overlay or fixed delay before the hero, hero never visible, hidden, visible; with `localStorage.theme="dark"` no light frame.
