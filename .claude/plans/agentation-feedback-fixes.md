# Agentation Feedback Fixes (Session mnaka680-5ma6f0)

## Annotation 1: Mobile menu broken after scroll
**Issue:** The mobile nav menu doesn't show properly after scrolling down.
**Root cause:** The mobile overlay is inside the `<nav>` element which has `fixed` + `z-50`. The overlay also uses `fixed inset-0 z-50`. After scrolling, the nav's `backdrop-blur-lg` and `bg-surface-base/80` may interfere with the overlay rendering, and the overlay z-index may not be high enough relative to page content.
**Fix:** Increase the mobile overlay z-index (e.g., `z-[100]`) so it sits clearly above all other content. Ensure the overlay fully covers the viewport regardless of scroll.

## Annotation 2: "ANSHUL CHUGH" must stay single line on non-mobile
**Issue:** On tablet/medium screens, the hero `h1` (using `clamp(3rem, 10vw, 9rem)`) wraps to two lines.
**Fix:** Add `md:whitespace-nowrap` to the h1 so it never wraps on screens >= md breakpoint. Mobile can still wrap naturally.

## Annotation 3: Change URA project title + add tooltip
**Issue:** Title shows "URA: Honouring the Past, Forging the Future" but user wants full title: "Urban Redevelopment Authority: Honouring the past, forging the future | Draft Master Plan 2025" with ellipsis truncation and tooltip on hover.
**Fix:**
- Update the title in `data/experience.ts`
- The `experience-project.tsx` already has `truncate` on the h4, so ellipsis is handled
- Add a `title` attribute to the h4 for native tooltip on hover

## Annotations 4-5: URA image is wrong
**Issue:** User says the URA thumbnail and expanded image are incorrect, references "Image #1".
**Status:** BLOCKED - Need user to clarify which image "Image #1" refers to (no image was attached in the annotation). Will ask user.
