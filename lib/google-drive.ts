export const gdriveImage = (id: string): string =>
  `https://lh3.googleusercontent.com/d/${id}`;

export const gdriveThumbnail = (id: string, w = 400): string =>
  `https://lh3.googleusercontent.com/d/${id}=w${w}`;

export const gdriveVideoEmbed = (id: string): string =>
  `https://drive.google.com/file/d/${id}/preview`;

export const gdriveThumbnailById = (id: string): string =>
  `https://drive.google.com/thumbnail?id=${id}&sz=w800`;

export function gdriveLoader({ src, width }: { src: string; width: number }): string {
  return `${src}=w${width}`;
}
