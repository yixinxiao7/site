---
name: update-site
description: Update content on Yixin's portfolio site — work experience, projects, certifications, education, contact info, races, visited states, and gallery photos/videos. Use whenever the user asks to add, edit, or remove any of that content, e.g. "add my new job at X", "I ran the Boston marathon", "add these photos", "I visited Colorado", "add a new project".
user-invokable: true
args:
  - name: request
    description: Plain-English description of the content changes to make. Can contain multiple changes in one request.
    required: true
---

# Update Site

Apply content changes to this Next.js portfolio site. Almost every updatable
thing lives in `src/data/` — prefer editing data files over components.

## Workflow

1. **Parse the request** into discrete changes. A single invocation often
   contains several (e.g. "end my Capital One role AND add a Spotify role").
   List them back to the user before editing so they can catch a
   misinterpretation early.
2. **Locate** each change in the content map below.
3. **Edit** the relevant data file, following the conventions for that section.
4. **Verify** with `npm run build`. Fix anything that breaks.
5. **Report** a summary of what changed, file by file. **Do not commit or push** —
   the user reviews and commits themselves.

If a request is ambiguous in a way that changes the output (which role to edit
when there are several at the same company, whether a project is featured, what
caption a photo gets), ask rather than guess. If it's ambiguous in a way that
doesn't (exact wording of a bullet), make the call and note it.

## Content map

| What | File | Export |
|---|---|---|
| Work experience | `src/data/experience.js` | `experiences[]` |
| Education | `src/data/experience.js` | `education` |
| Projects | `src/data/experience.js` | `projects[]` |
| Contact / resume link | `src/data/experience.js` | `contact` |
| Skills (**unused**) | `src/data/experience.js` | `skills` |
| Certifications | `src/data/certifications.js` | `certifications[]` |
| Photos & videos | `src/data/gallery.js` | `galleryItems[]` |
| Races | `src/data/fitness.js` | `races[]` |
| Visited states | `src/data/travel.js` | `visitedStates[]` |
| Hero headline & tagline | `src/components/professional/Hero.jsx` | hardcoded JSX |
| Page title / meta | `src/app/layout.js` | `metadata` |

Note: `skills` in `experience.js` is exported but never imported by any
component. Editing it changes nothing on the rendered site. If the user asks to
update skills, tell them this and ask whether they want a Skills section built
(out of scope for this skill) or the data updated anyway for later use.

---

## Work experience

`src/data/experience.js` → `experiences[]`. **Newest first** — the array order is
the render order, top to bottom.

```js
{
  company: "Capital One",
  title: "Senior Software Engineer",
  location: "New York, NY",
  period: "Jan 2024 — Present",
  description: [
    "Bullet one...",
    "Bullet two...",
  ],
}
```

Conventions:
- `period` uses an **em dash with spaces**: `"Aug 2022 — Jan 2024"`. The current
  role ends in `"— Present"`. Month is a 3-letter abbreviation, capitalized.
- `company`, `title`, `location` are **Title Case** (the professional page is the
  one place the site is not lowercase).
- `description` bullets: past-tense verb first ("Architected", "Built", "Led"),
  no trailing period, quantified impact where the user gives numbers. Never
  invent metrics.
- `description` may be an **empty array** `[]` for a brand-new role with nothing
  to show yet. The component renders an empty `<ul>` — that is fine and expected.

### Ending a current role

Replace `"— Present"` with the end month/year. Do not touch anything else in
that entry.

### Adding a new current role

1. Insert the new object at the **top** of `experiences[]`.
2. **Update the hero headline.** `src/components/professional/Hero.jsx` has a
   hardcoded line:
   ```jsx
   <p className={styles.heroTitle}>Senior Software Engineer at Capital One</p>
   ```
   Rewrite it to `<new title> at <new company>` so the hero matches the top
   experience entry. Do this automatically and mention it in the summary.
