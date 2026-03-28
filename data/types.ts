export interface MediaItem {
  id: string;
  type: "image" | "video";
  alt: string;
  aspectRatio?: string;
}

export interface Project {
  name: string;
  slug: string;
  thumbnail?: string;
  media: MediaItem[];
}

export interface YearExperience {
  year: number;
  projects: Project[];
}

export interface PhotoShootCategory {
  name: string;
  slug: string;
  photos: MediaItem[];
}
