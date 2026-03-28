# Experience Section Revamp — Interactive Bento Gallery

## Goal
Replace the current "Past Acting Experience" section (carousel + expandable cards) with the InteractiveBentoGallery component for a more visual, interactive showcase.

## Data Mapping
Each bento item = one project folder. Title = project name, Desc = year. Sorted newest first.

| # | Title | Year | Media Source | Type |
|---|-------|------|-------------|------|
| 1 | Sentosa Brand Library Photoshoot | 2025 | gdriveImage(1Evnk38mKOD2DicpcJefU-BMZQQXhAlyx) | image |
| 2 | Celebrating Fathers 2025 | 2025 | gdriveThumbnail(1oxD3GEwtPu1N5OKEaSOhE8avlQN-qKQT) | image (video thumb) |
| 3 | IMDA Smart Nation Photoshoot | 2025 | gdriveImage(1wUUL-j3I2kFJhTmxXOlwc2S27XSr5rF8) | image |
| 4 | URA Draft Master Plan 2025 | 2025 | /images/ura-thumb.png | image (custom thumb) |
| 5 | POSB Print & Video Shoot | 2024 | gdriveImage(1pKXM8LrU9-9g7tlZRlPRDEzkyaIST_6w) | image |

- OnePA skipped (placeholder only, no real content)
- "Full Video" items excluded per user request
- Videos shown as thumbnails since Google Drive videos can't play in `<video>` tags

## Implementation Steps

1. **Create component**: `app/components/ui/interactive-bento-gallery.tsx`
   - Copy provided component code
   - Adapt colors for dark theme (surface-base/card, white text, sky accent)

2. **Rewrite experience section**: `app/components/experience-section.tsx`
   - Replace carousel/expandable cards with InteractiveBentoGallery
   - Build mediaItems array from existing Google Drive IDs
   - Keep SectionHeading for consistency

3. **No new dependencies** — framer-motion and lucide-react already installed

## Theme Adaptations
- Modal background: `bg-surface-card/50` instead of `bg-gray-50/50`
- Text: use `text-white` / `text-zinc-400` (always dark mode)
- Dock: `bg-sky-400/20` already matches sky-blue accent
- Close button: `bg-white/10` instead of `bg-gray-200/80`
