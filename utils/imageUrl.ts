/**
 * Builds a URL for a Sanity image asset
 * 
 * @param ref - The Sanity image reference (e.g., "image-abc123-800x600-jpg")
 * @param options - Optional parameters for image transformation
 * @returns The full URL to the image
 */
export function imageUrlBuilder(ref: string, options?: {
  width?: number;
  height?: number;
  fit?: 'clip' | 'crop' | 'fill' | 'fillmax' | 'max' | 'scale' | 'min';
}): string {
  if (!ref) return '';
  
  // The typical image reference format is "image-{id}-{dimensions}-{format}"
  const segments = ref.split('-');
  
  // We expect at least 4 segments: "image", id, dimensions, format
  if (segments.length < 4 || segments[0] !== 'image') {
    console.error('Invalid image reference format:', ref);
    return '';
  }
  
  const id = segments[1];
  const format = segments[segments.length - 1]; // Last segment is the format
  
  const projectId = Deno.env.get("SANITY_PROJECT_ID") || "7lk3t6n2";
  const dataset = Deno.env.get("SANITY_DATASET") || "production";
  
  // Build the base URL
  let url = `https://cdn.sanity.io/images/${projectId}/${dataset}/${id}.${format}`;
  
  // Add query parameters for transformations if provided
  const params = new URLSearchParams();
  
  if (options) {
    if (options.width) params.append('w', options.width.toString());
    if (options.height) params.append('h', options.height.toString());
    if (options.fit) params.append('fit', options.fit);
  }
  
  // Add some default parameters if none were specified
  if (params.toString() === '') {
    params.append('w', '400');
    params.append('h', '400');
    params.append('fit', 'crop');
  }
  
  return `${url}?${params.toString()}`;
} 