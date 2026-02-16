# Portfolio Site — Project Context

## Owner
Yixin Xiao — Senior Software Engineer at Capital One, NYC

## Tech Stack
- **Framework**: Next.js 14.1.0 (App Router)
- **UI**: React 18, JSX
- **Styling**: CSS Modules + global CSS variables (`globals.css`)
- **Fonts**: Cormorant Garamond (professional page), IBM Plex Mono (creative page) — loaded via `next/font/google` as CSS variables
- **Icons**: `react-icons` (Feather icons: FiMail, FiGithub, FiLinkedin, FiDownload)
- **Package manager**: npm

## Project Structure
```
src/
├── app/
│   ├── layout.js                     # Root layout — both fonts, NavBar, dark theme
│   ├── globals.css                   # Dark theme CSS variables, animation utilities
│   ├── page.jsx                      # Professional portfolio (default landing)
│   ├── page.module.css               # Professional page styles
│   ├── creative/
│   │   ├── page.jsx                  # Creative portfolio (photo/video collage)
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
│   └── creative/
│       ├── GalleryGrid.jsx           # CSS columns masonry layout
│       ├── GalleryItem.jsx           # Image/video card with hover caption overlay
│       └── Creative.module.css
├── data/
│   ├── experience.js                 # Work experience, education, contact data
│   ├── certifications.js             # Certifications data
│   └── gallery.js                    # Gallery items (placeholder entries)
public/
├── me.jpeg                           # Profile photo
├── Resume_2024.pdf                   # Downloadable resume
├── next.svg
└── vercel.svg
```

## Routes
| Route       | Description                                                    |
|-------------|----------------------------------------------------------------|
| `/`         | Professional portfolio — Hero, Experience, Certs, Projects, Contact |
| `/creative` | Creative portfolio — masonry photo/video collage with hover captions |

## Design
- **Theme**: Dark & refined — near-black bg `#0c0c0c`, warm off-white text `#e8e4df`, gold accent `#c4b998`
- **Professional page**: Cormorant Garamond, vertical scroll, scroll-triggered animations
- **Creative page**: IBM Plex Mono, CSS columns masonry grid, hover overlays
- **Nav**: Sticky top bar with two tabs, active state underline

## Key Patterns
- Fonts loaded as CSS variables (`--font-cormorant`, `--font-ibm-plex`) in layout.js
- `ScrollReveal` component wraps sections for fade-in-on-scroll via Intersection Observer
- Gallery data in `src/data/gallery.js` — set `src` to image/video path to replace placeholders
- Videos autoplay muted when scrolled into view (Intersection Observer in GalleryItem)
- Path alias `@/*` maps to `./src/*` (jsconfig.json)

## Scripts
```
npm run dev    # Start dev server
npm run build  # Production build
npm run start  # Start production server
npm run lint   # Run linter
```

## Deployment
- **Git remote**: https://github.com/yixinxiao7/site.git
- **Branch**: `2024_site_revamp`
- **Target platform**: Vercel
- No environment variables required
