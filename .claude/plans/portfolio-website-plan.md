# Anshul Chugh Portfolio Website - Implementation Plan

## Context

Anshul Chugh is an actress and model based in Singapore who needs a portfolio website to showcase her performing arts and modeling career. The site will display profile photos, an introduction video, past acting experience organized by year/project, and personal photo shoots categorized by style. All media lives on Google Drive with public sharing links. The site will be hosted on GitHub Pages as a static Next.js export, modeled after the existing ITKS project at `/Users/schawla/Documents/PersonalCode/ITKS/`.

---

## 1. Design System

### Aesthetic Direction: "Cinematic Dark Editorial"

A hybrid of **Modern Dark Cinema** and **Exaggerated Minimalism** styles (sourced from UI/UX Pro Max). This avoids the generic AI portfolio look by:
- Using a luxury serif display font instead of default sans-serif
- Pure black OLED background with gold accent (not blue/purple gradients)
- Oversized typography as the primary design element in the hero
- Intentional asymmetry in gallery layouts
- Cinematic motion-driven scroll experience

**Anti-AI-Slop Guardrails** (from frontend-design philosophy):
- NO purple-to-blue gradients, NO 3 identical cards in a row, NO "Learn More" CTAs
- NO Inter/Roboto everywhere - use distinctive serif display font
- Asymmetry > symmetry, hierarchy > democracy
- Typography IS the design in text sections
- One element dominates per section

### Color Palette

**Brand hex: `#d4af37` (Gold) - HSL(46, 65%, 52%)**

Based on the Theater/Cinema palette from UI/UX Pro Max, customized with our gold:

| Token | Value | Usage |
|---|---|---|
| `--bg-deep` | `#000000` | Page background (OLED black) |
| `--bg-base` | `#050506` | Base sections |
| `--bg-elevated` | `#0a0a0a` | Card surfaces, nav blur bg |
| `--bg-surface` | `#18181b` (zinc-900) | Elevated panels |
| `--border` | `rgba(255,255,255,0.08)` | Subtle card borders |
| `--border-accent` | `#d4af37` | Active states, gold accents |
| `--text-primary` | `#FAFAFA` | Headings, primary text |
| `--text-secondary` | `#a1a1aa` (zinc-400) | Body, descriptions |
| `--text-muted` | `#71717a` (zinc-500) | Labels, metadata |
| `--accent` | `#d4af37` | Gold accent (brand color) |
| `--accent-glow` | `rgba(212,175,55,0.15)` | Ambient glow behind accent elements |

**Gold 11-shade scale** (generated from `#d4af37` using color-palette skill formula):

```css
--color-gold-50:  hsl(46, 52%, 97%);   /* #FAF8F0 - subtle warm bg */
--color-gold-100: hsl(46, 52%, 94%);   /* #F5F0DF - hover on light */
--color-gold-200: hsl(46, 55%, 87%);   /* #EBE0BE - borders */
--color-gold-300: hsl(46, 59%, 75%);   /* #DBC88C - disabled */
--color-gold-400: hsl(46, 62%, 62%);   /* #D4B45C - muted gold */
--color-gold-500: hsl(46, 65%, 52%);   /* #D4AF37 - BRAND */
--color-gold-600: hsl(46, 65%, 40%);   /* #A8882A - primary actions */
--color-gold-700: hsl(46, 65%, 33%);   /* #8A6F22 - hover on primary */
--color-gold-800: hsl(46, 65%, 27%);   /* #71591B - active states */
--color-gold-900: hsl(46, 65%, 20%);   /* #544214 - text on light */
--color-gold-950: hsl(46, 65%, 10%);   /* #2A210A - darkest */
```

### Typography

**Pairing: Cormorant (display) + Montserrat (body)** - "Luxury Serif" from UI/UX Pro Max.

Cormorant's theatrical elegance is perfect for an actress and model. Montserrat's geometric precision provides clean readability. This avoids the Inter-everywhere anti-pattern.

```css
@import url('https://fonts.googleapis.com/css2?family=Cormorant:wght@400;500;600;700&family=Montserrat:wght@300;400;500;600;700&display=swap');
```

