"use client";

import { useMemo, useState } from "react";
import type { PhotoShootCategory } from "@/data/types";
import { gdriveImage } from "@/lib/google-drive";
import { shuffle } from "@/lib/shuffle";
import { photoshootPlaceholders } from "@/data/photo-shoots";
import GalleryGrid from "./gallery-grid";
import MediaCard from "./media-card";
import LightboxWrapper from "./lightbox-wrapper";

interface PhotoCategoryProps {
  category: PhotoShootCategory;
}

/**
 * Maps placeholder IDs to the correct Unsplash URL array based on category slug.
 */
const placeholderMap: Record<string, string[]> = {
  photoshoot: photoshootPlaceholders,
};

/**
 * Returns the image URL for a photo.
 * Uses Google Drive for real IDs, Unsplash placeholders for placeholder IDs.
 */
function getPhotoUrl(id: string, index: number, categorySlug: string): string {
  if (id.startsWith("placeholder")) {
    // TODO: Replace placeholder logic with gdriveImage() when real photos are uploaded
    const placeholders = placeholderMap[categorySlug] ?? [];
    return placeholders[index % placeholders.length] ?? "";
  }
  return gdriveImage(id);
}

export default function PhotoCategory({ category }: PhotoCategoryProps) {
  // Shuffle photos once per category mount
  const shuffledPhotos = useMemo(
    () => shuffle(category.photos),
    [category.slug]
  );

  const [lightbox, setLightbox] = useState({ open: false, index: 0 });

  // Build image URLs and lightbox slides
  const photoUrls = shuffledPhotos.map((photo, i) =>
    getPhotoUrl(photo.id, i, category.slug)
  );

  const lightboxSlides = shuffledPhotos.map((photo, i) => ({
    src: photoUrls[i],
    alt: photo.alt,
  }));

  return (
    <>
      <GalleryGrid columns={{ default: 3, 768: 2, 480: 1 }}>
        {shuffledPhotos.map((photo, i) => (
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
