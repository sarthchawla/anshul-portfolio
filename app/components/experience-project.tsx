"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { Project } from "@/data/types";
import { gdriveImage, gdriveThumbnail, gdriveVideoEmbed } from "@/lib/google-drive";
import { experiencePlaceholderImages } from "@/data/experience";
import VideoEmbed from "./video-embed";
import MediaCard from "./media-card";
import LightboxWrapper from "./lightbox-wrapper";

interface ExperienceProjectProps {
  project: Project;
  delay?: number;
}

/**
 * Returns the image URL for a media item.
 * Uses Google Drive for real IDs, Unsplash placeholders for placeholder IDs.
 */
function getImageUrl(id: string, index: number): string {
  if (id.startsWith("placeholder")) {
    // TODO: Replace placeholder image URLs with gdriveImage() when real content is uploaded
    return experiencePlaceholderImages[index % experiencePlaceholderImages.length];
  }
  return gdriveImage(id);
}

/**
 * Returns a thumbnail URL for a media item (used in collapsed card preview).
 */
function getThumbnailUrl(id: string, index: number): string {
  if (id.startsWith("placeholder")) {
    return experiencePlaceholderImages[index % experiencePlaceholderImages.length];
  }
  return gdriveThumbnail(id, 400);
}

export default function ExperienceProject({
  project,
  delay = 0,
}: ExperienceProjectProps) {
  const [expanded, setExpanded] = useState(false);
  const [lightbox, setLightbox] = useState({ open: false, index: 0 });
  const [showFullVideo, setShowFullVideo] = useState(false);

  const images = project.media.filter((m) => m.type === "image");
  const videos = project.media.filter((m) => m.type === "video");
  const firstImage = images[0];

  // For thumbnail: use custom thumbnail if provided, then first image, then first video thumbnail
  const thumbnailSrc = project.thumbnail
    ? project.thumbnail
    : firstImage
      ? getThumbnailUrl(firstImage.id, 0)
      : videos.length > 0
        ? gdriveThumbnail(videos[0].id, 400)
        : null;
  const thumbnailAlt = firstImage
    ? firstImage.alt
    : videos.length > 0
      ? videos[0].alt
      : project.name;

  // Split videos: first is featured, rest are collapsible
  const featuredVideo = videos[0];
  const additionalVideos = videos.slice(1);

  // Check if the POSB special layout applies: vertical video + 2 images
  const isPOSBLayout =
    featuredVideo?.aspectRatio === "9/16" && images.length >= 2;

  // Build lightbox slides from all images
  const lightboxSlides = images.map((img, i) => ({
    src: getImageUrl(img.id, i),
    alt: img.alt,
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay }}
      className="bg-surface-card border border-white/5 rounded-xl overflow-hidden hover:border-gold-500/20 transition-colors duration-300"
    >
      {/* Collapsed header - always visible */}
      <button
        onClick={() => setExpanded((prev) => !prev)}
        className="w-full flex items-center gap-4 p-4 md:p-5 text-left cursor-pointer"
        aria-expanded={expanded}
        aria-controls={`project-${project.slug}`}
      >
        {/* Thumbnail preview */}
        {thumbnailSrc && (
          <div className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border border-white/5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={thumbnailSrc}
              alt={thumbnailAlt}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Project name and meta */}
        <div className="flex-1 min-w-0">
          <h4 className="font-sans text-xl font-semibold text-white truncate" title={project.name}>
            {project.name}
          </h4>
          <p className="font-sans text-sm text-zinc-500 mt-1">
            {images.length > 0 && `${images.length} photo${images.length !== 1 ? "s" : ""}`}
            {images.length > 0 && videos.length > 0 && " \u00B7 "}
            {videos.length > 0 && `${videos.length} video${videos.length !== 1 ? "s" : ""}`}
          </p>
        </div>

        {/* Expand chevron */}
        <motion.div
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0 text-zinc-500"
        >
          <ChevronDown size={20} />
        </motion.div>
      </button>

      {/* Expanded content */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            id={`project-${project.slug}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-5 md:px-5 md:pb-6 space-y-5">
              {/* POSB special layout: vertical video + second image side by side */}
              {isPOSBLayout ? (
                <>
                  {/* First image spans full width */}
                  {images.length > 0 && (
                    <div className="grid grid-cols-1 gap-3">
                      <MediaCard
                        src={getImageUrl(images[0].id, 0)}
                        alt={images[0].alt}
                        delay={0}
                        onClick={() => setLightbox({ open: true, index: 0 })}
                      />
                    </div>
                  )}

                  {/* Vertical video + second image side by side */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="w-full sm:w-1/3">
                      <VideoEmbed
                        src={gdriveVideoEmbed(featuredVideo.id)}
                        title={featuredVideo.alt}
                        aspectRatio={featuredVideo.aspectRatio}
                        delay={0.1}
                      />
                    </div>
                    <div className="w-full sm:w-2/3">
                      <MediaCard
                        src={getImageUrl(images[1].id, 1)}
                        alt={images[1].alt}
                        delay={0.15}
                        onClick={() => setLightbox({ open: true, index: 1 })}
                      />
                    </div>
                  </div>

                  {/* Remaining images after the second */}
                  {images.length > 2 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {images.slice(2).map((img, i) => (
                        <MediaCard
                          key={img.id}
                          src={getImageUrl(img.id, i + 2)}
                          alt={img.alt}
                          delay={(i + 2) * 0.04}
                          onClick={() => setLightbox({ open: true, index: i + 2 })}
                        />
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <>
                  {/* Image grid */}
                  {images.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {images.map((img, i) => (
                        <MediaCard
                          key={img.id}
                          src={getImageUrl(img.id, i)}
                          alt={img.alt}
                          delay={i * 0.04}
                          onClick={() => setLightbox({ open: true, index: i })}
                          className={
                            i === 0 && images.length > 1
                              ? "col-span-2 sm:col-span-3"
                              : undefined
                          }
                        />
                      ))}
                    </div>
                  )}

                  {/* Video embeds */}
                  {videos.length > 0 && (
                    <div className="space-y-4">
                      {/* Featured (first) video */}
                      {featuredVideo && (
                        <div
                          className={
                            featuredVideo.aspectRatio === "9/16"
                              ? "max-w-sm mx-auto"
                              : undefined
                          }
                        >
                          <VideoEmbed
                            src={gdriveVideoEmbed(featuredVideo.id)}
                            title={featuredVideo.alt}
                            aspectRatio={featuredVideo.aspectRatio}
                            delay={0}
                          />
                        </div>
                      )}

                      {/* Collapsible additional videos */}
                      {additionalVideos.length > 0 && (
                        <div>
                          <button
                            onClick={() => setShowFullVideo((prev) => !prev)}
                            className="flex items-center gap-2 text-sm text-zinc-400 hover:text-gold-400 transition-colors cursor-pointer"
                          >
                            <span>
                              {showFullVideo ? "Hide Full Video" : "Show Full Video"}
                            </span>
                            <motion.span
                              animate={{ rotate: showFullVideo ? 180 : 0 }}
                              transition={{ duration: 0.3 }}
                              className="inline-block"
                            >
                              ▾
                            </motion.span>
                          </button>

                          <AnimatePresence initial={false}>
                            {showFullVideo && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{
                                  duration: 0.4,
                                  ease: [0.16, 1, 0.3, 1],
                                }}
                                className="overflow-hidden"
                              >
                                <div className="space-y-4 pt-3">
                                  {additionalVideos.map((vid, i) => (
                                    <VideoEmbed
                                      key={vid.id}
                                      src={gdriveVideoEmbed(vid.id)}
                                      title={vid.alt}
                                      aspectRatio={vid.aspectRatio}
                                      delay={i * 0.1}
                                    />
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox for fullscreen image viewing */}
      <LightboxWrapper
        open={lightbox.open}
        index={lightbox.index}
        slides={lightboxSlides}
        onClose={() => setLightbox({ open: false, index: 0 })}
      />
    </motion.div>
  );
}
