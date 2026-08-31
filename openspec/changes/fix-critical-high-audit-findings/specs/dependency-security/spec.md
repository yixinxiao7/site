## Purpose

Keeps the publicly deployed site free of dependencies carrying known critical or high severity advisories, and makes that condition checkable rather than assumed.

## ADDED Requirements

### Requirement: No known critical advisories in shipped dependencies

The deployed application SHALL NOT ship with any dependency carrying a known critical severity advisory at the time of deploy.

#### Scenario: Framework has a critical advisory

- **WHEN** the installed framework version is subject to a published critical severity advisory
- **THEN** the version SHALL be upgraded to a patched release before the site is deployed
- **AND** the upgrade SHALL stay within the current major version unless a major upgrade is planned as its own change

#### Scenario: Audit reports a clean critical tier

- **WHEN** a dependency audit is run against the installed tree
- **THEN** it SHALL report zero critical severity advisories

### Requirement: Known high advisories are resolved or recorded

The project SHALL either resolve each known high severity advisory or record it as a knowingly accepted exposure with the reason it was not resolved.

#### Scenario: High advisory is resolvable by upgrade

- **WHEN** a high severity advisory has a patched version reachable without a breaking major upgrade
- **THEN** the dependency SHALL be upgraded

#### Scenario: High advisory has no non-breaking fix

- **WHEN** a high severity advisory can only be cleared by a breaking upgrade or by removing a dependency
- **THEN** the exposure SHALL be recorded with its advisory identifier, the reason it remains, and the change that will address it
- **AND** it SHALL NOT block the current change

### Requirement: Image optimization surface is not left exposed

Because the site serves a large image gallery through a framework image optimizer, the deployed framework version SHALL NOT be subject to known advisories affecting that optimizer.

#### Scenario: Advisory affects the image optimization route

- **WHEN** an advisory describes denial of service, cache key confusion, or content injection in the framework's image optimization endpoint
- **THEN** the framework SHALL be upgraded to a version where that advisory is patched before the gallery route is served publicly

### Requirement: Both routes behave identically after a dependency upgrade

A dependency upgrade SHALL NOT change the observable behavior of any route.

#### Scenario: Post-upgrade verification

- **WHEN** a framework or build dependency is upgraded
- **THEN** the production build SHALL succeed with no new warnings
- **AND** both routes SHALL render the same content, layout, and interactive behavior as before the upgrade
