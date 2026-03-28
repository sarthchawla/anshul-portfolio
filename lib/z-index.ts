/**
 * Centralized z-index layer map.
 * Higher number = closer to the viewer.
 *
 * Usage:
 *   import { Z } from '@/lib/z-index';
 *   className={`z-[${Z.NAVBAR}]`}       // Tailwind arbitrary value
 *   style={{ zIndex: Z.MODAL_BACKDROP }} // inline style
 */
export const Z = {
  /** Page background (beams, gradients) */
  BACKGROUND: 0,

  /** Main page content sitting above the background */
  PAGE_CONTENT: 10,

  /** Hero fade overlay */
  HERO_FADE: 5,

  /** Navbar (sticky/fixed header) */
  NAVBAR: 40,

  /** Mobile nav overlay */
  NAVBAR_MOBILE_MENU: 45,

  /** Gallery modal backdrop + content */
  MODAL_BACKDROP: 60,

  /** Controls layered on top of the modal (close btn, arrows) */
  MODAL_CONTROLS: 65,

  /** Thumbnail dock inside gallery modal */
  MODAL_DOCK: 70,

  /** Carousel overlay (pointer-events-none gradient masks) */
  CAROUSEL_OVERLAY: 100,
} as const;
