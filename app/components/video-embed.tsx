"use client";

import { motion } from "framer-motion";

interface VideoEmbedProps {
  /** Google Drive file ID. Used to construct the embed URL. */
  fileId?: string;
  /** Direct iframe src URL. Takes precedence over fileId when provided. */
  src?: string;
  title?: string;
  aspectRatio?: string;
  delay?: number;
  isPlaceholder?: boolean;
  placeholderUrl?: string;
}

export default function VideoEmbed({
  fileId,
  src: directSrc,
  title,
  aspectRatio = "16/9",
  delay = 0,
  isPlaceholder = false,
  placeholderUrl,
}: VideoEmbedProps) {
  const src = directSrc
    ? directSrc
    : isPlaceholder && placeholderUrl
      ? placeholderUrl
      : `https://drive.google.com/file/d/${fileId}/preview`;

  return (
    <motion.div
      className="overflow-hidden rounded-xl border border-gold-500/20"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay }}
    >
      <div className="relative w-full" style={{ aspectRatio }}>
        <iframe
          src={src}
          title={title ?? "Video"}
          allow="autoplay; encrypted-media"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
          loading="lazy"
        />
      </div>
    </motion.div>
  );
}
