"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface ContactLink {
  icon: React.ReactNode;
  label: string;
  href: string;
  external?: boolean;
}

interface MinimalistHeroProps {
  imageSrc: string;
  imageAlt: string;
  overlayText: string;
  contactLinks: ContactLink[];
  className?: string;
}

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export const MinimalistHero = ({
  imageSrc,
  imageAlt,
  overlayText,
  contactLinks,
  className,
}: MinimalistHeroProps) => {
  return (
    <div
      className={cn(
        "relative flex min-h-dvh w-full flex-col items-center justify-between overflow-hidden px-8 pb-8 pt-4 font-sans md:px-12 md:pb-12 md:pt-4",
        className
      )}
    >
      {/* ── Center: Image + Circle (absolute, full viewport) ── */}
      <div className="pointer-events-none absolute inset-0 flex items-end justify-center md:items-center">
        {/* Glow */}
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.18 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="absolute top-[18%] z-0 h-[44vmin] w-[44vmin] rounded-full bg-accent-400 blur-3xl md:top-[12%]"
        />
        {/* Accent circle — positioned behind upper body */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="absolute top-[15%] z-0 h-[36vmin] w-[36vmin] rounded-full bg-gradient-to-br from-accent-500/90 via-accent-400/80 to-accent-300/70 md:top-[10%] md:h-[42vmin] md:w-[42vmin]"
        />
        {/* Portrait image */}
        <motion.img
          src={imageSrc}
          alt={imageAlt}
          className="relative z-10 h-[65vh] w-auto max-w-[55vw] object-cover object-top md:h-[75vh] md:max-w-[40vw]"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src =
              "https://placehold.co/400x600/0EA5E9/ffffff?text=Image+Not+Found";
          }}
        />
      </div>

      {/* Spacer */}
      <div />

      {/* ── Content layer (left contacts + right overlay name) ── */}
      <div className="relative z-20 flex w-full max-w-7xl flex-grow items-center justify-between">
        {/* Left: Contact links (matching contact section style) */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1, delayChildren: 0.8 },
            },
          }}
          className="hidden space-y-4 md:block"
        >
          {contactLinks.map((link, index) => (
            <motion.div key={index} variants={fadeUpVariants}>
              <a
                href={link.href}
                {...(link.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="flex items-center gap-3 text-zinc-400 transition-colors hover:text-accent-400 group"
              >
                <span className="text-accent-400/70 group-hover:text-accent-400">
                  {link.icon}
                </span>
                <span className="font-sans text-sm">{link.label}</span>
              </a>
            </motion.div>
          ))}
        </motion.div>

        {/* Right: Large overlay name — single line */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
          className="ml-auto"
        >
          <h1
            className="font-serif font-extrabold uppercase text-white whitespace-nowrap"
            style={{
              fontSize: "clamp(3rem, 8vw, 8rem)",
              lineHeight: 0.9,
              letterSpacing: "0.02em",
            }}
          >
            {overlayText}
          </h1>
        </motion.div>
      </div>

      {/* Mobile: contact links */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="z-20 flex flex-col gap-3 md:hidden"
      >
        {contactLinks.map((link, index) => (
          <a
            key={index}
            href={link.href}
            {...(link.external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            className="flex items-center gap-3 text-zinc-400 transition-colors hover:text-accent-400 group"
          >
            <span className="text-accent-400/70 group-hover:text-accent-400">
              {link.icon}
            </span>
            <span className="font-sans text-sm">{link.label}</span>
          </a>
        ))}
      </motion.div>
    </div>
  );
};
