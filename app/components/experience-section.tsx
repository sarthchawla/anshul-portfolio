"use client";

import InteractiveBentoGallery from "./ui/interactive-bento-gallery";
import type { MediaItemType } from "./ui/interactive-bento-gallery";
import { gdriveImage, gdriveVideoEmbed, gdriveThumbnailById } from "@/lib/google-drive";
import SectionHeading from "./section-heading";

/**
 * ALL media items from Google Drive, sorted by year ascending.
 * Title = project folder name, desc = year.
 * Videos with "full" in filename are excluded.
 *
 * Actual measured aspect ratios from thumbnails used for span assignment:
 * - Landscape 16:9 (ratio ~1.76-1.80): col-span-2 row-span-2
 * - Landscape 3:2 (ratio ~1.50):       col-span-2 row-span-2
 * - Ultra-wide banner (ratio ~3.07):    col-span-3 row-span-1
 * - Portrait 2:3 (ratio ~0.66):        col-span-1 row-span-3
 * - Portrait 3:5 (ratio ~0.60):        col-span-1 row-span-3
 * - Portrait 9:16 (ratio ~0.46-0.56):  col-span-1 row-span-4
 * - Tall portrait (ratio ~0.44):       col-span-1 row-span-4
 */
const mediaItems: MediaItemType[] = [
  // ── 2017: Giordano G-Motion ── (16:9 landscape, ratio 1.76)
  {
    id: 1,
    type: "video",
    title: "Giordano G-Motion",
    desc: "2017",
    url: gdriveVideoEmbed("1qfyWYKqZeEBCTNMyVER64tGorODUNBqA"),
    thumbnailUrl: gdriveThumbnailById("1qfyWYKqZeEBCTNMyVER64tGorODUNBqA"),
    aspectRatio: "16/9",
    span: "md:col-span-2 md:row-span-2 sm:col-span-2 sm:row-span-2",
  },
  // ── 2017: PAP Season's Greeting ── (16:9 landscape, ratio 1.76)
  {
    id: 2,
    type: "video",
    title: "PAP: Season's Greeting from PAP",
    desc: "2017",
    url: gdriveVideoEmbed("1ULNyoJ1NcxRFM8pKcYBAX1D4NZ05s8x0"),
    thumbnailUrl: gdriveThumbnailById("1ULNyoJ1NcxRFM8pKcYBAX1D4NZ05s8x0"),
    aspectRatio: "16/9",
    span: "md:col-span-2 md:row-span-2 sm:col-span-2 sm:row-span-2",
  },
  // ── 2019: Clean and Green Singapore ── (portrait 9:16, ratio 0.56)
  {
    id: 3,
    type: "video",
    title: "Clean and Green Singapore: Say YES to Waste Less MV",
    desc: "2019",
    url: gdriveVideoEmbed("1zcD9LjbwTg864Vsmx38eZ3_7km18PMjL"),
    thumbnailUrl: gdriveThumbnailById("1zcD9LjbwTg864Vsmx38eZ3_7km18PMjL"),
    aspectRatio: "9/16",
    span: "md:col-span-1 md:row-span-4 sm:col-span-1 sm:row-span-3",
  },
  // ── 2024: POSB Print & Video Shoot ──
  // POSB Insta Ad (portrait 9:16, ratio 0.50)
  {
    id: 4,
    type: "video",
    title: "POSB Print & Video Shoot",
    desc: "2024 — Instagram Ad",
    url: gdriveVideoEmbed("1MgbDWcr5rdm7sMUcgXebZu5ApsX3j_b9"),
    thumbnailUrl: gdriveThumbnailById("1MgbDWcr5rdm7sMUcgXebZu5ApsX3j_b9"),
    aspectRatio: "9/16",
    span: "md:col-span-1 md:row-span-4 sm:col-span-1 sm:row-span-3",
  },
  // POSB Website Ad Banner (ultra-wide, ratio 3.07)
  {
    id: 5,
    type: "image",
    title: "POSB Print & Video Shoot",
    desc: "2024 — Website Ad Banner",
    url: gdriveImage("1pKXM8LrU9-9g7tlZRlPRDEzkyaIST_6w"),
    span: "md:col-span-3 md:row-span-1 sm:col-span-3 sm:row-span-1",
  },
  // POSB Website Ad (tall portrait, ratio 0.44)
  {
    id: 6,
    type: "image",
    title: "POSB Print & Video Shoot",
    desc: "2024 — Website Ad",
    url: gdriveImage("10KFAXNyg0crSoM9ZVJLUA78UtLRQblfn"),
    span: "md:col-span-1 md:row-span-4 sm:col-span-1 sm:row-span-3",
  },
  // ── 2025: Celebrating Fathers ── (16:9 landscape, ratio 1.80)
  {
    id: 7,
    type: "video",
    title: "Celebrating Fathers 2025",
    desc: "2025 — Anshul Section",
    url: gdriveVideoEmbed("1oxD3GEwtPu1N5OKEaSOhE8avlQN-qKQT"),
    thumbnailUrl: gdriveThumbnailById("1oxD3GEwtPu1N5OKEaSOhE8avlQN-qKQT"),
    aspectRatio: "16/9",
    span: "md:col-span-2 md:row-span-2 sm:col-span-2 sm:row-span-2",
  },
  // ── 2025: IMDA Smart Nation ── (portrait ~2:3, ratio 0.70)
  {
    id: 8,
    type: "image",
    title: "IMDA Smart Nation Photoshoot",
    desc: "2025",
    url: gdriveImage("1wUUL-j3I2kFJhTmxXOlwc2S27XSr5rF8"),
    span: "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-3",
  },
  // ── 2025: Sentosa Brand Library ──
  // Sentosa Instagram 1 (portrait 9:16, ratio 0.46)
  {
    id: 9,
    type: "image",
    title: "Sentosa Brand Library Photoshoot",
    desc: "2025 — Instagram 1",
    url: gdriveImage("1Evnk38mKOD2DicpcJefU-BMZQQXhAlyx"),
    span: "md:col-span-1 md:row-span-4 sm:col-span-1 sm:row-span-3",
  },
  // Sentosa Instagram 2 (portrait 9:16, ratio 0.46)
  {
    id: 10,
    type: "image",
    title: "Sentosa Brand Library Photoshoot",
    desc: "2025 — Instagram 2",
    url: gdriveImage("17xQY9s1ImECtw0NlxNzsN-kx5kHbUMD9"),
    span: "md:col-span-1 md:row-span-4 sm:col-span-1 sm:row-span-3",
  },
  // Sentosa Wall Ad (portrait ~3:5, ratio 0.60)
  {
    id: 11,
    type: "image",
    title: "Sentosa Brand Library Photoshoot",
    desc: "2025 — Wall Ad",
    url: gdriveImage("1xqxSGVO9EKESLg_qz0LeEGKU_gTySRXg"),
    span: "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-3",
  },
  // Sentosa Instagram Ad video (portrait 9:16, ratio 0.46)
  {
    id: 12,
    type: "video",
    title: "Sentosa Brand Library Photoshoot",
    desc: "2025 — Instagram Ad",
    url: gdriveVideoEmbed("1lEqIheUgCOepWEvtMiT5k2wnuJnD-CB2"),
    thumbnailUrl: gdriveThumbnailById("1lEqIheUgCOepWEvtMiT5k2wnuJnD-CB2"),
    aspectRatio: "9/16",
    span: "md:col-span-1 md:row-span-4 sm:col-span-1 sm:row-span-3",
  },
  // Sentosa Photoshoot Library — 14 photos
  // IMG_5041 (landscape 3:2, ratio 1.50)
  {
    id: 13,
    type: "image",
    title: "Sentosa Brand Library Photoshoot",
    desc: "2025 — Photoshoot Library",
    url: gdriveImage("1BKLBIGiK70RDOqTRCM-RxX0qtSBs05tb"),
    span: "md:col-span-2 md:row-span-2 sm:col-span-2 sm:row-span-2",
  },
  // IMG_5042 (portrait 2:3, ratio 0.66)
  {
    id: 14,
    type: "image",
    title: "Sentosa Brand Library Photoshoot",
    desc: "2025 — Photoshoot Library",
    url: gdriveImage("1l_tgx6OaoSqsEHEVZ17kxzjgq2f2HI31"),
    span: "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-3",
  },
  // IMG_5043 (landscape 3:2, ratio 1.50)
  {
    id: 15,
    type: "image",
    title: "Sentosa Brand Library Photoshoot",
    desc: "2025 — Photoshoot Library",
    url: gdriveImage("1m8hdtU0SVLGHrs-YN34kiX2VNIQH1P-t"),
    span: "md:col-span-2 md:row-span-2 sm:col-span-2 sm:row-span-2",
  },
  // IMG_5044 (portrait 2:3, ratio 0.66)
  {
    id: 16,
    type: "image",
    title: "Sentosa Brand Library Photoshoot",
    desc: "2025 — Photoshoot Library",
    url: gdriveImage("1nB1PQL1h18MHeQON3zVrDGRACl_pwkOR"),
    span: "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-3",
  },
  // IMG_5045 (landscape 3:2, ratio 1.50)
  {
    id: 17,
    type: "image",
    title: "Sentosa Brand Library Photoshoot",
    desc: "2025 — Photoshoot Library",
    url: gdriveImage("1O6VkxubNLRhomAGC3lEGpRcTHaJfOHW6"),
    span: "md:col-span-2 md:row-span-2 sm:col-span-2 sm:row-span-2",
  },
  // IMG_5046 (portrait 2:3, ratio 0.66)
  {
    id: 18,
    type: "image",
    title: "Sentosa Brand Library Photoshoot",
    desc: "2025 — Photoshoot Library",
    url: gdriveImage("1yQDsFPTn4SJ5Ox3cq99aPfpLu36bEo5R"),
    span: "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-3",
  },
  // IMG_5047 (portrait 2:3, ratio 0.66)
  {
    id: 19,
    type: "image",
    title: "Sentosa Brand Library Photoshoot",
    desc: "2025 — Photoshoot Library",
    url: gdriveImage("1TPpiVJreG6LZn4VjJOV80O1xsKSLaqmk"),
    span: "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-3",
  },
  // IMG_5048 (portrait 2:3, ratio 0.66)
  {
    id: 20,
    type: "image",
    title: "Sentosa Brand Library Photoshoot",
    desc: "2025 — Photoshoot Library",
    url: gdriveImage("1R6AuRTLmUFbZLHXc2Cq_WouJ0flFG6Wk"),
    span: "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-3",
  },
  // IMG_5049 (portrait 2:3, ratio 0.66)
  {
    id: 21,
    type: "image",
    title: "Sentosa Brand Library Photoshoot",
    desc: "2025 — Photoshoot Library",
    url: gdriveImage("1x-MeO2gObti-RErCgtjA1FEvgeYCTrUj"),
    span: "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-3",
  },
  // IMG_5050 (portrait 2:3, ratio 0.66)
  {
    id: 22,
    type: "image",
    title: "Sentosa Brand Library Photoshoot",
    desc: "2025 — Photoshoot Library",
    url: gdriveImage("1puHmBcUOKbI2TyYgteB5Ii35KfhZrjox"),
    span: "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-3",
  },
  // IMG_5051 (portrait 2:3, ratio 0.66)
  {
    id: 23,
    type: "image",
    title: "Sentosa Brand Library Photoshoot",
    desc: "2025 — Photoshoot Library",
    url: gdriveImage("1hT3COexnkdCzIuv_O9rmxcuC6dX2qBjl"),
    span: "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-3",
  },
  // IMG_5052 (portrait 2:3, ratio 0.66)
  {
    id: 24,
    type: "image",
    title: "Sentosa Brand Library Photoshoot",
    desc: "2025 — Photoshoot Library",
    url: gdriveImage("12Jyuki-8h0oJdf7stb8Jht-Da5Ep_dF2"),
    span: "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-3",
  },
  // IMG_5053 (landscape 3:2, ratio 1.50)
  {
    id: 25,
    type: "image",
    title: "Sentosa Brand Library Photoshoot",
    desc: "2025 — Photoshoot Library",
    url: gdriveImage("1AfrcZEQxhOGw-xZSuAB-lkYz5cLmyCcw"),
    span: "md:col-span-2 md:row-span-2 sm:col-span-2 sm:row-span-2",
  },
  // IMG_5054 (landscape 3:2, ratio 1.50)
  {
    id: 26,
    type: "image",
    title: "Sentosa Brand Library Photoshoot",
    desc: "2025 — Photoshoot Library",
    url: gdriveImage("1XrMaSAoPUpyZ6E-q4yzD97Dgog45q1w4"),
    span: "md:col-span-2 md:row-span-2 sm:col-span-2 sm:row-span-2",
  },
  // ── 2025: URA ── (16:9 landscape, ratio 1.78)
  {
    id: 27,
    type: "video",
    title: "URA: Honouring the Past, Forging the Future",
    desc: "2025 — Draft Master Plan",
    url: gdriveVideoEmbed("1kLu6Z0ymt2LoyCF68wQQppBfcxEaxvmL"),
    thumbnailUrl: "/images/ura-thumb.png",
    aspectRatio: "16/9",
    span: "md:col-span-2 md:row-span-2 sm:col-span-2 sm:row-span-2",
  },
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-20 md:py-32 px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeading title="Past Acting Experience" id="experience-heading" />
        <InteractiveBentoGallery
          mediaItems={[...mediaItems].reverse()}
          title=""
          description=""
        />
      </div>
    </section>
  );
}
