# Delta for Localization

## ADDED Requirements

### Requirement: Language detection with regional codes

The site MUST support English and Spanish. Any `es-*` browser language (for example `es-MX`) MUST resolve to Spanish, any `en-*` to English, and anything else to English. Language controls MUST show the active language for regional codes too.

#### Scenario: es-MX browser

- GIVEN empty storage and browser language `es-MX`
- WHEN the page loads
- THEN the UI is Spanish and the language toggle label matches Spanish. Verify: manual (browser language setting)

#### Scenario: Unsupported language

- GIVEN browser language `fr-FR`
- WHEN the page loads
- THEN the UI is English. Verify: manual

### Requirement: Language selection

The toggle MUST switch language without reload, and the explicit choice SHOULD persist across reloads.

#### Scenario: Toggle and reload

- GIVEN English is active
- WHEN the user switches to Spanish and reloads
- THEN Spanish remains active. Verify: manual

### Requirement: Document language sync

`<html lang>` MUST be non-empty and its primary subtag MUST match the active language at load and after every switch.

#### Scenario: Attribute follows language

- GIVEN `es-MX` browser language
- WHEN `document.documentElement.lang` is read, then the language is switched to English
- THEN it starts with `es`, then starts with `en`. Verify: manual

### Requirement: Type-level EN/ES parity

Locale resources MUST use nested camelCase keys. The Spanish resource MUST have exactly the shape of the English one, and `t()` calls MUST only accept existing keys; violations MUST fail `pnpm check`.

#### Scenario: Missing Spanish key

- GIVEN a key is deleted from the Spanish resource only
- WHEN `pnpm check` runs
- THEN it exits non-zero. Verify: `pnpm check`

#### Scenario: Unknown key

- GIVEN a `t()` call uses a non-existent key
- WHEN `pnpm check` runs
- THEN it exits non-zero. Verify: `pnpm check`

### Requirement: No hardcoded user-facing strings

All visible text, accessible names, placeholders, validation, toast and fallback messages, the email body, "Current" and "Show more" labels MUST come from locale resources, in both languages.

#### Scenario: Spanish sweep

- GIVEN Spanish is active
- WHEN each section, the mobile menu, a failed form submit and the footer are viewed
- THEN no English UI copy remains (proper nouns, technology names and single-language content data excepted). Verify: manual

### Requirement: Localized content and dates

Content with English and Spanish fields MUST render the active-language field. Dates MUST be formatted with the active locale, and durations MUST use localized plural forms.

#### Scenario: Timeline in Spanish

- GIVEN Spanish is active
- WHEN the experience timeline is viewed
- THEN descriptions and month names are Spanish and the current role reads "Actualidad". Verify: manual

### Requirement: Copy change scope

Existing English copy MAY change only to fix obvious typos. Existing Spanish copy MUST NOT change; only new keys MAY be added. Metadata MAY remain static English.

#### Scenario: Diff review

- GIVEN the final locale diff
- WHEN reviewed against the base branch
- THEN Spanish changes are additions only and English edits are typo fixes. Verify: manual (`git diff`)
