"use client";

import { Mail } from "lucide-react";
import { MinimalistHero } from "./ui/minimalist-hero";
import { WhatsAppIcon, InstagramIcon } from "./icons";

const CONTACT_LINKS = [
  {
    icon: <Mail size={20} />,
    label: "anshulchugh.work@gmail.com",
    href: "mailto:anshulchugh.work@gmail.com",
  },
  {
    icon: <WhatsAppIcon size={20} />,
    label: "+65 8171-1361",
    href: "https://wa.me/6581711361",
    external: true,
  },
  {
    icon: <InstagramIcon size={20} />,
    label: "@an.shul_",
    href: "https://www.instagram.com/an.shul_",
    external: true,
  },
];

export default function Hero() {
  return (
    <section id="hero">
      <MinimalistHero
        imageSrc={`/hero-portrait-nobg.png`}
        imageAlt="Anshul — Actress & Model"
        overlayText="ANSHUL"
        contactLinks={CONTACT_LINKS}
      />
    </section>
  );
}