| Element | Font | Size (mobile / desktop) | Weight | Tracking |
|---|---|---|---|---|
| Hero name | Cormorant | clamp(3rem, 10vw, 9rem) | 600 | 0.05em expanding to 0.15em |
| Section headings | Cormorant | text-3xl / text-5xl | 600 | 0.02em |
| Year headings | Cormorant | text-5xl / text-8xl | 700 | -0.02em |
| Project names | Montserrat | text-xl / text-2xl | 600 | 0 |
| Body text | Montserrat | text-base / text-lg (16px min) | 400 | 0 |
| Nav links | Montserrat | text-sm | 500 | 0.05em uppercase |
| Contact info | Montserrat | text-sm | 400 | 0.02em |
| Tab labels | Montserrat | text-sm | 600 | 0.05em uppercase |

**Type scale**: Major Third (1.250 ratio) - strong presence without being dramatic.
Line-height: 1.5 body, 1.1 display headings.

### Spacing System
- 4/8px base grid (Material Design standard)
- Section vertical padding: `py-20 md:py-32`
- Section horizontal: `px-6 md:px-8`
- Container: `max-w-7xl mx-auto`
- Card gaps: `gap-4 md:gap-6`
- Heading to content: `mb-12 md:mb-16`

---

## 2. Animation Strategy

Using **Motion (Framer Motion) v10** - the motion-driven style with cinematic scroll experience.

### Hero Reveal Sequence (orchestrated, not scattered)
```
0.0s  Particles fade in (ambient background)
0.3s  Name "ANSHUL CHUGH" - letter-spacing expands from 0.05em to 0.15em, opacity 0→1
0.8s  Subtitle "Actress & Model" fades up (y: 20→0)
1.2s  Contact info fades up
1.8s  Scroll indicator bounces in
```

Uses Framer Motion `stagger()` with `delayChildren` and variants pattern.

### Scroll-Triggered Entrances (whileInView)
```tsx
<motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}  // Expo.out
>
```

### Gallery Stagger (30-50ms per item per UI/UX Pro Max rule)
```tsx
{items.map((item, i) => (
  <MediaCard key={item.id} delay={i * 0.04} />
))}
```

### Tab Transitions (Photo Shoots)
AnimatePresence with `mode="wait"` - exit first, then enter.
Active tab indicator uses `layoutId` for smooth sliding underline.
Exit animations shorter than enter (~60-70% duration per UI/UX Pro Max rule).

### Parallax Scroll (hero section)
Using `useScroll` + `useTransform` from Motion:
```tsx
const { scrollY } = useScroll()
const heroOpacity = useTransform(scrollY, [0, 400], [1, 0])
const heroY = useTransform(scrollY, [0, 400], [0, -100])
```

### Image Hover (CSS-only for performance)
- Scale 1.05 over 300ms
- Overlay gradient strengthens
- Gold bottom border appears
- `cursor-pointer` on all clickable elements (UI/UX Pro Max rule)

### Accessibility
- All animations respect `prefers-reduced-motion` via `useReducedMotion` hook
- No animations block user input
- Animation durations 150-300ms for micro-interactions, max 400ms for transitions
- Spring physics with `damping: 20, stiffness: 90` for natural feel

---

## 3. Project Architecture

### Tech Stack
| Component | Choice | Version |
|---|---|---|
| Framework | Next.js (App Router) | 14.x |
| Language | TypeScript | 5.x |
| Styling | Tailwind CSS | 3.3.x |
| Animation | Framer Motion | 10.x |
| Icons | Lucide React | 0.284.x |
| Gallery | react-masonry-css | 1.0.x |
| Lightbox | yet-another-react-lightbox | 3.x |
| Package Manager | pnpm | 9.x |
| Deploy | GitHub Pages (static export) | - |

