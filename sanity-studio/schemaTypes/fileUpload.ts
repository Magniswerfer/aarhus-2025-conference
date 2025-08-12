// schemaTypes/fileUpload.ts
import { defineType, defineField } from 'sanity'

/**
 * File Upload Schema
 * 
 * HOW IT WORKS:
 * 1. Upload your file and fill in the title
 * 2. The slug is automatically generated from the title
 * 3. The file becomes accessible at: yoursite.com/files/[slug]
 * 4. Users can download files directly or view them in their browser
 * 
 * TIP: Use descriptive titles to create clear, memorable URLs!
 */

export default defineType({
  name: 'fileUpload',
  title: 'File Uploads',
  type: 'document',
  icon: () => '📁',
  description: 'Upload files that will be publicly accessible via your website. Files are automatically assigned slugs based on the title.',
  fields: [
    defineField({
      name: 'title',
      title: 'File Title',
      type: 'string',
      description: 'A descriptive name for the file. This will be used to generate the URL slug. Example: "Conference Schedule 2025" creates the URL: yoursite.com/files/conference-schedule-2025',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'The unique identifier for this file (used in URLs). This is automatically generated from the title and creates clean, memorable URLs. Link to the file: yoursite.com/files/[slug] or internal link: /files/[slug]',
      options: {
        source: 'title',
        maxLength: 96,
        slugify: (input: string) => input
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^\w\-]+/g, '')
          .replace(/\-\-+/g, '-')
          .replace(/^-+/, '')
          .replace(/-+$/, '')
      },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'file',
      title: 'File',
      type: 'file',
      description: 'Upload the file. Supported formats: PDF, DOC, DOCX, PPT, PPTX, XLS, XLSX, TXT, RTF, ZIP, RAR, MP4, MP3, JPG, PNG, GIF, SVG, WebP. Maximum file size: 100MB.',
      options: {
        accept: '.pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt,.rtf,.zip,.rar,.mp4,.mp3,.jpg,.jpeg,.png,.gif,.svg,.webp'
      },
      validation: (Rule) => Rule.required()
    })
  ],
  preview: {
    select: {
      title: 'title',
      file: 'file.asset.originalFilename',
      media: 'file'
    },
    prepare(selection) {
      const {title, file} = selection
      return {
        title: title || 'Untitled File',
        subtitle: file || 'No file',
        media: selection.media
      }
    }
  },
  orderings: [
    {
      title: 'Title, A-Z',
      name: 'titleAsc',
      by: [{field: 'title', direction: 'asc'}]
    },
    {
      title: 'Title, Z-A',
      name: 'titleDesc',
      by: [{field: 'title', direction: 'desc'}]
    }
  ]
})
