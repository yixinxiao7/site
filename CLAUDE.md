# Portfolio Site — Project Context

## Owner
Yixin Xiao — Senior Software Engineer at Capital One, NYC

## Tech Stack
- **Framework**: Next.js 14.1.0 (App Router)
- **UI**: React 18, JSX
- **Styling**: CSS Modules + global CSS variables (`globals.css`)
- **Fonts**: Cormorant Garamond (professional page), IBM Plex Mono (hobbies page) — loaded via `next/font/google` as CSS variables (`--font-cormorant`, `--font-ibm-plex`)
- **Icons**: `react-icons` — Feather icons (`fi`) for professional page, Font Awesome 6 (`fa6`) for hobbies (FaStrava, FaDumbbell)
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
│   │   ├── Hero.jsx                  # Name, title, tagline
│   │   ├── Experience.jsx            # Work history + education
│   │   ├── Certifications.jsx        # AWS cert etc.
│   │   ├── Projects.jsx              # Placeholder project cards
│   │   ├── Contact.jsx               # Email, LinkedIn, GitHub, resume download
│   │   └── Professional.module.css   # Shared section styles
│   └── hobbies/
│       ├── GalleryGrid.jsx           # Masonry photo grid with header (shortest-column algorithm)
│       ├── GalleryItem.jsx           # Image/video card with hover caption overlay
│       ├── Hobbies.module.css        # Gallery grid + header styles
│       ├── Fitness.jsx               # Fitness section — description, Strava/Hevy links, race list
│       └── Fitness.module.css
├── data/
│   ├── experience.js                 # Work experience, education, contact data
│   ├── certifications.js             # Certifications data
│   └── gallery.js                    # Gallery items — 22 images + 3 videos with aspect ratios
public/
├── me.jpeg                           # Profile photo
├── Resume_2024.pdf                   # Downloadable resume
├── gallery/                          # Photo/video assets (IMG_1–IMG_24.JPEG, VID_1–VID_3.mp4)
├── next.svg
└── vercel.svg
```

## Routes
| Route      | Description                                                         |
|------------|---------------------------------------------------------------------|
| `/`        | Professional portfolio — Hero, Experience, Certs, Projects, Contact |
| `/hobbies` | Hobbies page — photo/video masonry collage + fitness section        |

## Design
- **Theme**: Dark & refined — near-black bg `#0c0c0c`, warm off-white text `#e8e4df`, gold accent `#c4b998`
- **CSS variables**: `--bg-primary`, `--bg-secondary`, `--bg-tertiary`, `--text-primary`, `--text-secondary`, `--text-accent`, `--border-subtle`, `--nav-height`
- **Professional page**: Cormorant Garamond, vertical scroll, scroll-triggered fade-in animations, sections differentiated by spacing + subtle borders + alternating bg shades
- **Hobbies page**: IBM Plex Mono, two sections:
  1. **Photo gallery**: Masonry grid using flexbox columns with a shortest-column distribution algorithm. Each section component contains its own header/description (self-contained pattern). Hover shows caption overlay.
  2. **Fitness**: 2/3 + 1/3 layout — left has description + Strava/Hevy icons (Hevy shows tooltip on hover), right has race list
- **Nav**: Sticky top bar with backdrop blur, two tabs, active state gold underline

## Key Patterns
- **Self-contained sections**: Each section component (GalleryGrid, Fitness) contains its own header, description, and content. The page file (`hobbies/page.jsx`) simply composes them.
- **Fonts as CSS variables**: Both fonts loaded in `layout.js`, each page sets `font-family` via its CSS module
- **ScrollReveal**: Wraps professional page sections for fade-in-on-scroll via Intersection Observer. Uses CSS classes `hidden-initial` / `revealed` defined in `globals.css`
- **Gallery masonry**: `GalleryGrid` uses a greedy shortest-column algorithm (`getHeight` parses aspect ratios) to distribute items evenly across 3 flexbox columns
- **Gallery data**: Items in `src/data/gallery.js` — each has `type`, `src`, `aspectRatio`, `caption`. When `src` is null, a colored placeholder div renders
- **Video autoplay**: `GalleryItem` uses Intersection Observer to play/pause videos when in/out of viewport. Videos require `muted loop playsInline` attributes
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
- **Gallery**: 22 photos + 3 videos from NYC, Boston, Hawaii, China, Philadelphia, Seattle, San Francisco, etc.

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
