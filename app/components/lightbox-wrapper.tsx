"use client";

import Lightbox, { useLightboxState } from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Download } from "lucide-react";
import { downloadMedia } from "@/lib/download";

interface LightboxWrapperProps {
  open: boolean;
  index: number;
  slides: { src: string; alt?: string }[];
  onClose: () => void;
}

function DownloadButton() {
  const { currentSlide } = useLightboxState();
  if (!currentSlide || !("src" in currentSlide)) return null;

  return (
    <button
      onClick={() =>
        downloadMedia(
          currentSlide.src,
          (currentSlide as { alt?: string }).alt
        )
      }
      aria-label="Download"
      className="absolute top-3 left-3 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 backdrop-blur-sm border border-white/10 text-white/70 cursor-pointer hover:bg-accent-400/80 hover:text-white hover:border-accent-400/40 transition-all duration-200"
    >
      <Download size={18} strokeWidth={2} />
    </button>
  );
}

export default function LightboxWrapper({
  open,
  index,
  slides,
  onClose,
}: LightboxWrapperProps) {
  return (
    <Lightbox
      open={open}
      close={onClose}
      index={index}
      slides={slides}
      styles={{
        container: { backgroundColor: "rgba(10, 11, 16, 0.97)" },
      }}
      carousel={{ finite: false }}
      animation={{ fade: 250 }}
      render={{
        slideFooter: () => <DownloadButton />,
      }}
    />
  );
}
