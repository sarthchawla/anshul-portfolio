"use client";

import { useRef, useMemo } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";

import { cn } from "@/lib/utils";
import { photoShootCategories } from "@/data/photo-shoots";
import { gdriveImage } from "@/lib/google-drive";
import { shuffle } from "@/lib/shuffle";
import ScrollIndicator from "./scroll-indicator";
import { WhatsAppIcon, InstagramIcon } from "./icons";

/* ------------------------------------------------------------------ */
/*  Marquee images                                                     */
/* ------------------------------------------------------------------ */

const ethnicwearCategory = photoShootCategories.find(
  (c) => c.slug === "indian-ethnicwear"
);

const marqueeImages: string[] = ethnicwearCategory
  ? ethnicwearCategory.photos.map((p) => gdriveImage(p.id))
  : [];

/* ------------------------------------------------------------------ */
/*  Framer Motion variants                                            */
/* ------------------------------------------------------------------ */

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.35,
      delayChildren: 0,
    },
  },
};

const titleVariants: Variants = {
  hidden: {
    opacity: 0,
    letterSpacing: "0.05em",
    y: 30,
  },
  visible: {
    opacity: 1,
    letterSpacing: "0.15em",
    y: 0,
    transition: {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
      delay: 0.3,
    },
  },
};

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const scrollIndicatorVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, delay: 1.8 },
  },
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  /* Parallax: fade-out and translate as user scrolls past the hero */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.8], [0, 120]);

  /* Shuffle and duplicate images for seamless infinite scroll */
  const duplicatedImages = useMemo(() => {
    const shuffled = shuffle(marqueeImages);
    return [...shuffled, ...shuffled];
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-surface-base"
    >
      {/* --- Radial spotlight background (z-0) --- */}
      {/* Primary gold glow -- animated pulse */}
      <motion.div
        animate={{ scale: [1, 1.05, 1], opacity: [0.15, 0.2, 0.15] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.15)_0%,transparent_70%)]"
      />
      {/* Secondary glow -- slightly offset for depth */}
      <div className="absolute inset-0 z-0 translate-y-[5%] bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.08)_0%,transparent_50%)]" />
      {/* Subtle ambient warmth at the top */}
      <div className="absolute inset-x-0 top-0 z-0 h-1/3 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.04)_0%,transparent_80%)]" />

      {/* --- Content --- */}
      <motion.div
        className="relative z-10 px-6 text-center"
        style={{ opacity: heroOpacity, y: heroY }}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-6"
        >
          {/* Name */}
          <motion.h1
            variants={titleVariants}
            className="font-serif font-semibold uppercase tracking-widest text-white"
            style={{ fontSize: "clamp(3rem, 10vw, 9rem)" }}
          >
            Anshul Chugh
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeUpVariants}
            className="-mt-4 font-serif text-xl italic text-zinc-400 md:text-2xl"
          >
            Actress &nbsp;&amp;&nbsp; Model
          </motion.p>

          {/* Contact links */}
          <motion.div
            variants={fadeUpVariants}
            className="mt-2 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-sans text-sm text-zinc-500"
          >
            <a
              href="mailto:anshulchugh.work@gmail.com"
              className="transition-colors hover:text-gold-500"
            >
              anshulchugh.work@gmail.com
            </a>
            <a
              href="https://wa.me/6581711361"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 transition-colors hover:text-gold-500"
            >
              <WhatsAppIcon size={16} />
              +65 8171-1361
            </a>
            <a
              href="https://www.instagram.com/an.shul_"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 transition-colors hover:text-gold-500"
            >
              <InstagramIcon size={16} />
              @an.shul_
            </a>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div variants={scrollIndicatorVariants} className="mt-10">
            <ScrollIndicator />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* --- Animated image marquee at bottom --- */}
      {duplicatedImages.length > 0 && (
        <div
          className={cn(
            "absolute bottom-0 left-0 z-[5] h-1/3 w-full md:h-2/5",
            "[mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]"
          )}
        >
          <motion.div
            className="flex gap-4"
            animate={{
              x: ["-50%", "0%"],
              transition: {
                ease: "linear",
                duration: 40,
                repeat: Infinity,
              },
            }}
          >
            {duplicatedImages.map((src, index) => (
              <div
                key={index}
                className="relative aspect-[3/4] h-48 flex-shrink-0 md:h-64"
                style={{
                  rotate: `${index % 2 === 0 ? -2 : 5}deg`,
                }}
              >
                <img
                  src={src}
                  alt={`Showcase ${(index % marqueeImages.length) + 1}`}
                  className="h-full w-full rounded-2xl object-cover shadow-md"
                  loading="lazy"
                />
              </div>
            ))}
          </motion.div>
        </div>
      )}
    </section>
  );
}
