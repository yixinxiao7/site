## Purpose

Defines how autoplaying video in the photo gallery must behave so that motion is always under the visitor's control, never runs against a stated motion preference, and never leaves an empty rectangle where a photo should be.

## ADDED Requirements

### Requirement: Autoplaying video is pausable by the visitor

Any video that begins playing without an explicit user action SHALL offer the visitor a way to stop it.

#### Scenario: Visitor pauses a playing video

- **WHEN** a video is autoplaying and the visitor activates its pause control
- **THEN** playback SHALL stop
- **AND** it SHALL NOT resume automatically while the video remains in the viewport

#### Scenario: Visitor resumes a paused video

- **WHEN** the visitor activates the control on a video they previously paused
- **THEN** playback SHALL resume

#### Scenario: Pause control is reachable by keyboard

- **WHEN** a keyboard user tabs to a video tile
- **THEN** the pause control SHALL be focusable, SHALL show a visible focus indicator, and SHALL be operable with Enter or Space

#### Scenario: Pause control is discoverable

- **WHEN** a video tile is displayed
- **THEN** its pause control SHALL be perceivable without relying on hover alone, so that touch and keyboard users can find it

#### Scenario: Pause state survives scrolling away and back

- **WHEN** the visitor pauses a video, scrolls it out of view, and scrolls back to it
- **THEN** the video SHALL remain paused

### Requirement: Motion preference suppresses autoplay

Video SHALL NOT begin playing automatically when the visitor has requested reduced motion.

#### Scenario: Reduced motion is preferred

- **WHEN** the visitor's system requests reduced motion and a video tile enters the viewport
- **THEN** the video SHALL NOT start playing
- **AND** the tile SHALL display a still frame

#### Scenario: Reduced motion visitor chooses to play

- **WHEN** a visitor who prefers reduced motion activates the play control on a tile
- **THEN** the video SHALL play, because the visitor asked for it explicitly

### Requirement: A video tile always presents a meaningful frame

A video tile SHALL never render as blank or empty space, in any playback state.

#### Scenario: Video has not been requested yet

- **WHEN** a video tile is rendered but its media has not begun loading
- **THEN** the tile SHALL display a still frame representing the video at the tile's aspect ratio

#### Scenario: Browser refuses autoplay

- **WHEN** the browser refuses the autoplay request, for example under a device power-saving mode
- **THEN** the refusal SHALL be handled without an unhandled error
- **AND** the tile SHALL continue to display its still frame with the play control available

#### Scenario: Media fails to load

- **WHEN** the video source cannot be retrieved
- **THEN** the tile SHALL retain its still frame and its layout footprint, and SHALL NOT collapse or leave a gap in the gallery

### Requirement: Off-screen video does not play

Video SHALL NOT continue playing while outside the viewport.

#### Scenario: Video scrolls out of view

- **WHEN** a playing video leaves the viewport
- **THEN** playback SHALL pause

### Requirement: Autoplaying video carries no audio

Video that plays without an explicit user action SHALL be silent.

#### Scenario: Video autoplays

- **WHEN** a video begins playing without the visitor having asked for it
- **THEN** it SHALL be muted
