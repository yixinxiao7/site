## Purpose

Keeps the weight of what the site actually deploys proportionate to what it serves, so that unreferenced files and unprocessed camera originals cannot silently accumulate in the published bundle.

## ADDED Requirements

### Requirement: Every deployed asset is referenced

An asset SHALL NOT be included in the deployed bundle unless the application references it.

#### Scenario: An asset's reference is moved to remote hosting

- **WHEN** a media item's source is changed to a remotely hosted URL
- **THEN** the corresponding local file SHALL be removed from the deployed bundle in the same change

#### Scenario: An asset's reference is commented out or deleted

- **WHEN** a gallery entry is removed or commented out
- **THEN** the asset it pointed to SHALL be removed from the deployed bundle

#### Scenario: Orphan check

- **WHEN** the set of files under the public asset directory is compared against the set referenced by the application
- **THEN** the difference SHALL be empty

### Requirement: Raster image sources are bounded in size

Raster image assets committed for delivery through an image optimizer SHALL be stored at a size appropriate for web delivery rather than at camera-original resolution.

#### Scenario: An individual image exceeds the budget

- **WHEN** a raster image asset is added or updated
- **THEN** its long edge SHALL NOT exceed 2560 pixels
- **AND** its file size SHALL NOT exceed 1 MB

#### Scenario: The gallery as a whole

- **WHEN** the total size of the gallery image set is measured
- **THEN** it SHALL remain under 20 MB

#### Scenario: Visual quality is preserved

- **WHEN** an image has been downscaled to meet the budget
- **THEN** it SHALL show no visible quality loss at the sizes the gallery actually displays, on standard and high-density screens

### Requirement: Originals are preserved outside the deployed bundle

Because size reduction is lossy and overwrites committed files, camera originals SHALL be archived outside the repository before any downscaling pass runs.

#### Scenario: Downscaling pass is performed

- **WHEN** a batch downscaling pass is about to overwrite committed image assets
- **THEN** the originals SHALL first be copied to a location outside the repository
- **AND** the pass SHALL NOT begin until that copy is verified complete

### Requirement: Asset history is not rewritten

Removing an asset from the deployed bundle SHALL NOT require rewriting version control history.

#### Scenario: A large tracked asset is removed

- **WHEN** a large asset is removed because nothing references it
- **THEN** it SHALL be deleted from the working tree only
- **AND** existing clones and forks SHALL remain valid without re-cloning
- **AND** the change SHALL record that historical objects are knowingly retained, so clone size is unchanged
