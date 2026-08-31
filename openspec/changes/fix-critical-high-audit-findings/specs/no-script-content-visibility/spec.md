## Purpose

Guarantees that content present in the server-rendered HTML is actually readable by a visitor, so that a scroll-reveal animation or any other client-side enhancement can never be the reason a section of the site is invisible.

## ADDED Requirements

### Requirement: Server-rendered content is visible without client JavaScript

Any content present in the server-rendered HTML SHALL be visible to a user whose client JavaScript does not execute.

#### Scenario: JavaScript is disabled in the browser

- **WHEN** a visitor loads a route with JavaScript disabled
- **THEN** every section present in the server-rendered HTML SHALL be visible and readable
- **AND** no section SHALL render at zero opacity, zero height, or be otherwise visually suppressed

#### Scenario: The client bundle fails to load

- **WHEN** the client JavaScript bundle returns an error, times out, or is blocked by a network policy
- **THEN** the page SHALL remain fully readable, including any section that would otherwise be revealed on scroll

#### Scenario: Hydration has not completed yet

- **WHEN** the server HTML has painted but hydration has not yet run
- **THEN** all content SHALL already be visible rather than waiting for a client-side reveal

### Requirement: Progressive enhancements degrade to visible

A visual enhancement that hides content as part of its resting state SHALL apply that hidden state from the client only, never from the server-rendered markup.

#### Scenario: Scroll reveal enhancement is active

- **WHEN** a section is wrapped in a scroll-reveal enhancement and JavaScript is running
- **THEN** the section MAY start hidden and animate into view as it enters the viewport
- **AND** the hidden state SHALL have been applied by the client after mount, not served in the initial HTML

#### Scenario: The reveal trigger never fires

- **WHEN** the mechanism that would reveal a section never fires for any reason
- **THEN** the section SHALL become visible rather than remaining hidden indefinitely

### Requirement: Enhancement must not introduce a flash of visible content

Applying the hidden state from the client SHALL NOT cause content to visibly appear and then disappear during a normal page load.

#### Scenario: Normal page load with JavaScript enabled

- **WHEN** a visitor loads a route with JavaScript enabled and default motion settings
- **THEN** sections below the fold SHALL NOT be seen to flash into view and then hide before their reveal animation runs

### Requirement: Reduced motion still yields visible content

A visitor who prefers reduced motion SHALL see all content without any reveal animation.

#### Scenario: Reduced motion is preferred

- **WHEN** the visitor's system requests reduced motion
- **THEN** all sections SHALL be visible immediately with no opacity or transform transition
