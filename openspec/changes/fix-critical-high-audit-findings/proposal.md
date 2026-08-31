## Why

An interface quality audit of the 2026 revamp found 27 issues, of which one is critical and five are high severity. The critical finding is a live security exposure: `next@14.1.0` carries an unpatched critical advisory set, including an image-optimization DoS and image-route cache-key confusion — both of which land directly on `/hobbies`, a page that is almost entirely `next/image`. The five high findings are a mix of user-facing content loss (three sections are served invisible and need JavaScript to appear), two WCAG failures (no `<h1>` on `/hobbies`; unpausable autoplaying video, a Level A failure), and 204 MB of dead or oversized assets shipping on every deploy.

These six are grouped because they share a deadline rather than a subsystem: this is a public site whose entire purpose is to be read by recruiters, and each of these either exposes the deployment, hides content from a real visitor, or slows the first page they land on.

## What Changes

- **Patch the critical dependency.** Upgrade `next` from 14.1.0 to 14.2.35, staying on the 14.x line so no App Router changes are needed. This also clears the transitive `postcss` advisories.
- **Make all content visible without client JavaScript.** `ScrollReveal` currently ships `opacity: 0` from the server, so Certifications, Projects and Get in touch depend on hydration to become visible. Invert the default: render revealed, and let the client apply the hidden state on mount before observing.
- **Give `/hobbies` a valid heading outline.** Add a visually hidden `<h1>` so the page has a single top-level heading. The visual design is unchanged.
- **Make gallery video pausable and motion-safe.** Add a per-tile pause control, skip autoplay under `prefers-reduced-motion`, add poster frames so tiles are never blank, and handle the `play()` promise rejection so a blocked autoplay degrades to the poster instead of a black box.
- **Reclaim 204 MB of shipped assets.** Delete the three orphaned `VID_*` files from the working tree (nothing references them; `gallery.js` serves video from R2), and downscale the 26 gallery JPEGs from camera originals to a web-appropriate size in place.
- **Establish the first specs for this project.** `openspec/specs/` is currently empty; this change introduces five capabilities that encode the standards these fixes restore, so future work is measured against them rather than re-derived.

Non-goals, deliberately deferred to a later change: the 11 medium and 10 low findings, including the missing Open Graph metadata (F15), the `rpiId` → `rsmKey` React key bug (F07), and the absent ESLint configuration (F09). F09 in particular is worth doing soon — it is the root cause that let F07 and F11 through — but it is a tooling change with its own review surface and does not belong in a security-and-accessibility patch.

## Capabilities

### New Capabilities

- `no-script-content-visibility`: All page content that exists in the server-rendered HTML must be visible to a user whose JavaScript never runs or fails to load. Scroll-reveal and other progressive enhancements must degrade to visible, not to hidden.
- `page-heading-structure`: Every route exposes exactly one `<h1>` and a heading outline with no skipped levels, whether or not the heading is visually rendered.
- `gallery-media-playback`: Autoplaying gallery video must be pausable by the user, must not autoplay under `prefers-reduced-motion`, and must present a meaningful frame rather than blank space when playback has not started or has been refused.
- `deployed-asset-budget`: Assets shipped to production must be referenced by the application and bounded in size, so that deploy weight and image-optimizer cost stay proportionate to what is actually served.
- `dependency-security`: The deployed site must not ship dependencies carrying known critical advisories, and that condition must be checkable rather than assumed. Added so the critical finding has a durable standard to regress against rather than being a one-off version bump recorded only in tasks.

### Modified Capabilities

None. `openspec/specs/` is empty — this is the project's first set of specs.

## Impact

**Dependencies**
- `next` 14.1.0 → 14.2.35 (`package.json`, `package-lock.json`). Resolves the one critical advisory (`GHSA-f82v-jwr5-mffw`, Authorization Bypass in Next.js Middleware — fixed at 14.2.25). Within the 14.x major, so App Router APIs are unaffected.
- **Correction from the original proposal:** this upgrade does **not** clear the remaining high-severity advisories on `next` or its transitive `postcss`. Checked individually against the GHSA database: every one of them — a set of Server Actions / React Server Components SSRF and DoS advisories, plus the `postcss` XSS and arbitrary-file-read advisories that ship inside `next` — has its earliest fix at `next@15.0.8` or later, most at `15.5.x`. `npm audit`'s own `fixAvailable` confirms the only route to a fully clean tree is `next@16.3.4`, a semver-major jump. Staying on 14.x, by design, does not reach any of them.
- These are accepted as knowingly retained exposures, on the same basis as `d3-color` below: none of the affected features — Server Actions, a custom server, WebSocket upgrades — are used by this statically-exported site, so none describes an exposed attack surface here. See `dependency-security` spec's "High advisory has no non-breaking fix" scenario, which anticipates exactly this outcome.
- The `d3-color` ReDoS advisory arrives via `react-simple-maps` and is likewise **not** resolved by this change; it is tracked with the medium finding about that dependency (F23).

**Code**
- `src/components/ScrollReveal.jsx` — reveal default inverts; server output no longer hidden.
- `src/app/globals.css` — `.hidden-initial` / `.revealed` semantics change accordingly.
- `src/app/hobbies/page.jsx` — gains a visually hidden `<h1>`; a shared `sr-only` utility is needed (one already exists locally as `.srOnly` in `Traveling.module.css` and should be promoted to global).
- `src/components/hobbies/GalleryItem.jsx` — pause control, reduced-motion guard, poster attribute, `play()` rejection handling.
- `src/components/hobbies/Hobbies.module.css` — styles for the pause control.
- `src/data/gallery.js` — unchanged in shape; the commented-out `IMG_26` entry and its 6.2 MB orphaned asset are removed as part of the asset pass.

**Assets**
- `public/gallery/VID_1.mp4`, `VID_3.mp4`, `VID_2.MP4` deleted from the working tree (197.9 MB). Objects remain in Git LFS history by design — no history rewrite, so existing clones and forks are unaffected. Clone size and LFS quota are therefore unchanged; only deploy weight improves.
- 26 gallery JPEGs downscaled in place (115.6 MB → target under 20 MB). Nine currently exceed 4 MB, the largest at 16.3 MB.
- New poster frames for the three R2-hosted videos.

**Risk**
- Downscaling is lossy and overwrites the committed originals. Originals must be archived outside the repo before the pass runs; this is a prerequisite task, not a cleanup step.
- Inverting the ScrollReveal default changes first-paint appearance: content is briefly visible before the hidden class applies. This must be verified for flash-of-visible-content, which is the one behavioral regression this change can plausibly introduce.
