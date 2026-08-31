## Purpose

Ensures every route gives assistive technology and search engines a single, unambiguous top-level heading and a well-formed outline to navigate by, independent of how the page is styled.

## ADDED Requirements

### Requirement: Every route exposes exactly one top-level heading

Every publicly reachable route SHALL contain exactly one `h1` element.

#### Scenario: Professional route

- **WHEN** the server-rendered HTML for `/` is inspected
- **THEN** it SHALL contain exactly one `h1` element

#### Scenario: Hobbies route

- **WHEN** the server-rendered HTML for `/hobbies` is inspected
- **THEN** it SHALL contain exactly one `h1` element

#### Scenario: A route has no visually prominent title

- **WHEN** a route's design has no visible page title
- **THEN** the route SHALL still provide an `h1` that is exposed to assistive technology
- **AND** the visual design SHALL be unchanged by its presence

### Requirement: The top-level heading names the page

The `h1` SHALL describe the page as a whole rather than one section within it.

#### Scenario: Page composed of peer sections

- **WHEN** a route is composed of several peer sections with no single dominant one
- **THEN** the `h1` SHALL name the page, and each section SHALL be introduced by a lower-level heading

### Requirement: Heading outline has no skipped levels

Heading levels within a route SHALL descend without skipping a level.

#### Scenario: Section headings follow the page heading

- **WHEN** the heading outline of a route is walked in document order
- **THEN** each heading SHALL be at most one level deeper than the closest preceding heading
- **AND** no heading level SHALL be skipped

### Requirement: A visually hidden heading remains available to assistive technology

A heading hidden for visual purposes SHALL remain in the accessibility tree and in the server-rendered HTML.

#### Scenario: Visually hidden heading is announced

- **WHEN** a screen reader user navigates the route by heading
- **THEN** a visually hidden `h1` SHALL be announced in the same position it occupies in the document

#### Scenario: Visually hidden heading is not display-suppressed

- **WHEN** a heading is hidden for visual purposes
- **THEN** it SHALL NOT be hidden using `display: none`, `visibility: hidden`, or `aria-hidden`, each of which removes it from the accessibility tree
