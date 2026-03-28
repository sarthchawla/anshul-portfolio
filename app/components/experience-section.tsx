"use client";

import { motion } from "framer-motion";
import SectionHeading from "./section-heading";
import ExperienceProject from "./experience-project";
import { experiences } from "@/data/experience";

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-20 md:py-32 px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeading title="Past Acting Experience" id="experience-heading" />

        {experiences.map((yearGroup) => (
          <div key={yearGroup.year} className="mb-20 last:mb-0">
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

            {/* Project cards grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              {yearGroup.projects.map((project, index) => (
                <ExperienceProject
                  key={project.slug}
                  project={project}
                  delay={index * 0.1}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
