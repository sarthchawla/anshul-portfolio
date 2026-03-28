# Beams Background & Theme Integration Plan

## Overview
Integrate the `BeamsBackground` component and shift the site's accent palette from **gold (#D4AF37)** to a **sky-blue/cyan** palette that harmonizes with the beams' blue-cyan light effect (HSL 190-260).

## Design Direction
The beams create a cinematic, luminous blue-light effect against a dark canvas. The portfolio theme should embrace this aesthetic:
- **Primary accent**: Sky-blue (#38BDF8 / sky-400) - interactive elements, highlights
- **Glow/Secondary**: Cyan (#22D3EE / cyan-400) - softer accents, hover states
- **Backgrounds**: Keep dark surfaces (#0F1117, #181B25, #1E2130) - already complement the beams
- **Text**: White + zinc grays (unchanged)
- **Hero**: Replace radial gold gradients with BeamsBackground component

## Color Palette (replacing gold)
```
accent-50:  #F0F9FF (sky-50)
accent-100: #E0F2FE (sky-100)
accent-200: #BAE6FD (sky-200)
accent-300: #7DD3FC (sky-300)
accent-400: #38BDF8 (sky-400)  ← PRIMARY
accent-500: #0EA5E9 (sky-500)
accent-600: #0284C7 (sky-600)
accent-700: #0369A1 (sky-700)
accent-800: #075985 (sky-800)
accent-900: #0C4A6E (sky-900)
accent-950: #082F49 (sky-950)
DEFAULT:    #38BDF8
glow:       rgba(56, 189, 248, 0.15)
```

## Phase 1: Foundation (Sequential)
1. [x] Install `motion` package
2. [ ] Create `app/components/ui/beams-background.tsx`
3. [ ] Update `tailwind.config.js` - rename gold → accent with new sky-blue palette
4. [ ] Update `global.css` - gradient-text, selection, focus-visible, utilities

## Phase 2: Components (Parallel Agents)
### Agent 1: Hero + Particles
- `app/components/hero.tsx` - Replace gold radial gradients with BeamsBackground, update accent classes
- `app/components/particles.tsx` - Change particle color from gold to cyan/sky

### Agent 2: Navigation + Structure
- `app/components/ui/header-2.tsx` - gold-500 active state → accent-400
- `app/components/section-heading.tsx` - gold-500 underline → accent-400
- `app/components/footer.tsx` - gold hover states → accent-400

### Agent 3: Content Sections
- `app/components/contact-section.tsx` - gold accents, form borders, button → accent palette
- `app/components/experience-section.tsx` - any gold references
- `app/components/photo-shoots.tsx` - tab indicator gold → accent
- `app/components/profiles-gallery.tsx` - any gold references

## Phase 3: Verification
- Build check (`pnpm build`)
- Visual review

## Key Principles
- Maintain the cinematic dark aesthetic
- Blue beams = hero spotlight; sections use subtle accent highlights
- Keep the same animation patterns and layout structure
- Only change color-related classes, not layout or animation logic
