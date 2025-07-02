// schemaTypes/page.ts
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'page',
  title: 'Pages',
  type: 'document',
  fields: [
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'The URL path for this page (e.g., "about", "program")',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Description',
      description: 'Brief description for SEO and page headers',
      type: 'text',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'}
          ],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'}
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'string',
                    title: 'URL'
                  },
                  {
                    name: 'targetBlank',
                    type: 'boolean',
                    title: 'Open in new tab',
                    initialValue: false
                  }
                ]
              }
            ]
          },
          lists: [
            {title: 'Bullet', value: 'bullet'},
            {title: 'Numbered', value: 'number'}
          ]
        }
      ]
    }),
    defineField({
      name: 'image',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string'
        }
      ]
    }),
    defineField({
      name: 'layoutType',
      title: 'Layout Type',
      type: 'string',
      options: {
        list: [
          {title: 'Standard Full Width', value: 'standard'},
          {title: 'Two Column with Image', value: 'twoColumn'}
        ],
      },
      initialValue: 'standard',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'imagePosition',
      title: 'Image Position',
      type: 'string',
      options: {
        list: [
          {title: 'Right', value: 'right'},
          {title: 'Left', value: 'left'}
        ]
      },
      initialValue: 'right',
      hidden: ({document}) => document?.layoutType !== 'twoColumn'
    }),
    defineField({
      name: 'showAcceptedPublications',
      title: 'Show Accepted Publications',
      type: 'boolean',
      description: 'Include Accepted Publications sections on this page',
      initialValue: false
    }),
    defineField({
      name: 'acceptedPublications',
      title: 'Accepted Publications',
      type: 'array',
      description: 'Upload CSV files with accepted publications. Each CSV should have headers: Title, Author, Abstract',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'sectionTitle',
              title: 'Section Title (H2)',
              type: 'string',
              description: 'Header text that will appear above this publication list',
              validation: (Rule) => Rule.required()
            },
            {
              name: 'csvFile',
              title: 'CSV File',
              type: 'file',
              description: 'CSV FORMAT: Headers must be "Title, Author, Abstract". AUTHOR FIELD: Use semicolons (;) to separate multiple authors. For affiliations, use "Name: Affiliation1, Affiliation2". EXAMPLES: Single author: "John Smith: University of Copenhagen" | Multiple authors: "John Smith: University of Copenhagen; Jane Doe: MIT" | The CSV supports line breaks within quoted fields for multi-line abstracts.',
              options: {
                accept: '.csv'
              },
              validation: (Rule) => Rule.required()
            }
          ],
          preview: {
            select: {
              title: 'sectionTitle',
              subtitle: 'csvFile.asset.originalFilename'
            }
          }
        }
      ],
      hidden: ({document}) => !document?.showAcceptedPublications
    })

  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'slug.current',
      layout: 'layoutType',
      media: 'image'
    },
    prepare({title, subtitle, layout, media}) {
      return {
        title,
        subtitle: `/${subtitle} (${layout} layout)`,
        media
      }
    }
  }
})