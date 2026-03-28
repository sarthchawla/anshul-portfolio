"use client";

import InteractiveBentoGallery from "./ui/interactive-bento-gallery";
import type { MediaItemType } from "./ui/interactive-bento-gallery";
import { gdriveImage, gdriveThumbnail, gdriveVideoEmbed } from "@/lib/google-drive";
import SectionHeading from "./section-heading";

/**
 * ALL media items from Google Drive, sorted by year ascending.
 * Title = project folder name, desc = year.
 * Videos excluded if filename contains "full".
 *
 * Span logic based on content aspect ratio:
 * - Landscape images/videos (16:9): col-span-2 row-span-2
 * - Portrait images/videos (9:16): col-span-1 row-span-3
 * - Square-ish images: col-span-1 row-span-2
 * - Featured/hero items: col-span-2 row-span-3
 */
const mediaItems: MediaItemType[] = [
  // ── 2017: Giordano G-Motion ──
  {
    id: 1,
    type: "video",
    title: "Giordano G-Motion",
    desc: "2017",
    url: gdriveVideoEmbed("1qfyWYKqZeEBCTNMyVER64tGorODUNBqA"),
    thumbnailUrl: gdriveThumbnail("1qfyWYKqZeEBCTNMyVER64tGorODUNBqA", 800),
    span: "col-span-2 row-span-2 sm:col-span-2 sm:row-span-2 md:col-span-2 md:row-span-2",
  },
  // ── 2017: PAP Season's Greeting ──
  {
    id: 2,
    type: "video",
    title: "PAP: Season's Greeting from PAP",
    desc: "2017",
    url: gdriveVideoEmbed("1ULNyoJ1NcxRFM8pKcYBAX1D4NZ05s8x0"),
    thumbnailUrl: gdriveThumbnail("1ULNyoJ1NcxRFM8pKcYBAX1D4NZ05s8x0", 800),
    span: "col-span-2 row-span-2 sm:col-span-1 sm:row-span-2 md:col-span-2 md:row-span-2",
  },
  // ── 2019: Clean and Green Singapore ──
  {
    id: 3,
    type: "video",
    title: "Clean and Green Singapore: Say YES to Waste Less MV",
    desc: "2019",
    url: gdriveVideoEmbed("1zcD9LjbwTg864Vsmx38eZ3_7km18PMjL"),
    thumbnailUrl: gdriveThumbnail("1zcD9LjbwTg864Vsmx38eZ3_7km18PMjL", 800),
    span: "col-span-2 row-span-2 sm:col-span-2 sm:row-span-2 md:col-span-2 md:row-span-2",
  },
  // ── 2024: POSB Print & Video Shoot ──
  {
    id: 4,
    type: "video",
    title: "POSB Print & Video Shoot",
    desc: "2024 — Instagram Ad",
    url: gdriveVideoEmbed("1MgbDWcr5rdm7sMUcgXebZu5ApsX3j_b9"),
    thumbnailUrl: gdriveThumbnail("1MgbDWcr5rdm7sMUcgXebZu5ApsX3j_b9", 800),
    span: "col-span-1 row-span-3 sm:col-span-1 sm:row-span-3 md:col-span-1 md:row-span-3", // 9:16 portrait video
  },
  {
    id: 5,
    type: "image",
    title: "POSB Print & Video Shoot",
    desc: "2024 — Website Ad Banner",
    url: gdriveImage("1pKXM8LrU9-9g7tlZRlPRDEzkyaIST_6w"),
    span: "col-span-1 row-span-2 sm:col-span-2 sm:row-span-2 md:col-span-2 md:row-span-2", // landscape banner
  },
  {
    id: 6,
    type: "image",
    title: "POSB Print & Video Shoot",
    desc: "2024 — Website Ad",
    url: gdriveImage("10KFAXNyg0crSoM9ZVJLUA78UtLRQblfn"),
    span: "col-span-1 row-span-2 sm:col-span-1 sm:row-span-2 md:col-span-1 md:row-span-2", // landscape
  },
  // ── 2025: Celebrating Fathers ──
  {
    id: 7,
    type: "video",
    title: "Celebrating Fathers 2025",
    desc: "2025 — Anshul Section",
    url: gdriveVideoEmbed("1oxD3GEwtPu1N5OKEaSOhE8avlQN-qKQT"),
    thumbnailUrl: gdriveThumbnail("1oxD3GEwtPu1N5OKEaSOhE8avlQN-qKQT", 800),
    span: "col-span-2 row-span-2 sm:col-span-2 sm:row-span-2 md:col-span-2 md:row-span-2", // landscape video
  },
  // ── 2025: IMDA Smart Nation ──
  {
    id: 8,
    type: "image",
    title: "IMDA Smart Nation Photoshoot",
    desc: "2025",
    url: gdriveImage("1wUUL-j3I2kFJhTmxXOlwc2S27XSr5rF8"),
    span: "col-span-2 row-span-2 sm:col-span-2 sm:row-span-3 md:col-span-2 md:row-span-3", // featured large
  },
  // ── 2025: Sentosa Brand Library ──
  {
    id: 9,
    type: "image",
    title: "Sentosa Brand Library Photoshoot",
    desc: "2025 — Instagram 1",
    url: gdriveImage("1Evnk38mKOD2DicpcJefU-BMZQQXhAlyx"),
    span: "col-span-1 row-span-2 sm:col-span-1 sm:row-span-2 md:col-span-1 md:row-span-2",
  },
  {
    id: 10,
    type: "image",
    title: "Sentosa Brand Library Photoshoot",
    desc: "2025 — Instagram 2",
    url: gdriveImage("17xQY9s1ImECtw0NlxNzsN-kx5kHbUMD9"),
    span: "col-span-1 row-span-2 sm:col-span-1 sm:row-span-2 md:col-span-1 md:row-span-2",
  },
  {
    id: 11,
    type: "image",
    title: "Sentosa Brand Library Photoshoot",
    desc: "2025 — Wall Ad",
    url: gdriveImage("1xqxSGVO9EKESLg_qz0LeEGKU_gTySRXg"),
    span: "col-span-2 row-span-2 sm:col-span-2 sm:row-span-2 md:col-span-2 md:row-span-2", // landscape wall ad
  },
  {
    id: 12,
    type: "video",
    title: "Sentosa Brand Library Photoshoot",
    desc: "2025 — Instagram Ad",
    url: gdriveVideoEmbed("1lEqIheUgCOepWEvtMiT5k2wnuJnD-CB2"),
    thumbnailUrl: gdriveThumbnail("1lEqIheUgCOepWEvtMiT5k2wnuJnD-CB2", 800),
    span: "col-span-1 row-span-3 sm:col-span-1 sm:row-span-3 md:col-span-1 md:row-span-3", // 9:16 portrait video
  },
  // Sentosa Photoshoot Library (14 photos — square/portrait photoshoot images)
  {
    id: 13,
    type: "image",
    title: "Sentosa Brand Library Photoshoot",
    desc: "2025 — Photoshoot Library",
    url: gdriveImage("1BKLBIGiK70RDOqTRCM-RxX0qtSBs05tb"),
    span: "col-span-1 row-span-2 sm:col-span-1 sm:row-span-2 md:col-span-1 md:row-span-2",
  },
  {
    id: 14,
    type: "image",
    title: "Sentosa Brand Library Photoshoot",
    desc: "2025 — Photoshoot Library",
    url: gdriveImage("1l_tgx6OaoSqsEHEVZ17kxzjgq2f2HI31"),
    span: "col-span-1 row-span-2 sm:col-span-1 sm:row-span-2 md:col-span-1 md:row-span-2",
  },
  {
    id: 15,
    type: "image",
    title: "Sentosa Brand Library Photoshoot",
    desc: "2025 — Photoshoot Library",
    url: gdriveImage("1m8hdtU0SVLGHrs-YN34kiX2VNIQH1P-t"),
    span: "col-span-1 row-span-2 sm:col-span-1 sm:row-span-2 md:col-span-1 md:row-span-2",
  },
  {
    id: 16,
    type: "image",
    title: "Sentosa Brand Library Photoshoot",
    desc: "2025 — Photoshoot Library",
    url: gdriveImage("1nB1PQL1h18MHeQON3zVrDGRACl_pwkOR"),
    span: "col-span-1 row-span-2 sm:col-span-1 sm:row-span-2 md:col-span-1 md:row-span-2",
  },
  {
    id: 17,
    type: "image",
    title: "Sentosa Brand Library Photoshoot",
    desc: "2025 — Photoshoot Library",
    url: gdriveImage("1O6VkxubNLRhomAGC3lEGpRcTHaJfOHW6"),
    span: "col-span-2 row-span-2 sm:col-span-2 sm:row-span-2 md:col-span-2 md:row-span-2",
  },
  {
    id: 18,
    type: "image",
    title: "Sentosa Brand Library Photoshoot",
    desc: "2025 — Photoshoot Library",
    url: gdriveImage("1yQDsFPTn4SJ5Ox3cq99aPfpLu36bEo5R"),
    span: "col-span-1 row-span-2 sm:col-span-1 sm:row-span-2 md:col-span-1 md:row-span-2",
  },
  {
    id: 19,
    type: "image",
    title: "Sentosa Brand Library Photoshoot",
    desc: "2025 — Photoshoot Library",
    url: gdriveImage("1TPpiVJreG6LZn4VjJOV80O1xsKSLaqmk"),
    span: "col-span-1 row-span-2 sm:col-span-1 sm:row-span-2 md:col-span-1 md:row-span-2",
  },
  {
    id: 20,
    type: "image",
    title: "Sentosa Brand Library Photoshoot",
    desc: "2025 — Photoshoot Library",
    url: gdriveImage("1R6AuRTLmUFbZLHXc2Cq_WouJ0flFG6Wk"),
    span: "col-span-2 row-span-2 sm:col-span-2 sm:row-span-2 md:col-span-2 md:row-span-2",
  },
  {
    id: 21,
    type: "image",
    title: "Sentosa Brand Library Photoshoot",
    desc: "2025 — Photoshoot Library",
    url: gdriveImage("1x-MeO2gObti-RErCgtjA1FEvgeYCTrUj"),
    span: "col-span-1 row-span-2 sm:col-span-1 sm:row-span-2 md:col-span-1 md:row-span-2",
  },
  {
    id: 22,
    type: "image",
    title: "Sentosa Brand Library Photoshoot",
    desc: "2025 — Photoshoot Library",
    url: gdriveImage("1puHmBcUOKbI2TyYgteB5Ii35KfhZrjox"),
    span: "col-span-1 row-span-2 sm:col-span-1 sm:row-span-2 md:col-span-1 md:row-span-2",
  },
  {
    id: 23,
    type: "image",
    title: "Sentosa Brand Library Photoshoot",
    desc: "2025 — Photoshoot Library",
    url: gdriveImage("1hT3COexnkdCzIuv_O9rmxcuC6dX2qBjl"),
    span: "col-span-2 row-span-2 sm:col-span-2 sm:row-span-2 md:col-span-2 md:row-span-2",
  },
  {
    id: 24,
    type: "image",
    title: "Sentosa Brand Library Photoshoot",
    desc: "2025 — Photoshoot Library",
    url: gdriveImage("12Jyuki-8h0oJdf7stb8Jht-Da5Ep_dF2"),
    span: "col-span-1 row-span-2 sm:col-span-1 sm:row-span-2 md:col-span-1 md:row-span-2",
  },
  {
    id: 25,
    type: "image",
    title: "Sentosa Brand Library Photoshoot",
    desc: "2025 — Photoshoot Library",
    url: gdriveImage("1AfrcZEQxhOGw-xZSuAB-lkYz5cLmyCcw"),
    span: "col-span-1 row-span-2 sm:col-span-1 sm:row-span-2 md:col-span-1 md:row-span-2",
  },
  {
    id: 26,
    type: "image",
    title: "Sentosa Brand Library Photoshoot",
    desc: "2025 — Photoshoot Library",
    url: gdriveImage("1XrMaSAoPUpyZ6E-q4yzD97Dgog45q1w4"),
    span: "col-span-2 row-span-2 sm:col-span-2 sm:row-span-2 md:col-span-2 md:row-span-2",
  },
  // ── 2025: URA ──
  {
    id: 27,
    type: "video",
    title: "URA: Honouring the Past, Forging the Future",
    desc: "2025 — Draft Master Plan",
    url: gdriveVideoEmbed("1kLu6Z0ymt2LoyCF68wQQppBfcxEaxvmL"),
    thumbnailUrl: "/images/ura-thumb.png",
    span: "col-span-2 row-span-2 sm:col-span-2 sm:row-span-2 md:col-span-2 md:row-span-2", // landscape video
  },
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-20 md:py-32 px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeading title="Past Acting Experience" id="experience-heading" />
        <InteractiveBentoGallery
          mediaItems={mediaItems}
          title=""
          description="Drag and explore a curated collection of projects"
        />
      </div>
    </section>
  );
}
