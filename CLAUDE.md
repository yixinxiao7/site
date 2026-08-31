# Portfolio Site — Project Context

## Owner
Yixin Xiao — Senior Software Engineer at Capital One, NYC

## Tech Stack
- **Framework**: Next.js 14.1.0 (App Router)
- **UI**: React 18, JSX
- **Styling**: CSS Modules + global CSS variables (`globals.css`)
- **Fonts**: Cormorant Garamond (professional page), IBM Plex Mono (hobbies page) — loaded via `next/font/google` as CSS variables (`--font-cormorant`, `--font-ibm-plex`)
- **Icons**: `react-icons` — Feather icons (`fi`) for professional page, Font Awesome 6 (`fa6`) for hobbies (FaStrava, FaDumbbell)
- **Maps**: `react-simple-maps` — SVG US map with AlbersUsa projection, TopoJSON from `us-atlas@3`
- **Package manager**: npm
- **Large files**: Git LFS for `.mp4`/`.MP4` video files

## Project Structure
```
src/
├── app/
│   ├── layout.js                     # Root layout — both fonts, NavBar, dark theme
│   ├── globals.css                   # Dark theme CSS variables, animation utilities
│   ├── page.jsx                      # Professional portfolio (default landing)
│   ├── page.module.css               # Professional page styles
│   ├── hobbies/
│   │   ├── page.jsx                  # Hobbies page — composes GalleryGrid + Fitness
│   │   └── page.module.css
│   └── favicon.ico
├── components/
│   ├── NavBar.jsx                    # Two-tab nav: "my work experience" | "other things i like to do"
│   ├── NavBar.module.css
│   ├── ScrollReveal.jsx              # Intersection Observer wrapper for fade-in animations
│   ├── professional/
│   │   ├── Hero.jsx                  # Name, title, tagline + ScrollIndicator
│   │   ├── ScrollIndicator.jsx       # Bouncing scroll-down arrow at bottom of Hero (smooth-scrolls to #experience, fades past 80px)
│   │   ├── Experience.jsx            # Work history + education (id="experience" — scroll target)
│   │   ├── Certifications.jsx        # AWS cert etc.
│   │   ├── Projects.jsx              # Placeholder project cards
│   │   ├── Contact.jsx               # Email, LinkedIn, GitHub, resume download
│   │   └── Professional.module.css   # Shared section styles
│   └── hobbies/
│       ├── GalleryGrid.jsx           # Masonry photo grid with header (shortest-column algorithm)
│       ├── GalleryItem.jsx           # Image/video card with hover caption overlay
│       ├── Hobbies.module.css        # Gallery grid + header styles
│       ├── Fitness.jsx               # Fitness section — description, Strava/Hevy links, race list
│       ├── Fitness.module.css
│       ├── Traveling.jsx             # Traveling section — description + interactive US state map
│       └── Traveling.module.css
├── data/
│   ├── experience.js                 # Work experience, education, contact data
│   ├── certifications.js             # Certifications data
│   └── gallery.js                    # Gallery items — 25 images + 3 videos with aspect ratios
public/
├── me.jpeg                           # Profile photo
├── Resume_2026.pdf                   # Downloadable resume
├── gallery/                          # Photo assets (IMG_*.JPEG/jpeg, downscaled to ≤2560px long edge) + poster/ (generated video poster frames). Videos themselves are hosted on Cloudflare R2, not stored locally — see src/data/gallery.js
├── next.svg
└── vercel.svg
```

## Routes
| Route      | Description                                                         |
|------------|---------------------------------------------------------------------|
| `/`        | Professional portfolio — Hero, Experience, Certs, Projects, Contact |
| `/hobbies` | Hobbies page — photo/video masonry collage + fitness + traveling    |

## Design
- **Theme**: Dark & refined — near-black bg `#0c0c0c`, warm off-white text `#e8e4df`, gold accent `#c4b998`
- **CSS variables**: `--bg-primary`, `--bg-secondary`, `--bg-tertiary`, `--text-primary`, `--text-secondary`, `--text-accent`, `--border-subtle`, `--nav-height`
- **Professional page**: Cormorant Garamond, vertical scroll, scroll-triggered fade-in animations, sections differentiated by spacing + subtle borders + alternating bg shades. Hero is `calc(100vh - 80px)` so the next section peeks above the fold; a bouncing scroll-down arrow at the bottom of the hero hints at content below.
- **Hobbies page**: IBM Plex Mono, three sections:
  1. **Photo gallery**: Masonry grid using flexbox columns with a shortest-column distribution algorithm. Each section component contains its own header/description (self-contained pattern). Hover shows caption overlay.
  2. **Fitness**: 2/3 + 1/3 layout — left has description + Strava/Hevy icons (Hevy shows tooltip on hover), right has race list
  3. **Traveling**: Full-width section — intro paragraph + interactive US map (react-simple-maps). Visited states filled with gold accent color, unvisited states dim. Hover tooltip follows cursor showing state name. States list maintained in `visitedStates` array.