### Folder Structure
```
app/
  layout.tsx                  # Root layout (fonts, metadata, dark class)
  page.tsx                    # Single-page composition of all sections
  components/
    hero.tsx                  # Full-viewport: name + contact + particles
    nav.tsx                   # Sticky scroll-aware navigation
    section-heading.tsx       # Reusable animated section title
    profiles-gallery.tsx      # Masonry grid of profile photos
    intro-video.tsx           # Google Drive video embed section
    experience-section.tsx    # Year-accordion with project cards
    experience-project.tsx    # Single project: images + videos
    photo-shoots.tsx          # Tabbed categorized photo gallery
    photo-category.tsx        # Single category tab content
    gallery-grid.tsx          # Reusable masonry grid wrapper
    lightbox-wrapper.tsx      # Lightbox state manager
    video-embed.tsx           # Google Drive iframe player
    media-card.tsx            # Photo card with hover spotlight
    particles.tsx             # Ambient floating particles (from ITKS)
    scroll-indicator.tsx      # Bouncing chevron at hero bottom
    footer.tsx                # Minimal footer with contact
    loading-skeleton.tsx      # Shimmer placeholder
data/
  types.ts                    # MediaItem, Project, YearExperience, PhotoShootCategory
  profiles.ts                 # Google Drive file IDs for profile photos
  intro-video.ts              # Google Drive file ID for intro video
  experience.ts               # Nested: year -> project -> media[]
  photo-shoots.ts             # Category -> photo[]
lib/
  google-drive.ts             # URL builder (image, thumbnail, video embed)
  shuffle.ts                  # Fisher-Yates shuffle for photo randomization
public/
  fonts/                      # Local font fallbacks if needed
  favicon.png
.github/
  workflows/
    nextjs.yml                # GitHub Pages deploy (adapted from ITKS)
```

### Data Model
```typescript
// data/types.ts
export interface MediaItem {
  id: string;          // Google Drive file ID
  type: "image" | "video";
  alt: string;
}

export interface Project {
  name: string;
  slug: string;
  media: MediaItem[];
}

export interface YearExperience {
  year: number;
  projects: Project[];
}

export interface PhotoShootCategory {
  name: string;        // "Indian Ethnicwear", "Bold Look", "Photoshoot"
  slug: string;
  photos: MediaItem[];
}
```

### Google Drive URL Helpers
```typescript
// lib/google-drive.ts
export const gdriveImage = (id: string) =>
  `https://drive.google.com/uc?export=view&id=${id}`;

export const gdriveThumbnail = (id: string, w = 400) =>
  `https://drive.google.com/thumbnail?id=${id}&sz=w${w}`;

export const gdriveVideoEmbed = (id: string) =>
  `https://drive.google.com/file/d/${id}/preview`;
