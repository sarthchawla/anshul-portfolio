<div align="center">

<!-- Hero Banner -->
<img src="https://capsule-render.vercel.app/api?type=waving&color=0:0A0B10,50:0EA5E9,100:38BDF8&height=220&section=header&text=ANSHUL&fontSize=80&fontColor=F2F4F7&fontAlignY=35&desc=Actress%20%E2%80%A2%20Model%20%E2%80%A2%20Singapore&descSize=18&descColor=A1A5B8&descAlignY=55&animation=fadeIn" width="100%" />

<br />

<!-- Tagline -->
<p>
  <strong>A cinematic portfolio experience</strong> built with precision, motion, and elegance.
</p>

<!-- Tech Badges -->
<p>
  <img src="https://img.shields.io/badge/Next.js_14-0A0B10?style=for-the-badge&logo=nextdotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/React_18-0A0B10?style=for-the-badge&logo=react&logoColor=38BDF8" />
  <img src="https://img.shields.io/badge/TypeScript-0A0B10?style=for-the-badge&logo=typescript&logoColor=38BDF8" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-0A0B10?style=for-the-badge&logo=tailwindcss&logoColor=38BDF8" />
  <img src="https://img.shields.io/badge/Framer_Motion-0A0B10?style=for-the-badge&logo=framer&logoColor=38BDF8" />
</p>

<!-- Status Badges -->
<p>
  <img src="https://img.shields.io/badge/status-live-38BDF8?style=flat-square" />
  <img src="https://img.shields.io/badge/design-dark_mode-0A0B10?style=flat-square&labelColor=1A1C28" />
  <img src="https://img.shields.io/badge/responsive-mobile_first-0EA5E9?style=flat-square" />
</p>

</div>

---

<br />

## Overview

A premium, dark-themed portfolio for **Anshul** -- an actress and model based in Singapore. The site showcases her acting experience (2017--2025), professional profiles, photo shoots, and showreel through an immersive, scroll-driven experience with cinematic motion design.

<br />

## Sections

| # | Section | Description |
|:-:|---------|-------------|
| 1 | **Hero** | Full-viewport intro with animated glow circle, portrait, and staggered contact links |
| 2 | **Profiles** | Masonry gallery of 12 professional headshots with physical stats overlay |
| 3 | **Introduction** | Embedded showreel video from Google Drive |
| 4 | **Experience** | Interactive bento grid of acting projects -- videos and stills from campaigns |
| 5 | **Photo Shoots** | Tabbed gallery (Western / Ethnic) with animated tab indicator and masonry layout |
| 6 | **Contact** | Contact form powered by Google Forms with direct email, WhatsApp, and Instagram links |

<br />

## Architecture

```
app/
  page.tsx                  # Main page (client component, section composition)
  layout.tsx                # Root layout (fonts, metadata, global styles)
  components/
    hero.tsx                # Hero section with portrait + animated glow
    nav.tsx                 # Sticky header with IntersectionObserver tracking
    profiles-gallery.tsx    # Masonry grid + lightbox for headshots
    intro-video.tsx         # Showreel embed
    experience-section.tsx  # Bento grid of acting work
    photo-shoots.tsx        # Tabbed Western/Ethnic galleries
    contact-section.tsx     # Form + direct contact links
    footer.tsx              # Footer with social links
    ui/
      beams-background.tsx  # Animated canvas particle effect (30 beams)
      interactive-bento-gallery.tsx
      minimalist-hero.tsx
      video-player.tsx
      ...
data/
  profiles.ts               # Google Drive file IDs for headshots
  experience.ts              # Acting projects by year (2017-2025)
  photo-shoots.ts            # Western + Ethnic photo categories
  types.ts                   # TypeScript interfaces
lib/
  google-drive.ts            # URL builders for GDrive images/videos
  z-index.ts                 # Layered z-index scale
  utils.ts                   # cn() class merge utility
  blur-placeholder.ts        # Image blur placeholders
```

