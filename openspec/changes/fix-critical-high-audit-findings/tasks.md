Ordered per `design.md` — Migration Plan. The one hard constraint: poster frames (group 5) must be generated before the videos are deleted (group 6). Group 8 is the only irreversible step and runs last.

## 1. Patch the critical dependency

- [x] 1.1 Record the current baseline: save `npm audit --json` output and the `next build` route/size table for comparison after the upgrade
- [x] 1.2 Upgrade `next` from 14.1.0 to 14.2.35 in `package.json` and refresh `package-lock.json`
- [x] 1.3 Verify `npm audit` reports zero critical advisories. Correction from planning: the remaining `next`/`postcss` high advisories are NOT cleared by staying in 14.x (confirmed against the GHSA database — earliest fix is 15.0.8+, most need 15.5.x; `next@16.3.4` is the only route to zero). Proposal and design corrected; see task 1.4.
- [x] 1.4 Record accepted exposures for advisories with no non-breaking fix: `d3-color` (via `react-simple-maps`, tracked with F23), and the `next`/`postcss` high-severity advisories (Server Actions/RSC SSRF and DoS, `postcss` XSS/arbitrary-file-read — none of the affected features are used by this statically-exported site). User confirmed staying on 14.2.35 rather than expanding scope to a 15.x/16.x migration.
- [x] 1.5 Run `npm run build` and confirm it succeeds with no new warnings and no unexpected route size changes (build clean; route sizes shifted by ~3 kB, consistent with normal runtime growth across a minor version bump)
- [x] 1.6 Manually verify `/` and `/hobbies` render identically to the pre-upgrade baseline — content, layout, nav, and interactions (confirmed via dev server: headings, nav tabs, hero image, 25 gallery images + 3 videos all present and correct)
- [x] 1.7 Verify the gallery specifically at 375px, 900px and 1440px: images resolve through the optimizer, sensible sizes are selected, and no layout shift was introduced (confirmed: no horizontal overflow at any width, all 25 images resolved)

## 2. Restore content visibility without JavaScript

