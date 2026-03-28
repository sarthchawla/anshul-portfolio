"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SectionHeading from "./section-heading";
import PhotoCategory from "./photo-category";
import { photoShootCategories } from "@/data/photo-shoots";

export default function PhotoShoots() {
  const [activeSlug, setActiveSlug] = useState(photoShootCategories[0].slug);

  const activeCategory = photoShootCategories.find(
    (cat) => cat.slug === activeSlug
  );

  return (
    <section id="photoshoots" className="py-20 md:py-32 px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeading title="Personal Photo Shoots" id="photoshoots-heading" />

        {/* Tab bar */}
        <div className="flex gap-8 overflow-x-auto pb-4 mb-10 scrollbar-hide">
          {photoShootCategories.map((category) => (
            <button
              key={category.slug}
              onClick={() => setActiveSlug(category.slug)}
              className="relative flex-shrink-0 pb-3 font-sans text-sm uppercase tracking-wider transition-colors duration-200 cursor-pointer"
              aria-selected={activeSlug === category.slug}
              role="tab"
            >
              <span
                className={
                  activeSlug === category.slug
                    ? "text-accent-400"
                    : "text-zinc-500 hover:text-zinc-300"
                }
              >
                {category.name}
              </span>

              {/* Active tab accent underline indicator with sliding animation */}
              {activeSlug === category.slug && (
                <motion.div
                  layoutId="tab-indicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-400"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Category content with enter/exit animations */}
        <AnimatePresence mode="wait">
          {activeCategory && (
            <motion.div
              key={activeSlug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{
                duration: 0.35,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <PhotoCategory category={activeCategory} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
