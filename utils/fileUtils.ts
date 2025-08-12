// utils/fileUtils.ts

export interface SanityFile {
  _type: 'file';
  asset: {
    _ref: string;
    _type: 'reference';
    url?: string;
    originalFilename?: string;
    mimeType?: string;
    size?: number;
  };
}

export interface FileUploadDocument {
  _id: string;
  _type: 'fileUpload';
  title: string;
  slug: {
    current: string;
  };
  file: SanityFile;
}

/**
 * Get the direct download URL for a file
 * @param file - The Sanity file object
 * @returns The direct URL to download the file
 */
export function getFileDownloadUrl(file: SanityFile): string | null {
  if (!file?.asset?.url) {
    return null;
  }
  return file.asset.url;
}

/**
 * Get the file route URL for a file upload document
 * @param slug - The slug of the file
 * @returns The URL to the file download page
 */
export function getFileRouteUrl(slug: string): string {
  return `/files/${slug}`;
}

/**
 * Format file size in human-readable format
 * @param bytes - File size in bytes
 * @returns Formatted file size string
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Get file icon based on file type
 * @param mimeType - The MIME type of the file
 * @returns The appropriate icon name
 */
export function getFileIcon(mimeType?: string): string {
  if (!mimeType) return '📄';
  
  if (mimeType.startsWith('image/')) return '🖼️';
  if (mimeType.startsWith('video/')) return '🎥';
  if (mimeType.startsWith('audio/')) return '🎵';
  if (mimeType.includes('pdf')) return '📕';
  if (mimeType.includes('word') || mimeType.includes('document')) return '📝';
  if (mimeType.includes('powerpoint') || mimeType.includes('presentation')) return '📊';
  if (mimeType.includes('excel') || mimeType.includes('spreadsheet')) return '📈';
  if (mimeType.includes('zip') || mimeType.includes('rar')) return '📦';
  
  return '📄';
}

/**
 * Check if a file is accessible (all files are public by default)
 * @param fileDoc - The file upload document
 * @returns Whether the file is accessible
 */
export function isFileAccessible(fileDoc: FileUploadDocument): boolean {
  // All files are public by default in the simplified schema
  return true;
}

/**
 * Get file accessibility status
 * @param fileDoc - The file upload document
 * @returns Object with accessibility info and URLs
 */
export function getFileAccessibilityInfo(fileDoc: FileUploadDocument) {
  const isAccessible = isFileAccessible(fileDoc);
  const downloadUrl = getFileDownloadUrl(fileDoc.file);
  const routeUrl = getFileRouteUrl(fileDoc.slug.current);
  
  return {
    isAccessible,
    downloadUrl,
    routeUrl,
    canDownload: isAccessible && !!downloadUrl,
    needsRoutePage: isAccessible && !downloadUrl
  };
}
