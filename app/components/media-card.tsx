"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface MediaCardProps {
  src: string;
  alt: string;
  onClick?: () => void;
  delay?: number;
  className?: string;
}

export default function MediaCard({
  src,
  alt,
  onClick,
  delay = 0,
  className,
}: MediaCardProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <motion.div
      className={`group relative cursor-pointer overflow-hidden rounded-lg bg-zinc-800 aspect-[3/4]${className ? ` ${className}` : ""}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      onClick={onClick}
    >
      {/* Loading shimmer placeholder */}
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-zinc-800 via-zinc-700 to-zinc-800" />
      )}

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={`h-full w-full object-cover transition-all duration-500 ${loaded ? "opacity-100 scale-100" : "opacity-0 scale-105"}`}
      />

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Gold bottom border on hover */}
      <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gold-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </motion.div>
  );
}