- **Nav**: Sticky top bar with backdrop blur, two tabs, active state gold underline

## Key Patterns
- **Self-contained sections**: Each section component (GalleryGrid, Fitness, Traveling) contains its own header, description, and content. The page file (`hobbies/page.jsx`) simply composes them.
- **Fonts as CSS variables**: Both fonts loaded in `layout.js`, each page sets `font-family` via its CSS module
- **ScrollReveal**: Wraps professional page sections for fade-in-on-scroll via Intersection Observer. Uses CSS classes `hidden-initial` / `revealed` defined in `globals.css`. Note: the first scroll target (`Experience`) is intentionally NOT wrapped — keeping it always-visible makes the initial scroll feel instant.
- **Gallery masonry**: `GalleryGrid` uses a greedy shortest-column algorithm (`getHeight` parses aspect ratios) to distribute items evenly across 3 flexbox columns
- **Gallery data**: Items in `src/data/gallery.js` — each has `id`, `type`, `src`, `aspectRatio`, `caption`
- **Video autoplay**: `GalleryItem` uses Intersection Observer to auto-play/pause videos when in/out of viewport, unless the visitor has manually paused a video (tracked per-tile) or the system requests reduced motion, in which case autoplay is skipped and a play control is shown. Each video tile has a visible pause/play button and a `poster` frame. Videos require `muted loop playsInline` attributes
- **All text is lowercase**: The site uses lowercase throughout for a casual, personal tone
- **Path alias**: `@/*` maps to `./src/*` (jsconfig.json)

## Content
- **Name**: Yixin Xiao
- **Role**: Senior Software Engineer at Capital One, NYC
- **Education**: University of Michigan — BSE in CS, minor in Business Administration (2017–2021)
- **Certification**: AWS Certified Solutions Architect — Associate
- **Skills**: Full-stack, architectural/platform/data engineering, AWS, Databricks
- **Contact**: yixinxiao7@gmail.com, linkedin.com/in/yixin-xiao, github.com/yixinxiao7
- **Fitness**: Strava (athlete/119032446), Hevy (bigyeesh). Races: 2024 Philadelphia Marathon, 2025 Atlanta Half-Marathon, 2025 Dallas Marathon
- **Gallery**: 25 photos + 3 videos from NYC, Boston, Hawaii, China, Philadelphia, Seattle, San Francisco, etc.
- **Traveling**: 25 visited US states tracked in `Traveling.jsx` `visitedStates` array (use full state names, e.g. "New York")

## Scripts
```
npm run dev    # Start dev server
npm run build  # Production build
npm run start  # Start production server
npm run lint   # Run linter
```

## Deployment
- **Git remote**: https://github.com/yixinxiao7/site.git
- **Branches**: `2026_site_revamp` (active), `2024_site_revamp` (main)
- **Target platform**: Vercel
- No environment variables required

## Design Context

### Users
Recruiters and hiring managers evaluating Yixin for engineering roles. They're scanning quickly, often on desktop, comparing multiple candidates. The site needs to convey competence and seniority at a glance while being easy to navigate. The hobbies page adds dimension — showing a well-rounded person beyond the resume.

### Brand Personality
Refined, understated, confident. The site should feel like a well-tailored suit — nothing loud, but everything intentional. The lowercase text and warm gold accents create quiet authority without pretension.

### Aesthetic Direction
- **Visual tone**: Dark, editorial, unhurried. Generous whitespace. Let content breathe.
- **Theme**: Dark mode only. Near-black backgrounds with warm undertones (`#0c0c0c`), off-white text (`#e8e4df`), gold accent (`#c4b998`). No pure whites or harsh contrasts.
- **Typography**: Serif (Cormorant Garamond) for the professional page conveys sophistication. Monospace (IBM Plex Mono) for hobbies conveys casual precision.
- **Motion**: Subtle and purposeful — scroll-reveal fades, hover transitions. Never bouncy or attention-seeking. Respect `prefers-reduced-motion`.
- **Anti-references**: No neon gradients, no bento grids, no "developer portfolio template" aesthetics, no excessive animations or parallax.

### Design Principles
1. **Substance over flash** — Every element should earn its place. No decorative filler. If it doesn't communicate something, remove it.
2. **Quiet confidence** — The design should impress without trying to. Restraint signals seniority. Let quality content and deliberate spacing do the talking.
3. **Scannable hierarchy** — Recruiters spend seconds, not minutes. Clear visual hierarchy, strong section differentiation, and legible type sizes ensure key information lands fast.
4. **Warmth in the details** — The gold accent, lowercase text, and personal hobbies page prevent the site from feeling cold or corporate. Small touches of personality matter.
5. **Consistency across pages** — Despite different fonts and moods, both pages share the same color palette, spacing philosophy, and interaction patterns. They feel like two sides of the same person.
