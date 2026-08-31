## Context

See `proposal.md` — Why. Requirements are in the five spec deltas under `specs/`; this document covers only how to satisfy them.

Constraints that shape the approach:

- **Next.js 14 App Router, React 18, CSS Modules, no test suite.** Verification is manual plus build output, so changes should be small and independently checkable.
- **`ScrollReveal` currently renders `hidden-initial` during server render.** The hidden state is in the SSR payload, which is the whole of finding F04. Any fix has to move that decision to the client without introducing a visible flash.
- **The three gallery videos are served from R2, but the source files still exist locally.** Poster frames must be extracted from those local files, which means poster generation has to happen *before* the deletion step. This ordering is the single hard sequencing constraint in the change.
- **Downscaling overwrites committed originals and cannot be undone from the repo.** Git LFS holds prior versions, but recovering 26 files from LFS history is not a workflow anyone wants to rely on.
- **`react-simple-maps` pins an old `d3-color`** with its own high advisory. It is not upgradable without touching that dependency, which is out of scope here.

## Goals / Non-Goals

**Goals:**

- Fix each critical and high finding at the level the spec describes, not just at the symptom.
- Keep every step independently revertible, so a regression in one does not force rolling back the others.
- Preserve the existing reveal animation and gallery look exactly. This change should be invisible to a sighted visitor with JavaScript enabled.

**Non-Goals:**

- Rebuilding the reveal animation on a new mechanism. Scroll-driven CSS animation is a real alternative (see Decisions) but changing the animation's feel is not something a security-and-accessibility patch should do.
- Resolving the `d3-color` advisory, which needs the `react-simple-maps` dependency addressed on its own.
- Adding a test suite or linting. Both are worth doing; both are their own change.
- Any medium or low finding, including the ones that are tempting to fold in while touching the same files.

## Decisions

### D1 — Move the hidden state from render to mount, inside `ScrollReveal`

**Decision:** `ScrollReveal` renders with no hidden class. In a layout effect it measures its own position; if it is already in the viewport it goes straight to revealed, otherwise it applies `hidden-initial` and starts observing.

The hidden state is then only ever applied by JavaScript that is already running. Every failure mode in the spec resolves to visible for free: JS disabled, bundle 404, bundle throws before this component mounts, hydration still pending — in all of them the class is never added and the server HTML stays visible.

**Why this over the alternatives:**

- *`<noscript>` style override* — the two-line fix. Rejected because it only covers JavaScript being *disabled*. A bundle that fails to load leaves `scripting: enabled` true and the SSR `opacity: 0` in place, so the exact failure most likely to happen in the wild stays broken.
- *`@media (scripting: enabled)`* — elegant and CSS-only, but has the same blind spot as `<noscript>`, and support only landed recently across browsers.
- *Inline head script setting a gate class, plus a failsafe timer* — covers everything, but needs an inline script, a global timer, and a hydration hook to cancel it. Strictly more machinery than moving one line inside the component that already exists.
- *CSS scroll-driven animation (`animation-timeline: view()`)* — genuinely the cleanest end state: no JavaScript at all, and `ScrollReveal` gets deleted. Rejected for now because Firefox does not ship it unflagged, so a share of visitors would lose the effect entirely, and because it converts a fire-once reveal into a scroll-linked one. Worth revisiting as its own change.

**On the flash-of-visible-content risk:** between first paint and the layout effect, an un-armed section is visible. This is harmless for the three wrapped sections because all of them sit below the fold on load — the visitor cannot see a flash in content they have not scrolled to. The in-viewport check exists for the case that breaks that assumption: a deep link or restored scroll position that lands directly on Certifications or Contact. There, arming and then immediately revealing would produce a real flicker, so the component skips arming and renders revealed.

### D2 — A visually hidden `h1`, and a global `sr-only` utility

**Decision:** Add `<h1 className="sr-only">other things i like to do</h1>` as the first child of `/hobbies`'s `<main>`, and promote the existing `.srOnly` block from `Traveling.module.css` into `globals.css` as a shared `.sr-only`.

The wording matches the nav label, so the page's name is the same in the nav, the heading outline, and the browser tab. The clip-based technique already in the codebase is correct and stays as-is — it keeps the heading in the accessibility tree, which `display: none` and `visibility: hidden` would not.

The resulting outline is `h1` → `h2` (photos) → `h2` (fitness) → `h3` (races) → `h2` (traveling). No skipped levels.

**Why not the alternatives:** a visible page title would change a page deliberately designed to open straight into photographs. Promoting "i like taking photos!" to `h1` would name the whole page after one of its three sections.

`Traveling.jsx` switches to the global class as part of this, so there is one definition rather than two.

### D3 — Per-tile pause control, always visible on video tiles

**Decision:** Video tiles render a small pause/play button, positioned bottom-right, visible at rest rather than on hover. Playback state is owned by the tile: a `userPaused` flag that the IntersectionObserver must respect.

The control has to be perceivable without hover because touch users have no hover and keyboard users should not have to discover it by tabbing blindly. It is styled quietly — the same muted-to-accent treatment the gallery already uses — so it reads as part of the tile rather than browser chrome.

The observer's rule becomes: play on enter only when the tile is not user-paused and reduced motion is not requested; pause on exit always. This makes the pause survive scrolling away and back, which the spec requires, because `userPaused` is component state and the observer only ever consults it.

Reduced motion is read via `matchMedia` with a `change` listener, so a visitor toggling the OS setting is honored without a reload. Under reduced motion the tile shows its poster and the control becomes an opt-in play button — the preference suppresses *automatic* motion, not the visitor's own choice.