<br />

## Design System

<table>
  <tr>
    <td width="50%">

### Palette

| Token | Value | Usage |
|-------|-------|-------|
| `surface.base` | `#0A0B10` | Page background |
| `surface.card` | `#12141D` | Card surfaces |
| `surface.elevated` | `#1A1C28` | Elevated elements |
| `accent.400` | `#38BDF8` | Primary highlight |
| `accent.500` | `#0EA5E9` | Interactive elements |
| `accent.glow` | `rgba(56,189,248,0.15)` | Glow effects |

  </td>
  <td width="50%">

### Typography

| Role | Font | Weight |
|------|------|--------|
| Headings | **Cormorant** (Serif) | 400--700 |
| Body / UI | **Montserrat** (Sans) | 300--600 |

### Z-Index Scale

```
0   Background / beams
5   Hero fade overlay
10  Page content
40  Navbar
60  Modal backdrop
100 Carousel overlay
```

  </td>
  </tr>
</table>

<br />

## Motion & Animation

| Animation | Duration | Technique | Purpose |
|-----------|----------|-----------|---------|
| Beam particles | Continuous | HTML5 Canvas, 30 beams, hue 190--260 | Ambient depth |
| Fade-up reveals | 0.8s | Framer Motion `whileInView` | Section entrances |
| Title reveal | 2.0s | Letter-spacing expansion + opacity | Hero name reveal |
| Tab indicator | 0.3s | `layoutId` shared layout | Category switching |
| Glow circle | 6.0s | CSS `float` keyframe | Hero portrait accent |
| Stagger children | 30--50ms | `staggerChildren` | List/grid entrances |

All animations respect `prefers-reduced-motion` via the global CSS media query.

<br />

## Media Pipeline

All media assets are hosted on **Google Drive** and served through optimized URLs:

```
Image display  -->  lh3.googleusercontent.com/d/{id}
Thumbnails     -->  drive.google.com/thumbnail?id={id}&sz=w800
Video embeds   -->  drive.google.com/file/d/{id}/preview
```

Integrated with **Next.js Image** component via a custom Google Drive loader for automatic optimization, lazy loading, and blur placeholders.

<br />

## Getting Started

### Prerequisites

- **Node.js** >= 18
- **pnpm** >= 8

### Install & Run

```bash
# Clone the repository
git clone https://github.com/sarthchawla/anshul-portfolio.git
cd anshul-portfolio

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build for Production

```bash
pnpm build
pnpm start
```

<br />

## Tech Stack

<div align="center">

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 14 (App Router) |
| **Language** | TypeScript 6 |
| **Styling** | Tailwind CSS 3.4 + PostCSS Nesting |
| **Animation** | Framer Motion 10 + Motion 12 |
| **Gallery** | React Masonry CSS + Yet Another React Lightbox |
| **UI Primitives** | Radix UI, Lucide Icons, CVA |
| **Media** | Google Drive CDN + Next.js Image Optimization |
| **Package Manager** | pnpm |

</div>

<br />

---

<div align="center">

<br />

**Built with care for Anshul Chugh**

<p>
  <a href="mailto:anshulchugh.work@gmail.com"><img src="https://img.shields.io/badge/Email-0A0B10?style=for-the-badge&logo=gmail&logoColor=38BDF8" /></a>
  <a href="https://instagram.com/an.shul_"><img src="https://img.shields.io/badge/Instagram-0A0B10?style=for-the-badge&logo=instagram&logoColor=38BDF8" /></a>
  <a href="https://wa.me/6581711361"><img src="https://img.shields.io/badge/WhatsApp-0A0B10?style=for-the-badge&logo=whatsapp&logoColor=38BDF8" /></a>
</p>

<br />

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:38BDF8,50:0EA5E9,100:0A0B10&height=100&section=footer" width="100%" />

</div>
