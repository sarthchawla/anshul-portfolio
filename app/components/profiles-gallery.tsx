"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "./section-heading";
import GalleryGrid from "./gallery-grid";
import MediaCard from "./media-card";
import LightboxWrapper from "./lightbox-wrapper";
import { profilePhotos, PROFILE_PLACEHOLDER_URLS } from "@/data/profiles";
import { gdriveImage } from "@/lib/google-drive";

const physicalStats = [
  { label: "Height", value: "167 cm" },
  { label: "Age", value: "25" },
  { label: "Hair", value: "Black" },
  { label: "Eyes", value: "Dark Brown" },
];

export default function ProfilesGallery() {
  const [lightbox, setLightbox] = useState<{ open: boolean; index: number }>({
    open: false,
    index: 0,
  });

  // TODO: Replace placeholder logic with gdriveImage() when real photos are uploaded
  const imageUrls = profilePhotos.map((photo, index) => {
    if (photo.id.startsWith("placeholder-")) {
      return PROFILE_PLACEHOLDER_URLS[index] ?? PROFILE_PLACEHOLDER_URLS[0];
    }
    return gdriveImage(photo.id);
  });

  const slides = imageUrls.map((src) => ({ src }));

  return (
    <section id="profiles" className="py-20 md:py-32 px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title="Profiles"
          subtitle="Professional headshots & portraits"
          id="profiles-heading"
        />

        <GalleryGrid columns={{ default: 3, 768: 2, 480: 1 }}>
          {profilePhotos.map((photo, index) => (
            <MediaCard
              key={photo.id}
              src={imageUrls[index]}
              alt={photo.alt}
              onClick={() => setLightbox({ open: true, index })}
            />
          ))}
        </GalleryGrid>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mt-12 mx-auto max-w-2xl"
        >
          <div className="bg-zinc-900/50 backdrop-blur-sm rounded-xl border border-white/5 p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x divide-white/5">
              {physicalStats.map((stat) => (
                <div key={stat.label} className="flex flex-col items-center text-center px-4">
                  <span className="text-xs uppercase tracking-wider text-zinc-500 mb-1">
                    {stat.label}
                  </span>
                  <span className="text-lg font-semibold text-white">
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <LightboxWrapper
          open={lightbox.open}
          index={lightbox.index}
          slides={slides}
          onClose={() => setLightbox({ open: false, index: 0 })}
        />
      </div>
    </section>
  );
}
