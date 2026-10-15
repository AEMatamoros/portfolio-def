# Delta for Codebase Conventions

## ADDED Requirements

### Requirement: pnpm and Node pinning

The project MUST use pnpm only: `pnpm-lock.yaml` is the sole lockfile, `package.json` declares `packageManager` and `engines.node` of `>=20.19`, and `.nvmrc` matches. `package-lock.json` and `yarn.lock` MUST NOT exist.

#### Scenario: Frozen install

- GIVEN a clean clone on Node 20.19 or later
- WHEN `pnpm install --frozen-lockfile` runs
- THEN it succeeds and no other lockfile exists. Verify: shell

### Requirement: Runtime and tooling versions

React and React DOM MUST be 19.x, i18next 26.x with react-i18next 17.x, and `@vitejs/plugin-react-swc` 4.x; `sonner` and `eslint-plugin-jsx-a11y` MUST be added. ESLint, Vite and TypeScript majors MUST remain as before.

#### Scenario: Manifest check

- GIVEN the final `package.json`
- WHEN versions are read
- THEN they match and `pnpm check` and `pnpm build` pass. Verify: `pnpm check`, `pnpm build`

### Requirement: Single alias

Only the `@/` alias (to `src/`) MUST exist; all other aliases MUST be removed from config. `src/` MUST contain no `./` or `../` imports, no other alias and no file extensions in import paths.

#### Scenario: Banned import

- GIVEN a `../` import is added in `src`
- WHEN `pnpm lint` runs
- THEN it fails. Verify: `pnpm lint`

### Requirement: Folder boundaries

Source MUST be organized as feature folders (hero, experience, techs, projects, contact) plus a shared kit; `ui/` MUST hold shadcn primitives only. Shared code MUST NOT import from features, and a feature MUST NOT import from a sibling feature, enforced by lint. Presentational components SHOULD take props only, with i18n and data access in the section container.

#### Scenario: Boundary violation

- GIVEN a shared module imports from a feature, then a feature imports a sibling feature
- WHEN `pnpm lint` runs after each
- THEN both fail. Verify: `pnpm lint`

### Requirement: Lint and type rules

ESLint MUST enable `react-hooks` recommended rules and `jsx-a11y`, set `no-console` to warn and unused variables to error. `src/` MUST NOT contain `@ts-nocheck` or `console.log`.

#### Scenario: Rule enforcement

- GIVEN an unused variable and a `console.log` are added
- WHEN `pnpm lint` runs
- THEN the variable fails and the log warns. Verify: `pnpm lint`

### Requirement: Dead code removal

`BlurText`, the unused pagination and separator primitives and every reference to them in docs and rules MUST be removed. Every CSS class used in markup MUST be defined (no `text-detail`, `text-darksecondary`, `animate-clip-shrink`, `sticky-nav`, `goTop`).

#### Scenario: Class audit

- GIVEN the final source
- WHEN the listed class names and `BlurText` are searched
- THEN no match remains. Verify: manual (`grep`)

### Requirement: Continuous integration

A workflow MUST run on pull requests and pushes to the default branch using the pinned Node version, executing `pnpm install --frozen-lockfile`, `pnpm check` and `pnpm build`, failing if any step fails.

#### Scenario: Failing check

- GIVEN a pull request with a type error
- WHEN the workflow runs
- THEN the check step fails and the run is red. Verify: manual (CI run)

### Requirement: Commit and unit discipline

Commits MUST follow Conventional Commits (commitlint). Each work unit MUST be one commit leaving `pnpm check` and `pnpm build` green.

#### Scenario: Message lint

- GIVEN a non-conventional message
- WHEN the commit-msg hook runs
- THEN the commit is rejected. Verify: manual

### Requirement: Aligned documentation

`CLAUDE.md`, `openspec/config.yaml` and `.cursor/` MUST describe the single alias, new structure, React 19 and the image-conversion command, and `.env.example` MUST list `VITE_CONTACT_API_URL`.

#### Scenario: Stale references

- GIVEN the docs are updated
- WHEN searched for `@Components`, `@Hooks`, `EN.ts` and `BlurText`
- THEN none remain. Verify: manual (`grep`)
