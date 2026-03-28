import type { PhotoShootCategory } from "./types";

/**
 * Placeholder image URLs for categories with empty Google Drive folders.
 * TODO: Replace placeholder URLs with gdriveImage() when real photos are uploaded.
 */
export const photoshootPlaceholders: string[] = [
  "https://images.unsplash.com/photo-1469460340997-2f854421e72f?w=600&auto=format",
  "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=600&auto=format",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format",
  "https://images.unsplash.com/photo-1504703395950-b89145a5425b?w=600&auto=format",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&auto=format",
  "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&auto=format",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format",
];

export const photoShootCategories: PhotoShootCategory[] = [
  {
    name: "Photoshoot",
    slug: "photoshoot",
    photos: [
      // TODO: Replace placeholder IDs with real Google Drive IDs when photos are uploaded
      { id: "placeholder-ps-1", type: "image", alt: "Photoshoot Photo 1" },
      { id: "placeholder-ps-2", type: "image", alt: "Photoshoot Photo 2" },
      { id: "placeholder-ps-3", type: "image", alt: "Photoshoot Photo 3" },
      { id: "placeholder-ps-4", type: "image", alt: "Photoshoot Photo 4" },
      { id: "placeholder-ps-5", type: "image", alt: "Photoshoot Photo 5" },
      { id: "placeholder-ps-6", type: "image", alt: "Photoshoot Photo 6" },
      { id: "placeholder-ps-7", type: "image", alt: "Photoshoot Photo 7" },
      { id: "placeholder-ps-8", type: "image", alt: "Photoshoot Photo 8" },
    ],
  },
  {
    name: "Indian Ethnicwear",
    slug: "indian-ethnicwear",
    photos: [
      { id: "1-jsT4J0ty-3G1TadNYh5KCsze17gIXqS", type: "image", alt: "Indian Ethnicwear - IMG_6922" },
      { id: "1-J87v9IFc1-3_KfhcUzZ1ATjrmHF_Q62", type: "image", alt: "Indian Ethnicwear - IMG_6925" },
      { id: "1qEvhudCKmYOseGtXxPXbfoj4eDXML2V4", type: "image", alt: "Indian Ethnicwear - IMG_6926" },
      { id: "1U3lY9LoU0V9J3X4IMTzf8UGnqkcPDogq", type: "image", alt: "Indian Ethnicwear - IMG_6929" },
      { id: "1RAOn0k_LDC2zKIgKGmk0mMkqntvbTjDZ", type: "image", alt: "Indian Ethnicwear - IMG_6931" },
      { id: "1LqK5MIw9yxqGLiYxga_r1pXnoKeVgDWt", type: "image", alt: "Indian Ethnicwear - IMG_6934" },
      { id: "1LTHbbMplxx_1duOM_SJQ5v1kmqETyyeD", type: "image", alt: "Indian Ethnicwear - IMG_6935" },
      { id: "1MRgmH1ki9Dv8sC3Oj5vE7iRMqCpo84ni", type: "image", alt: "Indian Ethnicwear - IMG_6937" },
      { id: "1XVnt4NcNlVP0ALWedJqOiJWR72jLR4iZ", type: "image", alt: "Indian Ethnicwear - IMG_7000" },
      { id: "1ikXNm_w2n1qfo-J5mRdVfK_yLu6Z7Kkg", type: "image", alt: "Indian Ethnicwear - IMG_7001" },
      { id: "1-ArHZ5OOjwsux7_gq94dpI5jayNjeU2z", type: "image", alt: "Indian Ethnicwear - IMG_7002" },
      { id: "1vQZE7RxBC7fb7FyS2CBvFEuYCJzxvfOv", type: "image", alt: "Indian Ethnicwear - IMG_7003" },
      { id: "1hIe0FdQWniH17DtN-YZcd1he3b6MunSr", type: "image", alt: "Indian Ethnicwear - IMG_7016" },
      { id: "15nZ2I4TsqUUHbkmAMQgRQQZXwhHwM9_s", type: "image", alt: "Indian Ethnicwear - IMG_7018" },
      { id: "14GNBgWCOMVzi7KwbCfa7PwZLbihUo5P6", type: "image", alt: "Indian Ethnicwear - IMG_7022" },
      { id: "14cmuAX-MeLOYKXLzHnxxI_6VE1Po9u1y", type: "image", alt: "Indian Ethnicwear - IMG_7029" },
      { id: "18T3I-_ScCZhgb5NrJP4GH4AtKZzObyyM", type: "image", alt: "Indian Ethnicwear - IMG_7072" },
      { id: "1DMgiaQ_-waisYNnRBTj1gqtuRaBbleyX", type: "image", alt: "Indian Ethnicwear - IMG_7074" },
      { id: "1IB5CIatvPheGjo3Ix2LIBqZJgNJlFT7F", type: "image", alt: "Indian Ethnicwear - IMG_7077" },
      { id: "1sWzEQWkx8YIyHS79hKwSRqwu-4c0S3tm", type: "image", alt: "Indian Ethnicwear - IMG_7078" },
      { id: "1lzzoqvfBGXbvCgEyJcPkmASjQTNKfj0A", type: "image", alt: "Indian Ethnicwear - IMG_7083" },
      { id: "1suUoXWYb4F7fzkWPXCo5rlJPAGrVvfi2", type: "image", alt: "Indian Ethnicwear - IMG_7084" },
    ],
  },
];
