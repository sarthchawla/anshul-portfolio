export const gdriveImage = (id: string): string =>
  `https://lh3.googleusercontent.com/d/${id}`;

export const gdriveThumbnail = (id: string, w = 400): string =>
  `https://lh3.googleusercontent.com/d/${id}=w${w}`;

export const gdriveVideoEmbed = (id: string): string =>
  `https://drive.google.com/file/d/${id}/preview`;
