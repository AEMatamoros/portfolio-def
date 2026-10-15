# Delta for Theming

## ADDED Requirements

### Requirement: Theme modes and default

The site MUST support light, dark and system modes. With no stored preference the mode MUST be system.

#### Scenario: First visit follows OS

- GIVEN empty storage and an OS set to dark
- WHEN the page loads
- THEN the dark palette is shown and the toggle reflects system mode. Verify: manual (DevTools Rendering emulation)

### Requirement: Pre-paint application

The theme MUST be applied before first paint, so dark users never see a light frame, and the page background MUST come from theme tokens.

#### Scenario: No light flash

- GIVEN the stored or system theme is dark
- WHEN the page is hard-reloaded with CPU 6x slowdown and cache disabled
- THEN no light frame appears in the Performance screenshots. Verify: manual
- AND `dist/index.html` contains the theme logic in `<head>` before the body. Verify: `pnpm build`

### Requirement: Persistence and system tracking

An explicit choice MUST persist across reloads. A missing or invalid stored value MUST fall back to system. In system mode an OS preference change MUST update the page without reload.

#### Scenario: Persisted choice

- GIVEN the user selects light while the OS is dark
- WHEN the page is reloaded
- THEN light is shown. Verify: manual

#### Scenario: Live OS change

- GIVEN system mode
- WHEN the OS preference flips from light to dark
- THEN the page switches without reload. Verify: manual

#### Scenario: Corrupt value

- GIVEN storage holds an unrecognized theme value
- WHEN the page loads
- THEN system mode is used with no console error. Verify: manual

### Requirement: Single source of truth for toggles

All theme controls (header and mobile menu) MUST read and write one shared state. Theme-dependent visuals, including the hero background and toasts, MUST follow that same state.

#### Scenario: Synced toggles

- GIVEN a 375 px viewport with the menu sheet open
- WHEN the theme is changed in the sheet
- THEN the header toggle label and the whole page reflect the new theme. Verify: manual

### Requirement: Toggle accessibility

The theme toggle MUST have a localized accessible name and expose its current state or the action it performs.

#### Scenario: Screen reader name

- GIVEN the toggle is focused
- WHEN the Accessibility tree is inspected
- THEN a non-empty localized name is present and updates after activation. Verify: manual

### Requirement: Token palette and contrast

Surfaces and text MUST use semantic tokens. The dark background MUST be the neutral token (about `oklch(0.145)`), not pure black. Body and muted text MUST reach WCAG AA contrast (4.5:1) in both themes.

#### Scenario: Contrast audit

- GIVEN each theme at 1440 px
- WHEN the timeline, project and contact text is checked with the DevTools contrast tool
- THEN no text is below 4.5:1. Verify: manual

#### Scenario: Hero seams

- GIVEN the dark theme
- WHEN the hero pattern is inspected at 375, 768 and 1440 px
- THEN no visible seam appears between the pattern and the background. Verify: manual

### Requirement: Focus ring

Every interactive element MUST show a visible keyboard focus indicator (at least 3:1 against its surroundings) in both themes.

#### Scenario: Keyboard focus

- GIVEN either theme
- WHEN the user tabs through header, hero, cards, form and footer
- THEN each focused element shows a ring. Verify: manual
