"use client";

import Hero from "./components/hero";
import { Header } from "./components/ui/header-2";
import ProfilesGallery from "./components/profiles-gallery";
import IntroVideo from "./components/intro-video";
import ExperienceSection from "./components/experience-section";
import PhotoShoots from "./components/photo-shoots";
import ContactSection from "./components/contact-section";
import Footer from "./components/footer";
import { BeamsBackground } from "./components/ui/beams-background";
import { Agentation } from "agentation";
import { Z } from "@/lib/z-index";

export default function Home() {
  return (
    <div className="bg-surface-base min-h-screen">
      {/* Fixed beams background layer */}
      <div className="fixed inset-0 overflow-hidden" style={{ zIndex: Z.BACKGROUND }}>
        <BeamsBackground intensity="subtle" />
      </div>
      {/* Scrollable content */}
      <div className="relative" style={{ zIndex: Z.PAGE_CONTENT }}>
        <Header />
        <Hero />
        <ProfilesGallery />
        <IntroVideo />
        <ExperienceSection />
        <PhotoShoots />
        <ContactSection />
        <Footer />
      </div>
      <Agentation endpoint="http://localhost:4747" />
    </div>
  );
}