```

### Google Drive Inventory (as of 2026-03-28)

**Root folder:** `1j9cXMQGjifYMsr7ro39eEov5lQGzPALN`

#### Profiles (folder: `1Cong118PkvFg3DfJeIcwygzQNwEQfchQ`)
- **Status: EMPTY** - use placeholder stock headshots for now
- TODO: Replace with real profile photos when uploaded

#### Introduction Video (folder: `1rdwBPgq8kZ2gTl9ZMgBulVVZabjwUyDb`)
- **Status: EMPTY** - use a placeholder video embed for now
- TODO: Replace with real introduction video when uploaded

#### Past Acting Experience (folder: `1HR7-fwySAyisdPcFYb9kq07Zkx9ZZryT`)

**2025** (folder: `1NQ5akBzMeKDt5WDaQOboJw8EVF0pqBO6`) - 4 projects:

| Project | Folder ID | Files |
|---|---|---|
| Celebrating Fathers 2025 | `1WODEaM_sXavUn9uy2UnikPrCZiPxoKHV` | `Celebrating Fathers 2025 (Anshul Section Only).mov` (`1oxD3GEwtPu1N5OKEaSOhE8avlQN-qKQT`), `Celebrating-Fathers-2025.mp4` (`1rbXYDSCxu2i-VQSLni95PptBwmjS1Uk9`) |
| IMDA Smart Nation Photoshoot | `1m0SiGOaBnjTzcfsCCb93C7FViR1E4NY5` | `IMDA Photoshoot.jpg` (`1wUUL-j3I2kFJhTmxXOlwc2S27XSr5rF8`) |
| Sentosa Brand Library Photoshoot | `1ot59xaVPSPXv6qzRz4czKUDVqpp0T12Z` | `Sentosa Instagram 1.jpg` (`1Evnk38mKOD2DicpcJefU-BMZQQXhAlyx`), `Sentosa Instagram 2.jpg` (`17xQY9s1ImECtw0NlxNzsN-kx5kHbUMD9`), `Sentosa Wall Ad.jpg` (`1xqxSGVO9EKESLg_qz0LeEGKU_gTySRXg`), `Sentosa Instagram Ad.mov` (`1lEqIheUgCOepWEvtMiT5k2wnuJnD-CB2`) |
| URA: Honouring the past, forging the future | `1RW0zYlDN1gaKlPn8i2CxgwDN59Tf_pv7` | `URA Anshul Section Only.mov` (`1kLu6Z0ymt2LoyCF68wQQppBfcxEaxvmL`), `URA Anshul Shoot (Full Video).mp4` (`10VJ9YtPzwlheyZUtXgqRo3JadHuZAA4Z`) |

**2024** (folder: `1ai_ixOJxUpjxiP62P_KwXMmGVK12MtfW`) - 2 projects:

| Project | Folder ID | Files |
|---|---|---|
| OnePA Brand Stock Photoshoot | `1lk0XE1E_3eIcJvFEAoNtn44oT7NnImz7` | **EMPTY** - TODO: Replace with real files when uploaded |
| POSB Print & Video Shoot | `1vaPTfRcNWK8w53c5JC-_bTDw1VmIKee4` | `POSB Insta Ad.mov` (`1MgbDWcr5rdm7sMUcgXebZu5ApsX3j_b9`), `POSB Website Ad Banner.jpg` (`1pKXM8LrU9-9g7tlZRlPRDEzkyaIST_6w`), `POSB Website Ad.jpg` (`10KFAXNyg0crSoM9ZVJLUA78UtLRQblfn`) |

#### Personal Photoshoots (folder: `14lt7b4MQOi8Fsuch3KwtW1qA9Ickl_4e`)

| Category | Folder ID | File Count | Status |
|---|---|---|---|
| Indian Ethnicwear | `1XbnC8KhuTrYK0LwSxXBvZPy0M_DZssm2` | 22 JPEGs | **REAL DATA** - all file IDs extracted |
| Bold Look | `1hTFEOLDRU1264T7fvb0_tMemFNEywvmJ` | 0 | **EMPTY** - TODO: Replace with real photos when uploaded |
| Photoshoot | `1gv3wQVTrrjNgSaTcnQgE-8yQ_LWDFybS` | 0 | **EMPTY** - TODO: Replace with real photos when uploaded |

**Indian Ethnicwear - Full file list (22 images):**
```
IMG_6922.JPG  -> 1-jsT4J0ty-3G1TadNYh5KCsze17gIXqS
IMG_6925.JPG  -> 1-J87v9IFc1-3_KfhcUzZ1ATjrmHF_Q62
IMG_6926 2.JPG -> 1qEvhudCKmYOseGtXxPXbfoj4eDXML2V4
IMG_6929 2.JPG -> 1U3lY9LoU0V9J3X4IMTzf8UGnqkcPDogq
IMG_6931.JPG  -> 1RAOn0k_LDC2zKIgKGmk0mMkqntvbTjDZ
IMG_6934.JPG  -> 1LqK5MIw9yxqGLiYxga_r1pXnoKeVgDWt
IMG_6935.JPG  -> 1LTHbbMplxx_1duOM_SJQ5v1kmqETyyeD
IMG_6937.JPG  -> 1MRgmH1ki9Dv8sC3Oj5vE7iRMqCpo84ni
IMG_7000.JPG  -> 1XVnt4NcNlVP0ALWedJqOiJWR72jLR4iZ
IMG_7001.JPG  -> 1ikXNm_w2n1qfo-J5mRdVfK_yLu6Z7Kkg
IMG_7002.JPG  -> 1-ArHZ5OOjwsux7_gq94dpI5jayNjeU2z
IMG_7003.JPG  -> 1vQZE7RxBC7fb7FyS2CBvFEuYCJzxvfOv
IMG_7016.jpg  -> 1hIe0FdQWniH17DtN-YZcd1he3b6MunSr
IMG_7018.jpg  -> 15nZ2I4TsqUUHbkmAMQgRQQZXwhHwM9_s
IMG_7022.jpg  -> 14GNBgWCOMVzi7KwbCfa7PwZLbihUo5P6
IMG_7029.JPG  -> 14cmuAX-MeLOYKXLzHnxxI_6VE1Po9u1y
IMG_7072.JPG  -> 18T3I-_ScCZhgb5NrJP4GH4AtKZzObyyM
IMG_7074.JPG  -> 1DMgiaQ_-waisYNnRBTj1gqtuRaBbleyX
IMG_7077.JPG  -> 1IB5CIatvPheGjo3Ix2LIBqZJgNJlFT7F
IMG_7078.jpg  -> 1sWzEQWkx8YIyHS79hKwSRqwu-4c0S3tm
IMG_7083.jpg  -> 1lzzoqvfBGXbvCgEyJcPkmASjQTNKfj0A
IMG_7084.jpg  -> 1suUoXWYb4F7fzkWPXCo5rlJPAGrVvfi2
```

### Placeholder Strategy for Empty Folders
For folders marked EMPTY, use Unsplash stock images during development:
- **Profiles**: 6 professional headshot placeholders from Unsplash
- **Introduction Video**: YouTube embed of a generic showreel placeholder
- **Bold Look**: 8 fashion/editorial placeholder images from Unsplash
- **Photoshoot**: 8 studio photoshoot placeholder images from Unsplash
- **OnePA**: 3 placeholder images + 1 placeholder video
- All placeholder code blocks marked with `// TODO: Replace placeholder with real Google Drive content`

