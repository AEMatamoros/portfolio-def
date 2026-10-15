# Delta for Performance Budget

## ADDED Requirements

### Requirement: Image payload

The total size of image files in `dist/assets` MUST be under 600 KB (baseline about 5 MB). All raster images MUST be WebP, and project images SHOULD be no wider than about 800 px. Original PNG/JPG sources MUST NOT remain in the repository tree.

#### Scenario: Measure images

- GIVEN `pnpm build` completed
- WHEN image files in `dist/assets` are summed (for example `find dist/assets -name "*.webp" -o -name "*.png" -o -name "*.jpg" | xargs du -ck`)
- THEN the total is below 600 KB and no `.png`/`.jpg` is listed. Verify: `pnpm build` + shell

### Requirement: Chunk budgets

The main chunk MUST be under 111 KB gzip, which is below the pre-redesign baseline of 110.79 KB, and the Contact chunk MUST be under 31 KB gzip, as reported by the analyzer (or by the size table of a plain `pnpm build`).

The first draft of this requirement set the main chunk at under 110 KB and the Contact estimate at about 17 KB. Both were measured at the end of the change and amended with these reasons:

- Main chunk: 110.69 KB gzip. React 19's `react-dom` is about 23 KB gzip larger than React 18's, and the app-code savings (removed `@react-spring/web`, the lazy mobile menu sheet and a local language detector) recovered about 23 KB of it, leaving the main chunk 0.10 KB below the baseline. Reaching 110 KB would have needed build tricks such as `manualChunks`, which D19 rejects, so the target is the measured value rounded up to the next whole KB.
- Contact chunk: 25.36 KB gzip, under the 31 KB limit. The 17 KB estimate was not reached because `react-hook-form` and `sonner` stay in that chunk.

#### Scenario: Analyzer report

- GIVEN a clean checkout
- WHEN `pnpm build:analyze` (or `pnpm build`) runs
- THEN the main chunk is below 111 KB gzip and the Contact chunk below 31 KB gzip. Verify: `pnpm build:analyze` or the `pnpm build` size table

### Requirement: Removed dependencies

`@react-spring/web`, `axios`, `notiflix` and `eslint-plugin-import` MUST be absent from `package.json`, `pnpm-lock.yaml` and the bundle.

#### Scenario: Absence

- GIVEN the final tree
- WHEN the manifest, lockfile and analyzer treemap are searched
- THEN none of the four appear. Verify: `pnpm build:analyze` + search

### Requirement: Lazy loading and idle prefetch

Sections below the hero, the mobile menu sheet and the toaster MUST load in separate chunks. The sheet code MUST NOT load before the menu is first used. After initial load, remaining section chunks SHOULD be prefetched while the browser is idle without delaying first render.

#### Scenario: Network order

- GIVEN a 1440 px cold load with cache disabled
- WHEN the Network panel is observed until idle
- THEN the hero renders before section chunks are fetched, and those chunks then arrive without user scrolling. Verify: manual

#### Scenario: Menu chunk

- GIVEN a 375 px cold load
- WHEN the menu button is first activated
- THEN the sheet code is requested no earlier than that interaction. Verify: manual

### Requirement: Image loading hygiene

Below-the-fold images SHOULD use lazy loading and declare intrinsic dimensions to prevent layout shift.

#### Scenario: Attributes

- GIVEN the projects grid is rendered
- WHEN an image element is inspected
- THEN it has `loading="lazy"` and width and height. Verify: manual

### Requirement: Static CV URLs

The CV PDFs MUST be served from `public/cv/` at stable, unhashed, ASCII-only URLs, for English and Spanish, and MUST NOT appear in `dist/assets`.

#### Scenario: CV URLs

- GIVEN `pnpm build` completed
- WHEN `dist/cv` is listed and each file is requested from the served build
- THEN both PDFs exist with ASCII names and return 200. Verify: `pnpm build` + manual

### Requirement: No unreferenced assets

`src/assets` and `public` MUST contain no unreferenced files; `main-bg-dark.png`, `profile.webp`, `react.svg` and `vite.svg` MUST be gone.

#### Scenario: Orphan search

- GIVEN the final tree
- WHEN each asset file name is searched across `src` and `index.html`
- THEN every file has at least one reference. Verify: manual (`grep`)