`play()` is called with a `.catch()` that sets `userPaused`, so a browser refusing autoplay (iOS Low Power Mode does this even for muted video) lands on the poster with a play button rather than an unhandled rejection and a black rectangle.

**Why not native `controls`:** compliant and nearly free, but browser control chrome over the photographs would break the gallery's look, and the gallery's whole value is that the media is presented uninterrupted.

### D4 — Poster frames extracted locally, before the videos are deleted

**Decision:** Extract a frame from each of the three local `VID_*` files with `ffmpeg`, save to `public/gallery/posters/`, and only then delete the source videos.

Posters are small enough to sit comfortably inside the asset budget. Extracting from the local originals avoids downloading 198 MB back from R2 later, which is exactly what would be required if the deletion happened first. This ordering is a prerequisite, not a preference.

### D5 — Downscale with `sips`, after archiving originals outside the repo

**Decision:** Copy all 26 originals to a location outside the repository, verify the copy, then run `sips` in place to cap the long edge at 2560 px.

`sips` ships with macOS, so there is no install step and no new dependency for a one-time local pass. There is precedent in this user's tooling for using it on image batches. A `sharp` script would be more portable, but portability has no value for a pass that runs once on one machine.

The archive step is a hard prerequisite. LFS technically retains prior versions, but recovering 26 files from LFS history is not a recovery plan anyone should be asked to execute.

### D6 — Delete orphaned assets from the working tree only

**Decision:** `git rm` the three `VID_*` files and the orphaned `IMG_26.jpeg`, and remove the commented-out gallery entry that referenced the latter. LFS history is left intact.

This stops 198 MB shipping on every deploy immediately, with no history rewrite, so existing clones and forks stay valid. The trade-off is explicit and belongs in the record: clone size and LFS storage are unchanged, because the objects remain in history. Reclaiming those needs a history rewrite, which is destructive enough to deserve its own decision on its own day.

### D7 — Upgrade Next within 14.x, and verify rather than assume

**Decision:** `next@14.1.0` → `14.2.35`, staying on the major so no App Router migration is involved. Verification is `npm audit` showing zero critical, a clean build, and a manual pass over both routes.

The gallery deserves specific attention after the upgrade: 14.2 changed image optimization internals, and `/hobbies` is almost entirely `next/image`. This is the one place the upgrade could plausibly change observable behavior.

## Risks / Trade-offs

- **Downscaling is lossy and overwrites committed files** → Archive all originals outside the repo and verify the copy before the pass begins. Spot-check several downscaled images at full-bleed gallery size on a high-density screen before committing.
- **Poster extraction depends on files this same change deletes** → Sequenced explicitly: posters are generated and committed before the deletion step. If the order is inverted, recovering the sources means pulling 198 MB back from R2.
- **Deleting videos from the working tree does not reduce clone size** → Accepted knowingly, and recorded in the spec so it is not later mistaken for an oversight. Deploy weight is what this change is buying.
- **Inverting the reveal default could flash content into view** → The in-viewport check on mount covers the deep-link and restored-scroll cases. Verify by loading `/` at a restored scroll position and via a hash link to a wrapped section.
- **The Next upgrade could change image optimization behavior** → Verify the gallery at three viewport widths after upgrading, checking that images resolve, sizes are selected sensibly, and no layout shift is introduced.
- **`d3-color` remains unresolved** → Out of scope and recorded as an accepted exposure. It is a ReDoS in a transitive dependency of a presentational map, not an exposed attack surface on this site.
- **Staying within 14.x does not clear every high-severity `next`/`postcss` advisory** → Discovered during implementation: the remaining high advisories (Server Actions / RSC SSRF and DoS, `postcss` XSS and arbitrary-file-read) all have their earliest fix at `15.0.8+`, most at `15.5.x`; none is reachable within the 14.x line. Confirmed with the user and accepted as a knowingly retained exposure rather than expanding this change into a 15.x or 16.x migration — none of the affected features (Server Actions, a custom server, WebSocket upgrades) are used by this statically-exported site. Recorded per the `dependency-security` spec's "High advisory has no non-breaking fix" scenario.
- **No automated tests, so every verification here is manual** → Each spec scenario is written to be checkable by hand. The task list carries them as explicit verification steps rather than leaving "test it" implied.

## Migration Plan

Steps are ordered so each is independently revertible, and so the one hard dependency (posters before deletion) is respected.

1. **Upgrade Next.** Isolated and highest urgency. Rollback: revert `package.json` and `package-lock.json`.
2. **Invert the reveal default.** Touches two files. Rollback: revert `ScrollReveal.jsx` and the `globals.css` block.
3. **Add the hidden `h1` and the global `sr-only` utility.** Additive. Rollback: revert three files.
4. **Add pause controls, reduced-motion handling and `play()` rejection handling.** Behavior-only; independent of posters existing yet.
5. **Generate poster frames** from the local videos and wire them to the tiles.
6. **Delete the orphaned videos and `IMG_26.jpeg`.** Only safe after step 5. Rollback: `git revert` restores them from LFS.
7. **Archive originals, then downscale the gallery.** Last, because it is the only irreversible step and the only one whose rollback depends on something outside the repo.

Deployment is a single Vercel deploy at the end. Steps 1 through 6 are all revertible with `git revert`; step 7 is revertible only from the external archive, which is why it runs last.

## Open Questions

- The exact JPEG quality setting for the downscale pass. 2560 px on the long edge is fixed by the spec, but the quality factor that hits the sub-1 MB per-image budget without visible loss is best found empirically on two or three of the largest files. This does not affect the specs, the approach, or the task breakdown.
- Which frame makes the best poster for each of the three videos. A first frame is the default; a hand-picked timestamp may read better for `VID_3` in particular. Cosmetic, and decidable while doing the work.
