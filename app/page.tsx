"use client";

import Hero from "./components/hero";
import Nav from "./components/nav";
import ProfilesGallery from "./components/profiles-gallery";
import IntroVideo from "./components/intro-video";
import ExperienceSection from "./components/experience-section";
import PhotoShoots from "./components/photo-shoots";
import ContactSection from "./components/contact-section";
import Footer from "./components/footer";
import { Agentation } from "agentation";

export default function Home() {
  return (
    <div className="bg-surface-base min-h-screen">
      <Nav />
      <Hero />
      <ProfilesGallery />
      <IntroVideo />
      <ExperienceSection />
      <PhotoShoots />
      <ContactSection />
      <Footer />
      <Agentation endpoint="http://localhost:4747" />
    </div>
  );
}
