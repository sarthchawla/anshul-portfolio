import type { YearExperience } from "./types";

/**
 * Placeholder image URLs for projects with empty Google Drive folders.
 * TODO: Replace placeholder URLs with gdriveImage() when real content is uploaded.
 */
export const experiencePlaceholderImages: string[] = [
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&auto=format",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format",
];

/**
 * Past acting experience organized by year (descending).
 * Real Google Drive file IDs are used where available.
 */
export const experiences: YearExperience[] = [
  {
    year: 2025,
    projects: [
      {
        name: "Celebrating Fathers 2025",
        slug: "celebrating-fathers-2025",
        media: [
          {
            id: "1oxD3GEwtPu1N5OKEaSOhE8avlQN-qKQT",
            type: "video",
            alt: "Celebrating Fathers 2025 - Anshul Section Only",
          },
          {
            id: "1rbXYDSCxu2i-VQSLni95PptBwmjS1Uk9",
            type: "video",
            alt: "Celebrating Fathers 2025 - Full Video",
          },
        ],
      },
      {
        name: "IMDA Smart Nation Photoshoot",
        slug: "imda-smart-nation",
        media: [
          {
            id: "1wUUL-j3I2kFJhTmxXOlwc2S27XSr5rF8",
            type: "image",
            alt: "IMDA Smart Nation Photoshoot",
          },
        ],
      },
      {
        name: "Sentosa Brand Library Photoshoot",
        slug: "sentosa-brand-library",
        media: [
          {
            id: "1Evnk38mKOD2DicpcJefU-BMZQQXhAlyx",
            type: "image",
            alt: "Sentosa Instagram Photo 1",
          },
          {
            id: "17xQY9s1ImECtw0NlxNzsN-kx5kHbUMD9",
            type: "image",
            alt: "Sentosa Instagram Photo 2",
          },
          {
            id: "1xqxSGVO9EKESLg_qz0LeEGKU_gTySRXg",
            type: "image",
            alt: "Sentosa Wall Ad",
          },
          {
            id: "1lEqIheUgCOepWEvtMiT5k2wnuJnD-CB2",
            type: "video",
            alt: "Sentosa Instagram Ad Video",
            aspectRatio: "9/16",
          },
          // Photoshoot Library subfolder (14 photos)
          { id: "1BKLBIGiK70RDOqTRCM-RxX0qtSBs05tb", type: "image", alt: "Sentosa Photoshoot Library 1" },
          { id: "1l_tgx6OaoSqsEHEVZ17kxzjgq2f2HI31", type: "image", alt: "Sentosa Photoshoot Library 2" },
          { id: "1m8hdtU0SVLGHrs-YN34kiX2VNIQH1P-t", type: "image", alt: "Sentosa Photoshoot Library 3" },
          { id: "1nB1PQL1h18MHeQON3zVrDGRACl_pwkOR", type: "image", alt: "Sentosa Photoshoot Library 4" },
          { id: "1O6VkxubNLRhomAGC3lEGpRcTHaJfOHW6", type: "image", alt: "Sentosa Photoshoot Library 5" },
          { id: "1yQDsFPTn4SJ5Ox3cq99aPfpLu36bEo5R", type: "image", alt: "Sentosa Photoshoot Library 6" },
          { id: "1TPpiVJreG6LZn4VjJOV80O1xsKSLaqmk", type: "image", alt: "Sentosa Photoshoot Library 7" },
          { id: "1R6AuRTLmUFbZLHXc2Cq_WouJ0flFG6Wk", type: "image", alt: "Sentosa Photoshoot Library 8" },
          { id: "1x-MeO2gObti-RErCgtjA1FEvgeYCTrUj", type: "image", alt: "Sentosa Photoshoot Library 9" },
          { id: "1puHmBcUOKbI2TyYgteB5Ii35KfhZrjox", type: "image", alt: "Sentosa Photoshoot Library 10" },
          { id: "1hT3COexnkdCzIuv_O9rmxcuC6dX2qBjl", type: "image", alt: "Sentosa Photoshoot Library 11" },
          { id: "12Jyuki-8h0oJdf7stb8Jht-Da5Ep_dF2", type: "image", alt: "Sentosa Photoshoot Library 12" },
          { id: "1AfrcZEQxhOGw-xZSuAB-lkYz5cLmyCcw", type: "image", alt: "Sentosa Photoshoot Library 13" },
          { id: "1XrMaSAoPUpyZ6E-q4yzD97Dgog45q1w4", type: "image", alt: "Sentosa Photoshoot Library 14" },
        ],
      },
      {
        name: "URA: Honouring the Past, Forging the Future",
        slug: "ura-honouring-past",
        media: [
          {
            id: "placeholder-ura-thumb",
            type: "image",
            alt: "URA Honouring the Past - Thumbnail",
          },
          {
            id: "1kLu6Z0ymt2LoyCF68wQQppBfcxEaxvmL",
            type: "video",
            alt: "URA - Anshul Section Only",
          },
          {
            id: "10VJ9YtPzwlheyZUtXgqRo3JadHuZAA4Z",
            type: "video",
            alt: "URA - Full Video",
          },
        ],
      },
    ],
  },
  {
    year: 2024,
    projects: [
      {
        name: "OnePA Brand Stock Photoshoot",
        slug: "onepa-brand-stock",
        media: [
          // TODO: Replace placeholder image URLs with gdriveImage() when real content is uploaded
          {
            id: "placeholder-onepa-1",
            type: "image",
            alt: "OnePA Brand Stock Photo 1",
          },
          {
            id: "placeholder-onepa-2",
            type: "image",
            alt: "OnePA Brand Stock Photo 2",
          },
          {
            id: "placeholder-onepa-3",
            type: "image",
            alt: "OnePA Brand Stock Photo 3",
          },
        ],
      },
      {
        name: "POSB Print & Video Shoot",
        slug: "posb-print-video",
        media: [
          {
            id: "1MgbDWcr5rdm7sMUcgXebZu5ApsX3j_b9",
            type: "video",
            alt: "POSB Instagram Ad Video",
            aspectRatio: "9/16",
          },
          {
            id: "1pKXM8LrU9-9g7tlZRlPRDEzkyaIST_6w",
            type: "image",
            alt: "POSB Website Ad Banner",
          },
          {
            id: "10KFAXNyg0crSoM9ZVJLUA78UtLRQblfn",
            type: "image",
            alt: "POSB Website Ad",
          },
        ],
      },
    ],
  },
];
