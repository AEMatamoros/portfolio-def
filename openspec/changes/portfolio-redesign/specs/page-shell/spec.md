# Delta for Page Shell

## ADDED Requirements

### Requirement: Landmarks and heading outline

The page MUST expose exactly one `<main>`, one `<header>`, one `<footer>` and one `<h1>` (the owner's name in the hero). Every content block MUST be a single `<section>` named by its heading, and a `<section>` MUST NOT contain another `<section>`.

#### Scenario: Single landmarks

- GIVEN the production build is loaded
- WHEN `document.querySelectorAll("main, h1").length` and `document.querySelectorAll("section section").length` are evaluated in the console
- THEN the first is 2 (one of each) and the second is 0
- AND each `<section>` has an accessible name. Verify: manual (DevTools Accessibility tab)

### Requirement: Skip link

A skip link MUST be the first focusable element, hidden until focused, and MUST move focus to the main content when activated.

#### Scenario: Keyboard bypass

- GIVEN a fresh page load
- WHEN the user presses Tab once, then Enter
- THEN a visible, localized "skip to content" link appears and focus lands in `<main>`
- AND the header links are not traversed. Verify: manual keyboard

### Requirement: No splash screen

The page MUST NOT show a timed splash or overlay; the hero MUST be visible as soon as it renders.

#### Scenario: Immediate content

- GIVEN a hard reload with cache disabled
- WHEN the first contentful frame paints
- THEN no full-viewport overlay or fixed delay precedes the hero. Verify: manual (Performance panel)

### Requirement: Header behavior

At the top of the page the header MUST be a full-width bar. At 768 px and wider, after the user scrolls past a threshold, it MUST become a floating inverted pill. The nav link whose section is in view MUST carry `aria-current="location"`. Anchor navigation MUST NOT hide a section heading under the header.

#### Scenario: Pill on scroll

- GIVEN a 1440 px viewport at scroll position 0
- WHEN the user scrolls down about 200 px
- THEN the header becomes a floating pill; scrolling back to 0 restores the bar. Verify: manual

#### Scenario: Active section and offset

- GIVEN the page is loaded
- WHEN the user activates the "Projects" nav link
- THEN the Projects heading is fully visible below the header and that link has `aria-current="location"`. Verify: manual

### Requirement: Mobile menu

Below 768 px the header MUST offer a menu button with an accessible name that opens a navigation sheet. Escape or choosing a link MUST close it, and focus MUST return to the button.

#### Scenario: Open and close

- GIVEN a 375 px viewport, keyboard only
- WHEN the user activates the menu button, then presses Escape
- THEN the sheet opens and closes and focus is on the menu button
- AND the theme and language toggles inside the sheet are operable. Verify: manual

### Requirement: Scroll-to-top control

The scroll-to-top control MUST be a real button with an accessible name, shown only after scrolling past a threshold. While hidden it MUST NOT be focusable or exposed to assistive technology.

#### Scenario: Hidden then shown

- GIVEN scroll position 0
- WHEN the user presses Tab through the whole page, then scrolls down and tabs again
- THEN the control is skipped at the top and reachable once shown, where Enter scrolls to the top. Verify: manual

### Requirement: Accessible names and external links

Every icon-only control MUST have an accessible name. Every `target="_blank"` link MUST have `rel="noopener noreferrer"`. The footer and side rails MUST contain no placeholder `href="#"` links.

#### Scenario: Audit

- GIVEN the production build
- WHEN the DOM is searched for `a[target="_blank"]:not([rel~="noopener"])` and `a[href="#"]`
- THEN both return zero elements. Verify: manual (console); `pnpm lint` (jsx-a11y)

### Requirement: Document metadata

`index.html` MUST declare a description, Open Graph and Twitter tags, `theme-color` for light and dark, and a favicon link that resolves to an existing file. Metadata MAY remain static English.

#### Scenario: Favicon resolves

- GIVEN `pnpm build` completed
- WHEN the favicon `href` from `dist/index.html` is requested from the served build
- THEN it returns 200 and the tags are present in page source. Verify: `pnpm build` + manual
