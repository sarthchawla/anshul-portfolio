"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "./section-heading";
import ExperienceProject from "./experience-project";
import { experiences, experiencePlaceholderImages } from "@/data/experience";
import {
  ImageGallery,
  type CarouselImageData,
} from "./ui/carousel-circular-image-gallery";
import { gdriveImage, gdriveThumbnail } from "@/lib/google-drive";
import type { Project, YearExperience } from "@/data/types";

function getProjectThumbnailUrl(project: Project): string {
  if (project.thumbnail) return project.thumbnail;
  const firstImage = project.media.find((m) => m.type === "image");
  if (firstImage) {
    if (firstImage.id.startsWith("placeholder")) {
      return experiencePlaceholderImages[0];
    }
    return gdriveImage(firstImage.id);
  }
  const firstVideo = project.media.find((m) => m.type === "video");
  if (firstVideo) return gdriveThumbnail(firstVideo.id, 600);
  return experiencePlaceholderImages[0];
}

function YearCarousel({ yearGroup }: { yearGroup: YearExperience }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const carouselImages: CarouselImageData[] = yearGroup.projects.map((p) => ({
    title: p.name,
    url: getProjectThumbnailUrl(p),
  }));

  const activeProject = yearGroup.projects[activeIndex];

  const handleSlideChange = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  return (
    <div className="mb-20 last:mb-0">
      {/* Watermark-style year heading */}
      <motion.h3
        initial={{ opacity: 0, x: -80 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="font-serif text-6xl md:text-8xl font-bold text-zinc-600/70 mb-8 select-none"
      >
        {yearGroup.year}
      </motion.h3>

      {/* Circular image gallery carousel */}
      <ImageGallery
        images={carouselImages}
        onSlideChange={handleSlideChange}
      />

      {/* Active project title */}
      <div className="text-center mt-2 mb-6">
        <AnimatePresence mode="wait">
          <motion.h4
            key={activeProject.slug}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="font-sans text-xl md:text-2xl font-semibold text-white"
          >
            {activeProject.name}
          </motion.h4>
        </AnimatePresence>
      </div>

      {/* Active project expandable details */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeProject.slug}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mx-auto"
        >
          <ExperienceProject project={activeProject} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-20 md:py-32 px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeading title="Past Acting Experience" id="experience-heading" />

        {experiences.map((yearGroup) => (
          <YearCarousel key={yearGroup.year} yearGroup={yearGroup} />
        ))}
      </div>
    </section>
  );
}
