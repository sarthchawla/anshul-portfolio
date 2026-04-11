/**
 * Extracts a Google Drive file ID from common Google Drive URL patterns:
 * - lh3.googleusercontent.com/d/{id}
 * - drive.google.com/file/d/{id}/preview
 * - drive.google.com/thumbnail?id={id}
 */
function extractGdriveId(url: string): string | null {
  const patterns = [
    /googleusercontent\.com\/d\/([^/?#]+)/,
    /drive\.google\.com\/file\/d\/([^/?#]+)/,
    /drive\.google\.com\/thumbnail\?id=([^&#]+)/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match?.[1]) return match[1];
  }
  return null;
}

/**
 * Downloads media by opening the Google Drive direct download URL.
 * For non-Drive URLs, opens in a new tab as fallback.
 */
export function downloadMedia(url: string, _name?: string): void {
  const fileId = extractGdriveId(url);
  if (fileId) {
    window.open(
      `https://drive.google.com/uc?export=download&id=${fileId}`,
      "_blank"
    );
  } else {
    window.open(url, "_blank");
  }
}
