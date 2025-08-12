// routes/files.tsx
import { Handlers, PageProps } from "$fresh/server.ts";
import { client } from "../utils/sanity.ts";
import FileList from "../components/FileList.tsx";
import { FileUploadDocument } from "../utils/fileUtils.ts";

interface FilesPageData {
  files: FileUploadDocument[];
}

export default function FilesPage({ data }: PageProps<FilesPageData>) {
  const { files } = data;

  return (
    <div class="min-h-screen bg-gray-50 py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-gray-900 mb-4">File Downloads</h1>
          <p class="text-gray-600 max-w-3xl">
            Access conference materials, presentations, and documents. All files can be downloaded directly or viewed in your browser.
          </p>
        </div>

        {/* File List */}
        <FileList 
          files={files} 
          title="All Files"
          showCategory={false}
          showTags={false}
        />

        {/* Upload Instructions */}
        <div class="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 class="text-lg font-medium text-blue-900 mb-2">Need to upload a file?</h3>
          <p class="text-blue-800 mb-4">
            Content editors can upload new files through the Sanity Studio. Files will appear here automatically once uploaded.
          </p>
          <a
            href="/sanity-studio"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            Go to Sanity Studio
          </a>
        </div>
      </div>
    </div>
  );
}

export const handler: Handlers<FilesPageData> = {
  async GET(_req, ctx) {
    try {
      // Fetch all files
      const files = await client.fetch(
        `*[_type == "fileUpload"] | order(title asc) {
          _id,
          title,
          slug,
          file
        }`
      );

      return ctx.render({
        files: files || [],
      });
    } catch (error) {
      console.error("Error fetching files:", error);
      return ctx.render({
        files: [],
      });
    }
  },
};
