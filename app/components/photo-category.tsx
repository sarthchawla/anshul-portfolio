"use client";

import { useState } from "react";
import type { PhotoShootCategory } from "@/data/types";
import { gdriveImage } from "@/lib/google-drive";
import GalleryGrid from "./gallery-grid";
import MediaCard from "./media-card";
import LightboxWrapper from "./lightbox-wrapper";

interface PhotoCategoryProps {
  category: PhotoShootCategory;
}

export default function PhotoCategory({ category }: PhotoCategoryProps) {
  const [lightbox, setLightbox] = useState({ open: false, index: 0 });

  const photos = category.photos;
  const photoUrls = photos.map((photo) => gdriveImage(photo.id));

  const lightboxSlides = photos.map((photo, i) => ({
    src: photoUrls[i],
    alt: photo.alt,
  }));

  return (
    <>
      <GalleryGrid columns={{ default: 5, 1024: 4, 768: 3, 480: 2 }}>
        {photos.map((photo, i) => (
          <div key={photo.id} className="mb-4">
            <MediaCard
              src={photoUrls[i]}
              alt={photo.alt}
              delay={i * 0.04}
              onClick={() => setLightbox({ open: true, index: i })}
            />
          </div>
        ))}
      </GalleryGrid>

      <LightboxWrapper
        open={lightbox.open}
        index={lightbox.index}
        slides={lightboxSlides}
        onClose={() => setLightbox({ open: false, index: 0 })}
      />
    </>
  );
}
