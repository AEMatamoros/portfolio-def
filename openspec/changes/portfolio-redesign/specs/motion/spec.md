# Delta for Motion

## ADDED Requirements

### Requirement: Single reduced-motion policy

When `prefers-reduced-motion: reduce` is set, the site MUST disable the tech marquee movement (static wrapped grid), scroll reveals (content shown in final state), the ShinyText shine, and smooth scrolling, including scroll-to-top and anchor navigation. Hero text animation SHOULD render its final state immediately.

#### Scenario: Reduced motion on

- GIVEN reduced motion is emulated
- WHEN the page is loaded and scrolled, and a nav link and scroll-to-top are used
- THEN nothing animates, content is visible and scrolling is instant. Verify: manual (DevTools Rendering)

#### Scenario: Reduced motion off

- GIVEN no reduced-motion preference
- WHEN the same steps run
- THEN reveals, marquee, shine and smooth scrolling work. Verify: manual

### Requirement: Hero text animation parity

The hero name MUST keep the previous letter-by-letter reveal (same props, duration, stagger and easing feel) without `@react-spring/web`. It MUST expose the full text as one accessible name, hide individual letters from assistive technology, and cause no layout shift.

#### Scenario: Visual parity

- GIVEN the old build and the new build side by side
- WHEN the page loads in each
- THEN timing and stagger are visually equivalent. Verify: manual
- AND `@react-spring/web` is absent from the bundle. Verify: `pnpm build:analyze`

### Requirement: ShinyText retained

The shine effect on the primary call to action MUST remain, and MUST be static under reduced motion.

#### Scenario: Shine present

- GIVEN reduced motion is off
- WHEN the hero is viewed for 5 seconds
- THEN the shine sweeps the CTA text. Verify: manual

### Requirement: Once-only scroll reveal

Each section except the hero MUST reveal once when it enters the viewport and MUST NOT hide again when scrolled out. The hero MUST NOT be hidden or flash at load. Content MUST stay visible if the animation library fails to load.

#### Scenario: Reveal once

- GIVEN the page is at the top
- WHEN the user scrolls to Projects, back to the top, then to Projects again
- THEN Projects reveals on first entry and stays visible afterwards. Verify: manual

#### Scenario: Lazy section offsets

- GIVEN a throttled network
- WHEN the user jumps via nav link to Contact before its chunk loads
- THEN Contact becomes visible and is not stuck hidden. Verify: manual

#### Scenario: No hero flash

- GIVEN a hard reload
- WHEN the hero first paints
- THEN it never goes visible, hidden, visible. Verify: manual (Performance filmstrip)

### Requirement: Tech marquee under reduced motion

Under reduced motion the tech showcase MUST render as a static grid with a single, non-duplicated set of technologies. Marquee behavior otherwise follows `portfolio-sections`.

#### Scenario: Static grid

- GIVEN reduced motion is emulated
- WHEN the Techs section is viewed at 375 and 1440 px
- THEN all technologies are visible, wrapped and unmoving. Verify: manual

### Requirement: Theme-change animation

A theme change MAY animate (for example a circular reveal) where the browser supports it. It MUST be skipped under reduced motion and MUST NOT block the theme from applying where unsupported.

#### Scenario: Unsupported or reduced

- GIVEN reduced motion is on or the animation API is unavailable
- WHEN the theme is toggled
- THEN the theme changes immediately without error. Verify: manual

### Requirement: Declared motion changes

The only removed motion MUST be the splash fade, the unused BlurText component, the project fade-pagination (replaced by "show more") and the dark-only load-time clip reveal (replaced by the user-triggered theme-change View Transition, which is skipped under reduced motion). No other existing animation behavior MAY be removed.

#### Scenario: Behavior diff

- GIVEN the final branch and the base
- WHEN animations are compared section by section
- THEN only the four declared changes differ. Verify: manual
