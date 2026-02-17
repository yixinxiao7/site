# Copilot Instructions for Site Portfolio

## Architecture Overview
This is a personal portfolio site built with Next.js 14 (App Router) featuring two distinct portfolios:
- **Professional** (`/`): Dark, elegant design showcasing work experience and technical expertise
- **Creative** (`/creative`): Photo/video gallery with masonry layout and hover captions

Key design principle: **Data-driven, minimal configuration**. Content lives in `src/data/`, styles are CSS Modules + global variables, components are presentational and receive props.

## Tech Stack
- **Framework**: Next.js 14.1.0 (App Router, no API routes)
- **UI**: React 18 functional components with hooks
- **Styling**: CSS Modules per component + `src/app/globals.css` (theme variables, animations)
- **Fonts**: Cormorant Garamond (professional) and IBM Plex Mono (creative) injected via `next/font/google` as CSS variables
- **Icons**: `react-icons` v5.0.1 (Feather set: FiMail, FiGithub, FiLinkedin, FiDownload)

## Critical Patterns

### 1. **Scroll-Triggered Animations**
All sections use `ScrollReveal.jsx` wrapper component:
```jsx
<ScrollReveal delay={0.1} threshold={0.15}>
  <section>...</section>
</ScrollReveal>
```
- Uses Intersection Observer; applies `revealed` class on entry, removes observer after
- `threshold=0.15` triggers when 15% visible (customizable)
- `delay` prop adds `transition-delay` for staggered reveals
- CSS classes: `.revealed` (fade-in), `.hidden-initial` (fade-out initial state)

### 2. **CSS Modules + Global Variables**
- All component styles in `Component.module.css` (scoped classes)
- Theme colors defined in `globals.css`: `--color-bg-dark` (#0c0c0c), `--color-text-warm` (#e8e4df), `--color-accent` (#c4b998)
- Font families injected into `<html>` as CSS variables: `--font-cormorant`, `--font-ibm-plex`
- Components reference fonts via `font-family: var(--font-cormorant);`

### 3. **Data-Driven Content**
All dynamic content resides in `src/data/`:
- `experience.js`: Work history, education (array of objects with `company`, `title`, `date`, `description`)
- `certifications.js`: Certification records
- `gallery.js`: Gallery items with `src`, `type` (image/video), `caption`

Import and render directly—no database or CMS needed.

### 4. **Gallery Videos (Creative Page)**
- Videos in `gallery.js` with `type: "video"` and `src: "path/to/video.mp4"`
- GalleryItem.jsx uses Intersection Observer to autoplay muted videos when scrolled into view
- Hover overlay displays caption (CSS opacity transition)

## File Reference Guide

| Key File | Purpose |
|----------|---------|
| [src/app/layout.js](src/app/layout.js) | Loads fonts, wraps NavBar, applies global styles |
| [src/app/globals.css](src/app/globals.css) | Theme vars, animation utilities (`.revealed`, `.hidden-initial`) |
| [src/components/ScrollReveal.jsx](src/components/ScrollReveal.jsx) | Intersection Observer wrapper for fade-in-on-scroll |
| [src/components/NavBar.jsx](src/components/NavBar.jsx) | Sticky nav with two route tabs |
| [src/components/professional/](src/components/professional/) | Hero, Experience, Certifications, Projects, Contact sections |
| [src/components/creative/GalleryGrid.jsx](src/components/creative/GalleryGrid.jsx) | CSS columns masonry, renders GalleryItem for each gallery.js entry |
| [src/data/experience.js](src/data/experience.js) | Work, education data |
| [jsconfig.json](jsconfig.json) | Path alias: `@/*` → `./src/*` |

## Development Workflow

**Start dev server:**
```bash
npm run dev
```

**Production build & test locally:**
```bash
npm run build
npm run start
```

**Linting:**
```bash
npm run lint
```

**Deployment**: Connected to Vercel. Push to `2024_site_revamp` branch to trigger auto-deploy. No environment variables required.

## Common Tasks

- **Add work experience**: Edit `src/data/experience.js`, add object to `workExperience` array
- **Add gallery item**: Edit `src/data/gallery.js`, add `{ src: "...", type: "image|video", caption: "..." }`
- **Change theme color**: Update CSS variables in `src/app/globals.css` (e.g., `--color-accent`)
- **Add section to professional page**: Create component in `src/components/professional/`, import in [src/app/page.jsx](src/app/page.jsx)
- **Update resume**: Replace `public/Resume_2024.pdf` (referenced in Contact.jsx)

## Non-Obvious Implementation Details

1. **NavBar routing**: Uses `usePathname()` to detect active route; clicking tab routes and updates visual state
2. **Gallery masonry**: CSS `column-count: 3` (responsive via media queries in Creative.module.css)
3. **Video autoplay**: GalleryItem uses Intersection Observer + `autoplay muted` attributes; browser allows autoplay if muted
4. **No hydration issues**: All interactivity wrapped with `"use client"` at component level (ScrollReveal, NavBar)
