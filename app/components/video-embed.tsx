"use client";

import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { downloadMedia } from "@/lib/download";
import { gdriveImage } from "@/lib/google-drive";

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

/**
 * Extracts a Google Drive file ID from a preview/embed URL.
 * e.g. "https://drive.google.com/file/d/ABC123/preview" → "ABC123"
 */
function extractFileId(url: string): string | null {
  const match = url.match(/\/file\/d\/([^/]+)/);
  return match?.[1] ?? null;
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

  // Resolve the file ID for the download button
  const resolvedFileId = fileId ?? (directSrc ? extractFileId(directSrc) : null);
  const downloadUrl = resolvedFileId ? gdriveImage(resolvedFileId) : null;

  return (
    <motion.div
      className="group/video relative overflow-hidden rounded-xl border border-accent-400/20"
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

      {/* Download button — top-right to avoid overlapping video player controls */}
      {downloadUrl && (
        <button
          onClick={() => downloadMedia(downloadUrl, title)}
          aria-label={`Download ${title ?? "video"}`}
          className="absolute top-3 left-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 backdrop-blur-sm border border-white/10 text-white/70 opacity-0 -translate-y-2 transition-all duration-200 cursor-pointer group-hover/video:opacity-100 group-hover/video:translate-y-0 hover:!bg-accent-400/80 hover:!text-white hover:!border-accent-400/40"
        >
          <Download size={16} strokeWidth={2} />
        </button>
      )}
    </motion.div>
  );
}
