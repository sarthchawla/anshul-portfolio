"use client";

import React from "react";
import Image from "next/image";
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
        "relative flex min-h-dvh w-full flex-col overflow-hidden font-sans",
        className
      )}
    >
      {/* ═══════════════════════════════════════════════════════
          DESKTOP LAYOUT
          ═══════════════════════════════════════════════════════ */}
      <div className="hidden md:flex md:min-h-dvh md:flex-col md:items-center md:justify-between md:p-12">
        {/* Center: Image + Circle (absolute) */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          {/* Glow */}
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.18 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="absolute top-[12%] z-0 h-[44vmin] w-[44vmin] rounded-full bg-white blur-3xl"
          />
          {/* Accent circle */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="absolute top-[10%] z-0 h-[42vmin] w-[42vmin] rounded-full"
            style={{ background: "radial-gradient(circle, #FFFFFF 0%, #FFFFFF 30%, rgba(255,255,255,0.6) 60%, rgba(255,255,255,0.2) 80%, transparent 100%)" }}
          />
          {/* Portrait */}
          <motion.div
            className="relative z-10 h-[75vh] aspect-[3/4] max-w-[40vw]"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
          >
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              priority
              sizes="(max-width: 768px) 85vw, 40vw"
              className="object-cover object-top"
            />
          </motion.div>
        </div>

        {/* Spacer for top */}
        <div />

        {/* Content layer: left contacts + right name */}
        <div className="relative z-20 flex w-full max-w-7xl flex-grow items-center justify-between">
          {/* Left: Contact links */}
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
            className="space-y-4"
          >
            {contactLinks.map((link, index) => (
              <motion.div key={index} variants={fadeUpVariants}>
                <a
                  href={link.href}
                  {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="flex items-center gap-3 text-zinc-400 transition-colors hover:text-accent-400 group"
                >
                  <span className="text-accent-400/70 group-hover:text-accent-400">{link.icon}</span>
                  <span className="font-sans text-sm">{link.label}</span>
                </a>
              </motion.div>
            ))}
          </motion.div>

          {/* Right: Large overlay name */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
            className="ml-auto"
          >
            <h1
              className="font-serif font-extrabold uppercase text-white whitespace-nowrap"
              style={{ fontSize: "clamp(3rem, 8vw, 8rem)", lineHeight: 0.9, letterSpacing: "0.02em" }}
            >
              {overlayText}
            </h1>
          </motion.div>
        </div>

        {/* Spacer for bottom */}
        <div />
      </div>

      {/* ═══════════════════════════════════════════════════════
          MOBILE LAYOUT — stacked, matching reference
          ═══════════════════════════════════════════════════════ */}
      <div className="flex h-dvh flex-col md:hidden">
        {/* Top: Image with circle behind — fills upper portion */}
        <div className="relative flex items-start justify-center overflow-hidden" style={{ height: "60dvh" }}>
          {/* Glow */}
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.18 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="absolute top-[8%] z-0 h-[70vw] w-[70vw] rounded-full bg-white blur-3xl"
          />
          {/* Accent circle */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="absolute top-[5%] z-0 h-[65vw] w-[65vw] rounded-full"
            style={{ background: "radial-gradient(circle, #FFFFFF 0%, #FFFFFF 30%, rgba(255,255,255,0.6) 60%, rgba(255,255,255,0.2) 80%, transparent 100%)" }}
          />
          {/* Portrait image — large, filling top */}
          <motion.div
            className="relative z-10 mt-4 h-auto w-[85vw] max-w-none aspect-[3/4]"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
          >
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              priority
              sizes="(max-width: 768px) 85vw, 40vw"
              className="object-cover object-top"
            />
          </motion.div>
        </div>

        {/* Bottom: Name + contacts stacked */}
        <div className="relative z-20 flex flex-col items-center gap-4 px-6 pb-6 pt-2">
          {/* Large name */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
            className="font-serif font-extrabold uppercase text-white text-center"
            style={{ fontSize: "clamp(3.5rem, 18vw, 6rem)", lineHeight: 0.9, letterSpacing: "0.02em" }}
          >
            {overlayText}
          </motion.h1>

          {/* Contact links row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            {contactLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="flex items-center gap-2 text-zinc-400 transition-colors hover:text-accent-400 group"
              >
                <span className="text-accent-400/70 group-hover:text-accent-400">{link.icon}</span>
                <span className="font-sans text-xs">{link.label}</span>
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};
