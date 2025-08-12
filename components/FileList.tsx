// components/FileList.tsx
import { FileUploadDocument, getFileAccessibilityInfo, getFileIcon } from "../utils/fileUtils.ts";

interface FileListProps {
  files: FileUploadDocument[];
  title?: string;
  showCategory?: boolean;
  showTags?: boolean;
}

export default function FileList({ files, title = "Files", showCategory = true, showTags = true }: FileListProps) {
  if (!files || files.length === 0) {
    return (
      <div class="text-center py-8">
        <p class="text-gray-500">No files available</p>
      </div>
    );
  }

  return (
    <div class="bg-white rounded-lg shadow">
      {title && (
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-medium text-gray-900">{title}</h3>
        </div>
      )}
      
      <div class="divide-y divide-gray-200">
        {files.map((file) => {
          const fileInfo = getFileAccessibilityInfo(file);
          const icon = getFileIcon(file.file.asset.mimeType);
          
          return (
            <div key={file._id} class="px-6 py-4 hover:bg-gray-50 transition-colors">
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-3">
                  <span class="text-2xl">{icon}</span>
                  <div class="flex-1 min-w-0">
                                         <h4 class="text-sm font-medium text-gray-900 truncate">
                       {file.title}
                     </h4>
                                         <div class="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                       <span class="text-gray-400">
                         {file.file.asset.originalFilename || 'File'}
                       </span>
                     </div>
                  </div>
                </div>
                
                <div class="flex items-center space-x-2">
                  {fileInfo.canDownload && fileInfo.downloadUrl ? (
                    <a
                      href={fileInfo.downloadUrl}
                      download={file.file.asset.originalFilename}
                      class="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                      title={`Download ${file.title}`}
                    >
                      <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Download
                    </a>
                  ) : fileInfo.needsRoutePage ? (
                    <a
                      href={fileInfo.routeUrl}
                      class="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                      title={`View ${file.title}`}
                    >
                      <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      View
                    </a>
                  ) : (
                    <span class="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-400 bg-gray-100 cursor-not-allowed">
                      Not Available
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
