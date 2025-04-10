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
      name: 'showConferenceDates',
      title: 'Show Conference Dates',
      type: 'boolean',
      description: 'Include a Conference Dates section on this page',
      initialValue: false
    }),
    defineField({
      name: 'showContributionTypes',
      title: 'Show Contribution Types Grid',
      type: 'boolean',
      description: 'Include a Contribution Types Grid on this page',
      initialValue: false
    }),
    defineField({
      name: 'showInNavigation',
      title: 'Show in Navigation',
      type: 'boolean',
      description: 'Whether to include this page in the main navigation',
      initialValue: false
    }),
    defineField({
      name: 'navigationOrder',
      title: 'Navigation Order',
      type: 'number',
      description: 'Order in which to display in navigation (lower numbers appear first)',
      hidden: ({document}) => !document?.showInNavigation
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