---

## 4. Page Layout (Section Order)

Single-page scroll. Each section has an `id` for nav anchoring.

### Section 1: Navigation (sticky, z-50)
- Transparent initially, `backdrop-blur` + border-b on scroll
- Links: Profiles | Introduction | Experience | Photo Shoots | Contact
- Mobile: hamburger with AnimatePresence slide

### Section 2: Hero (`100dvh`) - Typography-Dominant
Per hero-patterns skill for Creative/Agency: "Bold, unconventional choices. Personality-driven. Demonstrates capability through execution."

```
+-----------------------------------------------+
|          [Particles canvas bg]                |
|                                               |
|          A N S H U L   C H U G H              |  <- Cormorant, clamp(3rem,10vw,9rem)
|                                               |     letter-spacing animates
|          Actress  &  Model                    |  <- Cormorant italic, text-xl, zinc-400
|                                               |
|          +65 8171-1361                        |  <- Montserrat, text-sm, zinc-500
|          ANSHULchugh.work@gmail.com           |     clickable tel: and mailto:
|                                               |
|                  v (scroll)                   |
+-----------------------------------------------+
```

Intentional design choices:
- Name text is MASSIVELY oversized - typography IS the design
- No image in hero (typography-dominant approach per hero-patterns skill)
- Particles provide ambient depth without competing
- Extreme vertical whitespace between elements
- Contact info is understated, not competing with name

### Section 3: Profiles (`id="profiles"`)
- Masonry grid: 3 cols desktop / 2 tablet / 1 mobile
- Click image -> lightbox fullscreen
- `loading="lazy"` on all images
- Staggered entrance animation

### Section 4: Introduction Video (`id="intro"`)
- Full-width container, max-w-4xl centered
- Google Drive iframe with 16:9 aspect ratio
- Decorative thin gold border frame
- Gradient edges fading into black background

### Section 5: Past Acting Experience (`id="experience"`)
- Years descending (2025, 2024...)
- Each year: oversized year number (text-8xl, zinc-800) as watermark heading sliding from left
- Grid of project cards (2-col desktop, 1-col mobile)
- Each project: clickable card -> expands to show full gallery + videos
- Card spotlight effect on hover (adapted from ITKS)

### Section 6: Personal Photo Shoots (`id="photoshoots"`)
- Tab bar: **Indian Ethnicwear** | **Bold Look** | **Photoshoot**
- Gold underline indicator with `layoutId` sliding animation
- Content: shuffled masonry grid with AnimatePresence transitions
- Photos shuffled on mount using Fisher-Yates

