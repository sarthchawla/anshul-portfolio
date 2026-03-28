# Experience Section Carousel Redesign

## Changes

### 1. Fix h4 heading truncation
- **File:** `app/components/experience-project.tsx` line 110
- Remove `truncate` class, allow text to wrap naturally with `leading-tight`

### 2. Replace grid layout with circular image gallery carousel
- **New file:** `types/gsap.d.ts` — Window type declarations for GSAP CDN
- **New file:** `app/components/ui/carousel-circular-image-gallery.tsx` — Parameterized carousel component
- **Modified file:** `app/components/experience-section.tsx` — Replace grid per year with carousel + active project

### Carousel Integration Design
- Each year group gets its own carousel
- Project thumbnails mapped to carousel images (thumbnail > first image > video thumbnail > placeholder)
- Project name shown below carousel with animated transitions
- Active project's ExperienceProject card shown below for expand/collapse media viewing
- GSAP loaded from CDN (handles deduplication across multiple carousel instances)
