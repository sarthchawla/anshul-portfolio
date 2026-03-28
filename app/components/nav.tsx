"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const NAV_LINKS = [
  { label: "Profiles", href: "#profiles" },
  { label: "Introduction", href: "#intro" },
  { label: "Experience", href: "#experience" },
  { label: "Photo Shoots", href: "#photoshoots" },
  { label: "Contact", href: "#contact" },
] as const;

const SCROLL_THRESHOLD = 50;

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  /* Track scroll position to toggle navbar background */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    handleScroll(); // initialise on mount
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Track which section is currently in view */
  useEffect(() => {
    const sectionIds = NAV_LINKS.map(({ href }) => href.slice(1));
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        }
      },
      { rootMargin: "-30% 0px -70% 0px" }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  /* Lock body scroll when mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  return (
    <nav
      className={`fixed left-0 top-0 z-50 w-full transition-colors duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-surface-base/80 backdrop-blur-lg"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* ---- Brand ---- */}
        <a
          href="#hero"
          className="font-serif text-sm uppercase tracking-widest text-white transition-colors hover:text-gold-500"
        >
          Anshul Chugh
        </a>

        {/* ---- Desktop links (md+) ---- */}
        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                className={`font-sans text-sm uppercase tracking-wider transition-colors hover:text-gold-500 ${
                  activeSection === href ? "text-gold-500" : "text-zinc-400"
                }`}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* ---- Mobile hamburger (below md) ---- */}
        <button
          type="button"
          aria-label="Open menu"
          className="text-zinc-300 transition-colors hover:text-white md:hidden"
          onClick={() => setMobileOpen(true)}
        >
          <Menu size={24} />
        </button>
      </div>

      {/* ---- Mobile overlay ---- */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-surface-base/95 backdrop-blur-xl"
          >
            {/* Close button */}
            <button
              type="button"
              aria-label="Close menu"
              className="absolute right-6 top-5 text-zinc-300 transition-colors hover:text-white"
              onClick={closeMobile}
            >
              <X size={28} />
            </button>

            {/* Links */}
            <ul className="flex flex-col items-center gap-8">
              {NAV_LINKS.map(({ label, href }, i) => (
                <motion.li
                  key={href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ delay: 0.05 * i, duration: 0.3 }}
                >
                  <a
                    href={href}
                    onClick={closeMobile}
                    className={`font-sans text-lg uppercase tracking-wider transition-colors hover:text-gold-500 ${
                      activeSection === href ? "text-gold-500" : "text-zinc-300"
                    }`}
                  >
                    {label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
