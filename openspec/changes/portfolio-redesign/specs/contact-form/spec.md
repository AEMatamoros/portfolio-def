# Delta for Contact Form

## ADDED Requirements

### Requirement: Fields and validation

Name, email and message MUST be required; company and phone MUST be optional. Each field MUST have a maximum length and the email MUST be format-checked. Invalid submissions MUST send no request and MUST show a localized error beside each invalid field, linked with `aria-invalid` and `aria-describedby`. Fields SHOULD set appropriate `autocomplete` values.

#### Scenario: Empty required fields

- GIVEN an empty form in Spanish
- WHEN the user submits
- THEN Spanish errors appear beside name, email and message and no network request is made. Verify: manual (Network panel)

#### Scenario: Optional fields

- GIVEN valid name, email and message with company and phone empty
- WHEN the user submits
- THEN the form validates. Verify: manual

### Requirement: Output escaping

Every field MUST be HTML-escaped (`& < > " '`) before being placed in the HTML message sent to the API.

#### Scenario: Script injection

- GIVEN the name field holds `<img src=x onerror=alert(1)>`
- WHEN the form is submitted
- THEN the request body contains `&lt;img` and no raw `<img`. Verify: manual (Network panel)

### Requirement: Honeypot

The form MUST include a decoy field hidden visually, skipped by keyboard and hidden from assistive technology. If it is filled, no request MUST be sent, and the outcome SHOULD look like success to the sender.

#### Scenario: Bot submission

- GIVEN the decoy field is filled via DevTools
- WHEN the form is submitted with valid data
- THEN no network request is made. Verify: manual

### Requirement: Endpoint configuration

The API URL MUST come from `VITE_CONTACT_API_URL` and MUST NOT be hardcoded in source or bundle. `.env.example` MUST document it as public configuration.

#### Scenario: Variable set

- GIVEN `VITE_CONTACT_API_URL` points to a test endpoint
- WHEN a valid form is submitted
- THEN the request goes to that URL. Verify: manual
- AND the former hardcoded host is absent from `dist`. Verify: `pnpm build` + search

### Requirement: Timeout and pending state

The request MUST be aborted after a finite timeout. While in flight, submission MUST be disabled to prevent duplicates, and it MUST re-enable when the request ends.

#### Scenario: Stalled request

- GIVEN the endpoint is blocked or never responds
- WHEN a valid form is submitted
- THEN the button is disabled while pending, then an error toast appears at timeout and the button re-enables. Verify: manual (Network throttling)

### Requirement: Toast feedback

Success and failure (network error, non-2xx, timeout) MUST show a localized toast announced through a live region, themed to the active theme. Success MUST clear the form; failure MUST keep the entered values.

#### Scenario: Success

- GIVEN the endpoint returns 2xx
- WHEN a valid form is submitted
- THEN a localized success toast appears and the form is cleared. Verify: manual

#### Scenario: Failure

- GIVEN the endpoint returns 500
- WHEN a valid form is submitted
- THEN a localized error toast appears and values remain. Verify: manual

### Requirement: Mailto fallback

When `VITE_CONTACT_API_URL` is unset or empty the section MUST make no network request and MUST offer a `mailto:` action to the owner with a localized subject and body, with no console error.

#### Scenario: Variable unset

- GIVEN a build without `VITE_CONTACT_API_URL`
- WHEN the Contact section is used
- THEN a mailto action opens a prefilled draft in the active language. Verify: `pnpm build` + manual

### Requirement: No legacy feedback stack

The form MUST NOT depend on `axios`, `notiflix` or `next-themes`; feedback MUST use `sonner` bound to the local theme.

#### Scenario: Dependency check

- GIVEN the final `package.json`
- WHEN searched for those names
- THEN none appear. Verify: manual (`pnpm why`)