### Section 7: Footer
- Minimal dark (zinc-950)
- Name, phone (`tel:`), email (`mailto:`)
- Copyright 2025

---

## 5. Key Configuration

### next.config.mjs
```js
const nextConfig = {
  output: "export",
  images: { unoptimized: true },
};
```

### Tailwind Config (key additions)
```js
theme: {
  extend: {
    fontFamily: {
      serif: ['Cormorant', 'serif'],
      sans: ['Montserrat', 'sans-serif'],
    },
    colors: {
      gold: {
        50: '#FAF8F0', 100: '#F5F0DF', 200: '#EBE0BE',
        300: '#DBC88C', 400: '#D4B45C', 500: '#D4AF37',
        600: '#A8882A', 700: '#8A6F22', 800: '#71591B',
        900: '#544214', 950: '#2A210A',
        DEFAULT: '#D4AF37',
        glow: 'rgba(212,175,55,0.15)',
      },
    },
    animation: {
      "fade-in": "fade-in 1.5s ease-out forwards",
      "title-reveal": "title-reveal 2s ease-out forwards",
      "fade-up": "fade-up 0.8s ease-out forwards",
      "slide-left": "slide-left 0.6s ease-out forwards",
      "shimmer": "shimmer 2s linear infinite",
      "float": "float 6s ease-in-out infinite",
      "bounce-slow": "bounce-slow 2s ease-in-out infinite",
    },
  },
},
```

### GitHub Actions (adapted from ITKS)
- Trigger: push to `main` + manual dispatch
- pnpm v9, Node 20
- Cache `.next/cache`
- Build -> upload `./out` -> deploy to GitHub Pages

---

## 6. Responsive Breakpoints

| Breakpoint | Gallery Cols | Hero Name Size | Nav | Video Width |
|---|---|---|---|---|
| < 640px (mobile) | 1 | text-5xl | Hamburger | Full-width |
| 640px (sm) | 1 | text-5xl | Hamburger | Full-width |
| 768px (md) | 2 | text-7xl | Horizontal | max-w-3xl |
| 1024px (lg) | 3 | text-8xl | Horizontal | max-w-4xl |
| 1280px (xl) | 3 | text-9xl | Horizontal | max-w-4xl |

Use `min-h-dvh` for hero (not `100vh`) per UI/UX Pro Max rule for mobile viewports.

---

## 7. Accessibility Checklist (UI/UX Pro Max Critical Rules)

- [ ] Color contrast >= 4.5:1 for all text (gold-500 on black = ~7.5:1)
- [ ] Focus rings visible on all interactive elements (2-4px gold ring)
- [ ] Alt text on every meaningful image
- [ ] `aria-label` on icon-only buttons (hamburger, lightbox controls)
- [ ] Keyboard navigation: Tab order matches visual order
- [ ] `prefers-reduced-motion` respected - disable all animations
- [ ] Touch targets minimum 44x44px
- [ ] 8px+ spacing between touch targets
- [ ] `loading="lazy"` on all below-fold images
- [ ] Reserve image dimensions to prevent CLS
- [ ] `cursor-pointer` on all clickable elements
- [ ] `tel:` and `mailto:` links for contact info

---

## 8. Implementation Phases

### Phase 1: Bootstrap
1. `pnpm init` + install all dependencies
2. Create config files (next.config, tailwind, postcss, tsconfig)
3. Create `global.css` with Tailwind layers + custom keyframes
4. Create `app/layout.tsx` with fonts, metadata, `<html class="dark">`
5. Minimal `app/page.tsx` - verify `pnpm dev` and `pnpm build` work

### Phase 2: Data Layer
1. `data/types.ts` - all TypeScript interfaces
2. `lib/google-drive.ts` - URL builders
3. `lib/shuffle.ts` - Fisher-Yates
4. Placeholder data files with dummy Google Drive IDs

### Phase 3: Core Components
1. `particles.tsx` (adapted from ITKS)
2. `section-heading.tsx`, `scroll-indicator.tsx`, `loading-skeleton.tsx`
3. `video-embed.tsx`, `media-card.tsx`
4. `gallery-grid.tsx` (masonry wrapper)
5. `lightbox-wrapper.tsx`

