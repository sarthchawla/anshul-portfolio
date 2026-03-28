"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "./section-heading";
import { Mail, Phone } from "lucide-react";
import { WhatsAppIcon, InstagramIcon } from "./icons";

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="contact" className="py-20 md:py-32 px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeading title="Get In Touch" id="contact-heading" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {/* Left: Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            <p className="font-sans text-zinc-400 text-lg leading-relaxed">
              For bookings, collaborations, or inquiries — feel free to reach out.
            </p>

            <div className="space-y-4">
              <a href="mailto:anshulchugh.work@gmail.com" className="flex items-center gap-3 text-zinc-400 hover:text-gold-500 transition-colors group">
                <Mail size={20} className="text-gold-500/70 group-hover:text-gold-500" />
                <span className="font-sans text-sm">anshulchugh.work@gmail.com</span>
              </a>
              <a href="https://wa.me/6581711361" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-zinc-400 hover:text-gold-500 transition-colors group">
                <WhatsAppIcon size={20} className="text-gold-500/70 group-hover:text-gold-500" />
                <span className="font-sans text-sm">+65 8171-1361</span>
              </a>
              <a href="https://www.instagram.com/an.shul_" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-zinc-400 hover:text-gold-500 transition-colors group">
                <InstagramIcon size={20} className="text-gold-500/70 group-hover:text-gold-500" />
                <span className="font-sans text-sm">@an.shul_</span>
              </a>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          >
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full min-h-[300px] rounded-xl border border-gold-500/20 bg-surface-card p-8 text-center">
                <p className="font-serif text-2xl text-gold-500 mb-2">Thank You!</p>
                <p className="font-sans text-zinc-400 text-sm">Your message has been sent. I'll get back to you soon.</p>
              </div>
            ) : (
              <form
                // TODO: Replace FORM_ID with actual Google Form ID
                action="https://docs.google.com/forms/d/e/FORM_ID/formResponse"
                method="POST"
                target="hidden_iframe"
                onSubmit={() => setSubmitted(true)}
                className="space-y-5 rounded-xl border border-white/5 bg-surface-card p-6 md:p-8"
              >
                <div>
                  <label htmlFor="contact-name" className="block font-sans text-xs uppercase tracking-wider text-zinc-500 mb-2">Name *</label>
                  {/* TODO: Replace entry.XXXXXX with actual Google Form entry ID for Name */}
                  <input id="contact-name" name="entry.123456781" type="text" required className="w-full rounded-lg border border-white/10 bg-zinc-900/50 px-4 py-3 font-sans text-sm text-white placeholder-zinc-600 outline-none transition-colors focus:border-gold-500/50 focus:ring-1 focus:ring-gold-500/20" placeholder="Your name" />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block font-sans text-xs uppercase tracking-wider text-zinc-500 mb-2">Email *</label>
                  {/* TODO: Replace entry.XXXXXX with actual Google Form entry ID for Email */}
                  <input id="contact-email" name="entry.123456782" type="email" required className="w-full rounded-lg border border-white/10 bg-zinc-900/50 px-4 py-3 font-sans text-sm text-white placeholder-zinc-600 outline-none transition-colors focus:border-gold-500/50 focus:ring-1 focus:ring-gold-500/20" placeholder="your@email.com" />
                </div>
                <div>
                  <label htmlFor="contact-subject" className="block font-sans text-xs uppercase tracking-wider text-zinc-500 mb-2">Subject</label>
                  {/* TODO: Replace entry.XXXXXX with actual Google Form entry ID for Subject */}
                  <input id="contact-subject" name="entry.123456783" type="text" className="w-full rounded-lg border border-white/10 bg-zinc-900/50 px-4 py-3 font-sans text-sm text-white placeholder-zinc-600 outline-none transition-colors focus:border-gold-500/50 focus:ring-1 focus:ring-gold-500/20" placeholder="What's this about?" />
                </div>
                <div>
                  <label htmlFor="contact-message" className="block font-sans text-xs uppercase tracking-wider text-zinc-500 mb-2">Message *</label>
                  {/* TODO: Replace entry.XXXXXX with actual Google Form entry ID for Message */}
                  <textarea id="contact-message" name="entry.123456784" required rows={5} className="w-full rounded-lg border border-white/10 bg-zinc-900/50 px-4 py-3 font-sans text-sm text-white placeholder-zinc-600 outline-none transition-colors focus:border-gold-500/50 focus:ring-1 focus:ring-gold-500/20 resize-none" placeholder="Your message..." />
                </div>
                <button type="submit" className="w-full rounded-lg bg-gold-600 px-6 py-3 font-sans text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:bg-gold-500 cursor-pointer">
                  Send Message
                </button>
                {/* Hidden iframe for Google Form submission without redirect */}
                <iframe name="hidden_iframe" style={{display:"none"}} />
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