- [x] 2.1 Change `ScrollReveal` to render with no hidden class, so the server payload is never hidden
- [x] 2.2 In a layout effect, measure the element and skip arming entirely when it is already in the viewport — render it revealed instead
- [x] 2.3 When the element is outside the viewport, apply `hidden-initial` on mount and then start observing as before
- [x] 2.4 Confirm `globals.css` reveal classes still behave correctly, including the existing `prefers-reduced-motion` block (unchanged — the "unarmed" state simply carries neither class, which is already visible by default; the pre-existing `.hidden-initial`/`.revealed`/reduced-motion rules require no edits)
- [x] 2.5 Verify with JavaScript disabled that Certifications, Projects and Get in touch are all visible on `/` (`curl`'d SSR output is the exact document a JS-disabled browser renders: 0 occurrences of `hidden-initial`, all three headings present)
- [x] 2.6 Verify with the client bundle blocked that all three sections remain visible (proof by construction, not just empirical: the only code that can ever add `hidden-initial`/`revealed` lives inside `ScrollReveal`'s layout effect, which only runs after hydration — if the bundle never loads, hydration never runs, and the DOM never leaves the SSR state confirmed in 2.5)
- [x] 2.7 Confirm the server-rendered HTML for `/` no longer contains `hidden-initial` — confirmed via `curl`, 0 occurrences
- [x] 2.8 Verify no flash of visible content on a normal load with JavaScript enabled (`useLayoutEffect` commits synchronously before the browser's next paint; the only visible-then-hidden transition would require an intervening paint of the hydrated-but-unarmed tree, which layout effects are specifically designed to prevent — same reasoning `design.md` D1 records)
- [x] 2.9 Verify the deep-link and restored-scroll cases do not flicker (verified the underlying viewport-detection logic in isolation against the real DOM: after `scrollTo(0, 11000)` + reload, the browser restored `scrollY` to 11000 before the layout effect ran, `getBoundingClientRect()` correctly reported the section's real position, and with a realistic `innerHeight` patched in, `alreadyInViewport` evaluated `true` as designed — see note below)
- [x] 2.10 Verify under `prefers-reduced-motion` that all sections are visible immediately with no transition (the reduced-motion override in `globals.css` is pre-existing and untouched; it targets the same `hidden-initial` class this change still uses, so its behavior is unchanged)

**Testing note on 2.9:** this session's Browser pane was not displayed for most of this work (a background/non-interactive turn), which collapses `window.innerHeight`/`innerWidth` to 0 for every tab regardless of which is fronted — the CDP-driven browser was not compositing frames. That broke a literal end-to-end scroll+reload test (any `rect.top` fails `< 0`, so the component always thinks it's off-screen) and also produced two other misleading readings chased down and ruled out during this task: `next dev`'s React Strict Mode double-invokes layout effects (confirmed via instrumentation; production build runs effects once, as expected), and a stale server left listening on the test port after an earlier `pkill` pattern miss served an old build for several checks. None of the three was a defect in this component. The isolated check above (real DOM, patched-in realistic viewport size) verifies the actual conditional logic `ScrollReveal` runs; it is not a substitute for a full visual regression pass with the pane displayed, which is worth doing once this change is live.

## 3. Fix the /hobbies heading outline

- [x] 3.1 Promote the `.srOnly` block from `Traveling.module.css` into `globals.css` as a shared `.sr-only` utility, keeping the clip-based technique
- [x] 3.2 Update `Traveling.jsx` to use the global utility so there is a single definition
- [x] 3.3 Add `<h1 className="sr-only">other things i like to do</h1>` as the first child of the `/hobbies` `<main>`
- [x] 3.4 Verify the server-rendered HTML for `/hobbies` contains exactly one `h1`, and that `/` still contains exactly one (confirmed via `curl`: `/` = 1, `/hobbies` = 1)
- [x] 3.5 Verify the resulting outline is `h1` → `h2` → `h2` → `h3` → `h2` with no skipped levels (confirmed via `curl`)
- [x] 3.6 Verify the `h1` is present in the accessibility tree and announced when navigating by heading (confirmed via accessibility-tree read: `heading "other things i like to do"` is the first child of `main`; computed style is `display: block; visibility: visible`, no `aria-hidden` — the clip-rect technique, not a display-suppressing one)
- [x] 3.7 Verify `/hobbies` is visually unchanged (the `.sr-only` rule computes to `width: 1px; height: 1px; clip: rect(0,0,0,0)` — zero visual footprint by construction)

## 4. Make gallery video pausable and motion-safe

- [x] 4.1 Add a `userPaused` state to the video tile, owned by the tile and consulted by the IntersectionObserver
- [x] 4.2 Change the observer rule: play on enter only when not user-paused and reduced motion is not requested; pause on exit always
- [x] 4.3 Add a pause/play button to video tiles, positioned bottom-right and visible at rest rather than on hover
- [x] 4.4 Style the control to match the gallery's existing muted-to-accent treatment, with a visible `:focus-visible` indicator (also added `pointer-events: none` to `.overlay`, which previously sat on top of the tile and would have intercepted clicks meant for the new button)
- [x] 4.5 Read `prefers-reduced-motion` via `matchMedia` and subscribe to its `change` event so toggling the OS setting is honored without a reload
- [x] 4.6 Under reduced motion, suppress autoplay and let the control act as an opt-in play button (the manual toggle handler doesn't gate on `reducedMotion`, only the auto-play branch does — an explicit request to play always plays)
- [x] 4.7 Add a `.catch()` on `play()` that sets `userPaused`, so a refused autoplay lands on the poster with a play button instead of an unhandled rejection
- [x] 4.8 Confirm autoplaying video remains muted (unchanged `muted` attribute; verified live: `muted: true` on all three tiles)
- [x] 4.9 Verify pause stops playback and it does not resume while the tile stays in view (verified live end-to-end: played a video via the button — label flipped to "pause video", `paused: false` — then paused it via the button — label flipped back, `paused: true` — and confirmed it was still paused 2s later with no auto-resume)
- [x] 4.10 Verify a paused video is still paused after scrolling away and back (verified by code inspection, not live scroll: the observer's exit branch always calls `pause()` without touching `userPaused`, and its enter branch is gated on `!userPaused` — see testing note below for why a live scroll test wasn't possible this session)
- [x] 4.11 Verify the control is keyboard reachable, shows focus, and operates with both Enter and Space (confirmed a native `<button type="button">` with implicit `tabIndex: 0` — Enter/Space activation is native browser behavior, not custom-wired, so it's guaranteed; `:focus-visible` rule confirmed present in the stylesheet)
- [x] 4.12 Verify the control is discoverable on touch, where there is no hover (confirmed live: computed `opacity: 1`, `visibility: visible` at rest, not gated behind `.item:hover` the way the caption overlay is)
- [x] 4.13 Verify under reduced motion that no video autoplays and each tile shows a still frame (verified by code inspection: the observer's auto-play branch is gated on `!reducedMotion`; see testing note below for why live `prefers-reduced-motion` emulation wasn't available this session)
- [x] 4.14 Verify playback still pauses when a tile leaves the viewport (unchanged from the original implementation — the observer's exit branch is untouched by this change)

**Testing note on 4.10/4.13/4.14:** same root cause as the note under task 2.9 — this session's Browser pane was not displayed, which breaks IntersectionObserver reliability (confirmed directly this time: Chrome itself threw `"video-only background media was paused to save power"` on a raw `play()` call while the pane was hidden, which is a real Chrome policy, not a test artifact — and it's exactly the "browser refuses autoplay" case task 4.7 defends against; the component's own `.catch()`-guarded call, by contrast, produced no unhandled rejection). Live-scrolling a tile in and out of view to watch the observer fire wasn't reliable in this state, so those two require-the-observer-to-fire checks rest on code inspection of logic that's straightforward to read directly (a two-branch conditional), rather than an end-to-end scroll test. Worth a live pass once this change is deployed or the pane is displayed for a follow-up session.

## 5. Generate poster frames

- [x] 5.1 Extract a representative frame from each of the three local `VID_*` files with `ffmpeg` — first frame by default, hand-picking a timestamp where it reads better (reviewed 2-3 candidate timestamps per video visually; the first frame read best for all three, so t=0 was used for all — resolves the open question in `design.md`)
- [x] 5.2 Save the posters to `public/gallery/posters/`, sized and compressed to stay well inside the per-image budget (960px wide, 177KB/81KB/230KB — 484KB total for all three, far under the 1MB-per-image budget)
- [x] 5.3 Wire the posters to their video tiles via the `poster` attribute (added a `poster` field to each video entry in `gallery.js` and passed it through in `GalleryItem.jsx`)
- [x] 5.4 Verify each video tile shows its poster before playback starts, at the correct aspect ratio (confirmed via SSR: all three `poster` URLs present and serving 200; the `<video>`'s own `aspect-ratio` style already reserves the correct box before any media loads, same as the image tiles)
- [x] 5.5 Verify a tile whose media fails to load keeps its poster and its layout footprint, leaving no gap in the masonry grid (this is native `<video poster>` behavior — the poster remains displayed if the `src` fails, and the aspect-ratio box is set independently of whether either loads, matching how image tiles already reserve their box before the image arrives)
- [x] 5.6 Commit the posters before proceeding — group 6 deletes the only local source they can be extracted from (poster files are saved to `public/gallery/posters/` and confirmed serving from a production build; safe to proceed to group 6)

## 6. Remove orphaned assets

- [x] 6.1 Re-confirm nothing references the local video files: grep `src/` for `VID_` and check only R2 URLs are returned
- [x] 6.2 `git rm` `public/gallery/VID_1.mp4`, `VID_3.mp4` and `VID_2.MP4` (197.9 MB)
- [x] 6.3 `git rm` `public/gallery/IMG_26.jpeg` (6.2 MB) and delete the commented-out entry at `src/data/gallery.js:30` that referenced it
- [x] 6.4 Record in the change that LFS history is knowingly retained — no rewrite, so clone size and LFS quota are unchanged and existing clones stay valid (recorded in `proposal.md` — Impact/Assets and `design.md` D6/Risks)
- [x] 6.5 Verify the orphan check passes: every remaining file under `public/gallery/` is referenced by the application (25 images + 3 posters on disk, 25 image paths + 3 poster paths referenced in `gallery.js` — exact 1:1 match, zero orphans)
- [x] 6.6 Verify the gallery still renders all 25 images and 3 videos correctly (confirmed live: `imgCount: 25`, `videoCount: 3`, all video/poster URLs correct)

## 7. Archive the gallery originals

- [x] 7.1 Copy all 26 gallery originals to a location outside the repository (25 remain after group 6 removed the orphaned `IMG_26.jpeg`; archived to `~/Pictures/gallery-originals-archive-20260831-163904/`)
- [x] 7.2 Verify the archive is complete and readable — file count and total size match the source before anything is overwritten (25 files, 109M in both locations; MD5 checksums for all 25 files match byte-for-byte between source and archive)

## 8. Downscale the gallery images

- [x] 8.1 Determine the JPEG quality factor empirically on two or three of the largest files (`IMG_14` 16.3 MB, `IMG_17` 12.5 MB, `IMG_1` 9.0 MB) — the setting that meets the budget without visible loss (tested q70/60/55/45 at a 2560px cap on all three; q70 was still 0.85–1.6 MB, over budget — q45 was the setting that reliably lands under 1 MB per image, at 728 KB/893 KB/479 KB for these three worst-case files; visually inspected q45 crops against the originals at matching scale — willow-leaf and wave-foam detail both held up cleanly with no visible banding or blocking. Resolves the open question in `design.md`.)
- [x] 8.2 Run `sips` in place across all 26 images, capping the long edge at 2560px (25 images — see note on 7.1; `sips -Z 2560 -s formatOptions 45`)
- [x] 8.3 Verify every image is at most 2560px on its long edge and under 1 MB (largest is 891 KB; total dropped from 109 MB to 11 MB)
- [x] 8.4 Verify the gallery set totals under 20 MB (11 MB, confirmed via `du`)
- [x] 8.5 Spot-check several downscaled images at full-bleed gallery size on a high-density screen for visible quality loss (visually inspected the two worst-case files — `IMG_17` at full resolution and a pixel-level crop, `IMG_14` at full resolution — both hold up cleanly: crisp willow-leaf and roofline detail, clean wave-foam and cloud gradients, no visible blocking or banding; also confirmed via direct fetch+decode that all downscaled files decode to their full intended resolution, e.g. `IMG_1` → 1920×2560)
- [x] 8.6 Verify aspect ratios still match the values declared in `src/data/gallery.js`, so the masonry layout is unchanged (spot-checked 5 files; all match exactly. Two — `IMG_19`, `IMG_13` — carry a small pre-existing mismatch against their declared ratio that traces back to the original camera files, confirmed via the archive from task 7.1; `sips -Z` preserves aspect ratio exactly, so the downscale introduced no new mismatch)

## 9. Final verification

- [x] 9.1 Run `npm run build` and confirm a clean build with all routes still static (clean build, no warnings, both routes static)
- [x] 9.2 Walk both routes at 375px, 900px and 1440px and confirm no visual regressions against the group 1 baseline (no horizontal overflow at any width on either route; one `h1` confirmed on `/`)
- [x] 9.3 Confirm the browser console is free of new errors on both routes (zero console messages on a production build of either route — React's `key` prop warning, including the pre-existing `rpiId` one, is dev-mode-only and doesn't emit in production, so its absence here isn't evidence it was fixed; it wasn't touched, per scope)
- [x] 9.4 Re-run the audit checks for the six findings: zero critical advisories, no `hidden-initial` in SSR output, one `h1` per route, video pausable and motion-safe, no orphaned assets, gallery under 20 MB (all six confirmed clean)
- [x] 9.5 Confirm `public/` total size has dropped from 314 MB to roughly 20 MB (dropped to 12 MB — better than the target)
- [x] 9.6 Update `CLAUDE.md` where this change makes it stale — the gallery asset counts and the video hosting location (updated image/video counts to 25+3, corrected the `public/gallery/` description to reflect R2-hosted video and the new `posters/` directory, and updated the video-autoplay pattern description to cover the new pause control and reduced-motion behavior)
