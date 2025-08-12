// routes/files/[slug].tsx
import { Handlers, PageProps } from "$fresh/server.ts";
import { client } from "../../utils/sanity.ts";

interface FileData {
  title: string;
  slug: string;
  fileUrl: string;
  fileName: string;
  fileType: string;
}

export default function FileDownloadPage({ data }: PageProps<FileData>) {
  return (
    <div class="min-h-screen bg-gray-50 py-12">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white rounded-lg shadow-lg p-8">
          <div class="text-center">
            <h1 class="text-3xl font-bold text-gray-900 mb-4">
              {data.title}
            </h1>
            
            <div class="bg-gray-100 rounded-lg p-6 mb-8">
              <div class="flex items-center justify-center space-x-4 mb-4">
                <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div class="text-left">
                  <p class="text-sm text-gray-500">File Type</p>
                  <p class="font-medium text-gray-900">{data.fileType || 'File'}</p>
                </div>
              </div>
              
              <a
                href={data.fileUrl}
                download={data.fileName}
                class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download File
              </a>
              
              <p class="text-xs text-gray-500 mt-2">
                Click to download: {data.fileName}
              </p>
            </div>
            
            <div class="text-center">
              <a
                href="/"
                class="text-blue-600 hover:text-blue-800 font-medium"
              >
                ← Back to Home
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const handler: Handlers<FileData> = {
  async GET(_req, ctx) {
    try {
      const { slug } = ctx.params;

      // Query Sanity for the file data
      const data = await client.fetch(
        `*[_type == "fileUpload" && slug.current == $slug][0]{
          title,
          "slug": slug.current,
          "fileUrl": file.asset->url,
          "fileName": file.asset->originalFilename,
          "fileType": file.asset->mimeType
        }`,
        { slug }
      );

      if (!data) {
        return ctx.renderNotFound();
      }

      // Check if file URL exists
      if (!data.fileUrl) {
        return new Response("File not found", { status: 404 });
      }

      // Redirect directly to the Sanity CDN URL
      return new Response(null, {
        status: 302,
        headers: {
          'Location': data.fileUrl,
          'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
        }
      });
    } catch (error) {
      console.error(`Error fetching file with slug '${ctx.params.slug}':`, error);
      return new Response("Internal Server Error", { status: 500 });
    }
  },
};