3. **Flag the tagline, don't rewrite it.** The `heroTagline` paragraph below it
   ("5 years of experience building backend, platform, and cloud infrastructure
   systems on AWS...") contains a years-of-experience count and a skills list
   that go stale. Ask the user whether to update it, and what to. Never silently
   rewrite it.
4. **Remind about the resume.** `public/resume_2026.pdf` (linked from
   `contact.resume`) and the `metadata` in `src/app/layout.js` may also need
   refreshing. Mention it; do not edit the PDF.

---

## Projects

`src/data/experience.js` → `projects[]`. Order is render order. **`name` is
lowercase-friendly but existing entries are mixed** — match what the user gives.

```js
{
  name: "Triplanner",
  subtitle: "Full-Stack Travel Planning App",   // required, Title Case
  description: "One paragraph...",              // required
  link: "https://github.com/yixinxiao7/repo",   // GitHub — renders a GitHub icon
  webapp: "https://app.yixinx.com/",            // optional — renders a link icon
  note: "built using the multi-agent framework above",  // optional, renders "↑ <note>"
  warning: "...",                               // optional, renders "⚠ <warning>"
  featured: true,                               // optional — gold border + "featured" badge
}
```

- Only **one** project should carry `featured: true`. If the user marks a new
  one featured, remove the flag from the old one and say so.
- `subtitle` is a short Title Case descriptor of what kind of thing it is.
- `description` is one dense paragraph naming the actual stack. Keep the house
  voice: concrete, no marketing adjectives.
- `note` is for cross-references between projects; `warning` is for caveats a
  visitor needs before clicking (e.g. allowlist-gated apps).

---

## Certifications

`src/data/certifications.js`. Two fields only:

```js
{ name: "AWS Certified Solutions Architect — Associate", issuer: "Amazon Web Services" }
```

Use an em dash in `name` where the cert's official name has one.

---

## Education

`src/data/experience.js` → `education`. A single object, not an array:

```js
{
  school: "University of Michigan — Ann Arbor",
  degree: "BSE in Computer Science",
  minor: "Minor in Business Administration",
  extras: "GPA: 3.80 · Summa Cum Laude",   // optional — omit or drop to hide the line
  period: "2017 — 2021",
}
```

If the user adds a second degree, the component only renders one object — say so
and ask whether to convert it to an array (requires a small `Experience.jsx`
change).

---

## Races

`src/data/fitness.js` → `races[]`. Rendered on `/hobbies` in array order, so
**append chronologically** (oldest first — this list reads as a progression).

```js
{ name: "philadelphia marathon", year: 2024 }
```

- `name` is **lowercase** — the hobbies page is lowercase throughout.
- Use hyphenated `half-marathon`, not `half marathon`.
- `year` is a number, not a string.

---

## Visited states

`src/data/travel.js` → `visitedStates[]`. Order does not matter (it's a lookup).

- Use the **full state name, Title Case**, exactly as it appears in the
  `us-atlas@3` TopoJSON: `"New York"`, `"West Virginia"`, `"District of Columbia"`.
  A typo or abbreviation silently fails to highlight — no error, the state just
  stays dim.
- Check for duplicates before appending.
- The count is read from `visitedStates.length` for the map's aria-label, so
  nothing else needs updating.
- If the user mentions a goal milestone ("that's 30 states now"), verify against
  `visitedStates.length` rather than trusting the number.

---

## Gallery photos

`src/data/gallery.js` → `galleryItems[]`. Images live in `public/gallery/`.

```js
{ id: 28, type: "image", src: "/gallery/IMG_25.jpeg", aspectRatio: "4/3", caption: "laguna beach, ca" }
```

### Adding a photo

1. **Copy the file** into `public/gallery/`. Name it `IMG_<n>.JPEG` where `<n>`
   is one past the highest existing number:
   ```bash
   ls public/gallery/ | grep -oE 'IMG_[0-9]+' | grep -oE '[0-9]+' | sort -n | tail -1
   ```
   Existing files have mixed extension casing (`.JPEG` and `.jpeg`) — that's
   historical. Whatever casing the file ends up with on disk, the `src` string
   must match it **exactly**, since Vercel's filesystem is case-sensitive.
2. **Read the real dimensions** and reduce to a simple ratio — never guess:
   ```bash
   sips -g pixelWidth -g pixelHeight public/gallery/IMG_29.JPEG
   ```
   Divide by the GCD and round to a clean ratio. Common values already in use:
   `4/3`, `3/4`, `3/2`, `2/1`, `1/1`, `16/9`, `16/10`, `3/5`, `1/2`, `9/20`.
   Snap to the nearest of these if the exact ratio is within a few percent;
   otherwise use the reduced exact ratio. The ratio drives the masonry column
   heights, so a wrong one distorts the image.
3. **Pick the next `id`**: `max(existing ids) + 1`. Ids are not contiguous and
   are unrelated to filename numbers — that's fine, they're only React keys.
4. **Write the caption**: lowercase, no trailing period. Two styles in use —
   a place (`"coney island, ny"`, `"yu garden, shanghai"`) or a quoted mood word
   for abstract shots (`"'in transit'"`, `"'longing'"`). Use US state
   abbreviations lowercase for domestic places. If the user doesn't give one,
   ask — don't invent a location.
5. **Append** to `galleryItems`. Array order feeds a shortest-column masonry
   algorithm, so position is not visual position; appending is fine.

### Adding a video

Videos are **not** served from `public/gallery/` — they're on Cloudflare R2:

```js
{ id: 11, type: "video", src: "https://pub-7318992f21894cb88abe6204c9561cc5.r2.dev/VID_2.MP4", aspectRatio: "3/4", caption: "..." }
```

This skill **cannot upload to R2**. When the user wants to add a video, ask them
to upload it to the R2 bucket and give you the public URL, then add the entry
with `type: "video"` and that URL as `src`. Everything else (id, aspectRatio,
caption) follows the photo rules. Local `VID_*.mp4` files still in
`public/gallery/` are leftovers from before the R2 move — do not point new
entries at them.

### Removing a photo

Delete the entry from `galleryItems`. Leave the file in `public/gallery/` unless
the user explicitly asks to delete it. There's a precedent for commenting an
entry out rather than deleting (see the `IMG_26` line) — if the user says
"hide it for now", comment it out; if they say "remove it", delete the line.

---

## Contact & resume

`src/data/experience.js` → `contact`. `resume` is a path into `public/`
(`"/resume_2026.pdf"`). If the user drops in a new resume PDF under a new name,
update this string to match the new filename exactly.

---

## Verify

Always finish with:

```bash
npm run build
```

A build failure after a data edit almost always means a trailing-comma or quote
problem in the object you just added. Fix it and rebuild before reporting.

For visual changes (new photos especially), offer to run `npm run dev` so the
user can look at it — don't start a dev server unprompted.

## House style reminders

- The **professional page** (`/`) uses Title Case for names, companies, titles.
- The **hobbies page** (`/hobbies`) is **lowercase throughout** — races,
  captions, headings, all of it.
- Em dashes (`—`), not hyphens, in date ranges and school/cert names.
- Never invent facts: metrics, dates, locations, race times, or photo captions.
  Ask instead.