### Phase 4: Section Components
1. `hero.tsx` - particles + name + contact + scroll indicator
2. `nav.tsx` - sticky with scroll detection + mobile menu
3. `profiles-gallery.tsx` - data + gallery + lightbox
4. `intro-video.tsx` - data + video embed
5. `experience-section.tsx` + `experience-project.tsx`
6. `photo-shoots.tsx` + `photo-category.tsx` - tabs + shuffle
7. `footer.tsx`

### Phase 5: Assembly & Polish
1. Compose all sections in `app/page.tsx`
2. Fine-tune animations, responsive breakpoints
3. Add `onerror` fallbacks for Google Drive images
4. Test all breakpoints (375px, 768px, 1024px, 1440px)

### Phase 6: Real Data + Deploy
1. Get Google Drive folder shared publicly ("Anyone with the link")
2. Extract file IDs, populate all data files
3. Test every media item loads
4. Create GitHub repo, add workflow, push to main
5. Verify GitHub Pages deployment

---

## 9. Google Drive Reliability Mitigations

| Risk | Mitigation |
|---|---|
| Rate limiting / slow loads | Use `/thumbnail?id=` for gallery thumbnails, `uc?export=view` for lightbox full-res |
| Video iframe blocked | Ensure folder is public; add `allow="autoplay; encrypted-media"` |
| Image redirect issues | Try thumbnail URL first; fallback to `uc?export=view` |
| Complete Drive failure | Download media to `public/images/` as nuclear fallback |
| Slow initial load | `loading="lazy"` on all images, shimmer skeletons, staggered render |

---

## 10. Verification Plan

1. **Build check**: `pnpm build` completes without errors, `./out/` contains static HTML
2. **Local serve**: `pnpm dlx serve out/` - navigate all sections
3. **Media loading**: DevTools Network tab - every image/video request succeeds (no 403/404)
4. **Lightbox**: Click every gallery image - opens, navigates, closes
5. **Video playback**: All Google Drive iframes play
6. **Responsive**: Test at 375px, 768px, 1024px, 1440px
7. **Animations**: All whileInView triggers fire correctly, stagger feels natural
8. **Tab switching**: Photo shoot categories animate smoothly
9. **Navigation**: All anchor links scroll to correct section
10. **Mobile menu**: Opens/closes, links work and close menu
11. **Accessibility**: Lighthouse audit targeting 90+ on Accessibility
12. **Performance**: Lighthouse 90+ on Performance (lazy loading, no CLS)
13. **Cross-browser**: Chrome, Safari, Firefox (desktop + mobile)
14. **Reduced motion**: Enable `prefers-reduced-motion`, verify no animations play

---

## Key Files to Modify/Create

| File | Purpose | Priority |
|---|---|---|
| `app/page.tsx` | Main page composing all sections | Critical |
| `app/layout.tsx` | Root layout with fonts, metadata, dark mode | Critical |
| `app/components/hero.tsx` | First impression, sets cinematic tone | Critical |
| `lib/google-drive.ts` | URL builders every component depends on | Critical |
| `data/experience.ts` | Most complex data structure | Critical |
| `tailwind.config.js` | Full design system in config | Critical |
| `global.css` | Custom animations and utilities | Critical |
| `.github/workflows/nextjs.yml` | CI/CD pipeline | High |
| `next.config.mjs` | Static export config | High |
| All component files | UI implementation | High |
| All data files | Content | Medium (placeholder first) |

---

## Reference Project Files (ITKS)

Reuse patterns from these ITKS files:
- `next.config.mjs` - static export pattern
- `.github/workflows/nextjs.yml` - GitHub Pages deployment
- `app/components/particles.tsx` - ambient particles (adjust colors)
- `app/components/nav.tsx` - scroll-aware sticky nav pattern
- `app/components/card.tsx` - spotlight hover effect
- `global.css` - glass, gradient-text, skeleton, hover-lift utilities
- `postcss.config.js` - copy as-is
- `tsconfig.json` - copy, remove contentlayer alias

**Do NOT copy**: Theme toggle (dark-only), contentlayer config (no MDX), agentation (no chatbot).
