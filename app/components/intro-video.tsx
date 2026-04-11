"use client";

import { motion } from "framer-motion";
import SectionHeading from "./section-heading";
import VideoEmbed from "./video-embed";
import { introVideo } from "@/data/intro-video";

export default function IntroVideo() {
  return (
    <section id="intro" className="py-20 md:py-32 px-6 md:px-8">
      <div className="max-w-4xl mx-auto">
        <SectionHeading title="Introduction" id="intro-heading" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <VideoEmbed fileId={introVideo.fileId} />

          {/* Decorative gradient overlays on left/right edges */}
          <div
            className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-24"
            style={{
              background:
                "linear-gradient(to right, rgb(10, 11, 16), transparent)",
            }}
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-24"
            style={{
              background:
                "linear-gradient(to left, rgb(10, 11, 16), transparent)",
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}
