import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'navigationItem',
  title: 'Navigation Item',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'isTopLevel',
      type: 'boolean',
      title: 'Top Level Item',
      description: 'Is this a top-level navigation item? If unchecked, this item can only be used in dropdowns.',
      initialValue: true
    }),
    defineField({
      name: 'type',
      type: 'string',
      title: 'Type',
      options: {
        list: [
          {title: 'Link', value: 'link'},
          {title: 'Dropdown', value: 'dropdown'},
          {title: 'Dropdown with Link', value: 'dropdownWithLink'}
        ]
      },
      initialValue: 'link',
      validation: (Rule) => Rule.required(),
      hidden: ({parent}) => !parent?.isTopLevel
    }),
    defineField({
      name: 'linkType',
      type: 'string',
      title: 'Link Type',
      options: {
        list: [
          {title: 'Sanity Page', value: 'page'},
          {title: 'Custom Route', value: 'custom'}
        ]
      },
      initialValue: 'page',
      validation: (Rule) => Rule.required(),
      hidden: ({parent}) => {
        if (parent?.isTopLevel) {
          return parent?.type === 'dropdown'
        }
        return false
      }
    }),
    defineField({
      name: 'pageReference',
      type: 'reference',
      to: [{type: 'page'}, {type: 'submissionPage'}],
      title: 'Page Reference',
      description: 'Reference to a Sanity page or submission page',
      validation: (Rule) => Rule.custom((value, context) => {
        if (context.parent?.linkType === 'page' && !value) {
          return 'Page reference is required when link type is Sanity Page'
        }
        return true
      }),
      hidden: ({parent}) => {
        if (!parent?.isTopLevel) {
          return parent?.linkType !== 'page'
        }
        return parent?.type === 'dropdown' || parent?.linkType !== 'page'
      }
    }),
    defineField({
      name: 'customPath',
      type: 'string',
      title: 'Custom Path',
      description: 'The path for custom routes (e.g., "/programme", "/registration")',
      validation: (Rule) => Rule.custom((value, context) => {
        if (context.parent?.linkType === 'custom' && !value) {
          return 'Custom path is required when link type is Custom Route'
        }
        return true
      }),
      hidden: ({parent}) => {
        if (!parent?.isTopLevel) {
          return parent?.linkType !== 'custom'
        }
        return parent?.type === 'dropdown' || parent?.linkType !== 'custom'
      }
    }),
    defineField({
      name: 'order',
      type: 'number',
      title: 'Order',
      description: 'Order in which to display in navigation (lower numbers appear first)',
      validation: (Rule) => Rule.required(),
      hidden: ({parent}) => !parent?.isTopLevel
    }),
    defineField({
      name: 'dropdownItems',
      type: 'array',
      title: 'Dropdown Items',
      of: [
        {
          type: 'reference',
          to: [{type: 'navigationItem'}]
        }
      ],
      hidden: ({parent}) => !parent?.isTopLevel || !['dropdown', 'dropdownWithLink'].includes(parent?.type)
    })
  ],
  preview: {
    select: {
      title: 'title',
      isTopLevel: 'isTopLevel',
      type: 'type',
      order: 'order'
    },
    prepare({title, isTopLevel, type, order}) {
      return {
        title,
        subtitle: `${isTopLevel ? 'Top Level' : 'Dropdown Item'}${type ? ` (${type})` : ''}${order ? ` [${order}]` : ''}`
      }
    }
  }
}) 