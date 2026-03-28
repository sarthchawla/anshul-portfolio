"use client";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

interface LightboxWrapperProps {
  open: boolean;
  index: number;
  slides: { src: string; alt?: string }[];
  onClose: () => void;
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
        container: { backgroundColor: "rgba(0, 0, 0, 0.95)" },
      }}
      carousel={{ finite: false }}
      animation={{ fade: 250 }}
    />
  );
}
