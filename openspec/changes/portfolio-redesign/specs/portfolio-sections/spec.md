# Delta for Portfolio Sections

## ADDED Requirements

### Requirement: Hero content and CTAs

The hero MUST contain the `<h1>` name, a localized lead, a primary call to action leading to the contact section, and a CV download. The CV link SHOULD serve the CV matching the active language from a stable `/cv/` URL. The hero background MUST follow the active theme without flash.

#### Scenario: CTAs work

- GIVEN English is active
- WHEN the user activates the primary CTA, then the CV link
- THEN Contact scrolls into view and the English CV PDF downloads; in Spanish the Spanish CV downloads. Verify: manual

### Requirement: Experience timeline

The timeline MUST show date and duration on the left and content on the right at 768 px and wider, stacked below. Each entry MUST show a role and description in the active language, a `<time>` element with a machine-readable date, and technology badges. An entry without an end date MUST be marked as current with a localized label.

#### Scenario: Layout and dates

- GIVEN Spanish at 1440 px, then 375 px
- WHEN the timeline is viewed
- THEN two columns then stacked, with Spanish month names, localized durations and "Actualidad" on the current entry. Verify: manual

#### Scenario: English parity

- GIVEN English is active
- WHEN the timeline is viewed
- THEN descriptions are the English fields and the current label reads "Current". Verify: manual

### Requirement: Tech showcase

The section MUST have a localized heading. The marquee MUST loop seamlessly (no jump or gap at the loop point) and MUST pause while hovered or keyboard-focused. The duplicate set MUST be hidden from assistive technology so each technology is announced once, and each technology MUST have an accessible name. Icons MUST be legible in both themes. No React duplicate-key warning MAY occur.

#### Scenario: Seamless and pausable

- GIVEN reduced motion is off at 1440 px
- WHEN the marquee runs through two cycles, then the pointer hovers it, then focus enters it
- THEN no visible jump occurs and motion stops while hovered or focused and resumes after. Verify: manual

#### Scenario: Accessibility tree

- GIVEN the Techs section
- WHEN the Accessibility tree is inspected and the dev console is read
- THEN each technology appears once with a name and no key warning is logged. Verify: manual

### Requirement: Project grid

The grid MUST show 1 column at 375 px, 2 at 768 px and 3 at 1440 px. It SHOULD show 6 projects initially, and a localized "Show more" button SHOULD reveal 6 more each time and disappear when all are visible. Each card MUST show a WebP image with alt text, a localized short description and technology badges. A card with a URL MUST be one link with an accessible name opening in a new tab; a card with an empty URL MUST render as a non-link with no link affordance.

#### Scenario: Show more

- GIVEN more projects than the initial batch
- WHEN the user activates "Show more" until none remain
- THEN batches append in order and the button is removed; keyboard focus is not lost. Verify: manual

#### Scenario: Empty URL

- GIVEN the "Leer para Empoderarse" entry has an empty URL
- WHEN it is clicked or tabbed to
- THEN no navigation or page reload occurs and it is not in the tab order. Verify: manual

### Requirement: Contact section layout

At 1024 px and wider the contact section MUST use two columns (intro and direct links beside the form); below it MUST stack.

#### Scenario: Responsive layout

- GIVEN the Contact section
- WHEN viewed at 1440, 768 and 375 px
- THEN two columns at 1440 px and stacked at the others. Verify: manual

### Requirement: Section anchors

Each section MUST have an anchor id matching its nav link and a heading; unchanged data values (URLs, dates, flags) MUST NOT be corrected in this change.

#### Scenario: Nav targets

- GIVEN the header navigation
- WHEN each link is activated
- THEN the matching section heading is scrolled into view. Verify: manual
