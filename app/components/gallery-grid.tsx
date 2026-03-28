"use client";

import Masonry from "react-masonry-css";

interface GalleryGridProps {
  columns?: Record<number | "default", number>;
  children: React.ReactNode;
}

const defaultColumns: Record<number | "default", number> = {
  default: 3,
  768: 2,
  480: 1,
};

export default function GalleryGrid({
  columns = defaultColumns,
  children,
}: GalleryGridProps) {
  return (
    <Masonry
      breakpointCols={columns}
      className="flex -ml-4 w-auto"
      columnClassName="pl-4 bg-clip-padding"
    >
      {children}
    </Masonry>
  );
}
