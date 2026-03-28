"use client";

import { motion } from "framer-motion";
import { WhatsAppIcon, InstagramIcon } from "./icons";

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-zinc-950">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto flex max-w-4xl flex-col items-center gap-5 px-6 py-12 text-center"
      >
        {/* Name */}
        <p className="font-serif text-lg uppercase tracking-widest text-zinc-400">
          Anshul Chugh
        </p>

        {/* Contact */}
        <div className="flex flex-col items-center gap-1 text-sm text-zinc-500">
          <a
            href="mailto:anshulchugh.work@gmail.com"
            className="transition-colors hover:text-gold-500"
          >
            anshulchugh.work@gmail.com
          </a>
          <a
            href="https://wa.me/6581711361"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 transition-colors hover:text-gold-500"
          >
            <WhatsAppIcon size={14} />
            +65 8171-1361
          </a>
          <a
            href="https://www.instagram.com/an.shul_"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 transition-colors hover:text-gold-500"
          >
            <InstagramIcon size={14} />
            @an.shul_
          </a>
        </div>

        {/* Copyright */}
        <p className="text-xs text-zinc-600">
          &copy; 2026 Anshul Chugh. All rights reserved.
        </p>
      </motion.div>
    </footer>
  );
}
