// /schemas/navigation.js
export default {
    name: 'navigation',
    type: 'document',
    title: 'Site Navigation',
    fields: [
      {
        name: 'items',
        type: 'array',
        title: 'Navigation Items',
        of: [
          {
            type: 'object',
            title: 'Navigation Item or Group',
            fields: [
              {
                name: 'title',
                type: 'string',
                title: 'Title',
                readOnly: true,
                description: 'Automatically generated from the referenced items'
              },
              {
                name: 'type',
                type: 'string',
                title: 'Type',
                options: {
                  list: [
                    { title: 'Single Item', value: 'single' },
                    { title: 'Group', value: 'group' }
                  ],
                  layout: 'radio'
                },
                validation: Rule => Rule.required()
              },
              {
                name: 'item',
                type: 'reference',
                to: [{ type: 'navigationItem' }],
                hidden: ({ parent }) => parent?.type !== 'single',
                validation: Rule => Rule.custom((field, context) => {
                  if (context.parent?.type === 'single' && !field) {
                    return 'Please select a navigation item'
                  }
                  return true
                })
              },
              {
                name: 'groupTitle',
                type: 'string',
                title: 'Group Title',
                hidden: ({ parent }) => parent?.type !== 'group',
                validation: Rule => Rule.custom((field, context) => {
                  if (context.parent?.type === 'group' && !field) {
                    return 'Please enter a group title'
                  }
                  return true
                })
              },
              {
                name: 'groupLink',
                type: 'object',
                title: 'Group Link (Optional)',
                hidden: ({ parent }) => parent?.type !== 'group',
                fields: [
                  {
                    name: 'linkType',
                    type: 'string',
                    title: 'Link Type',
                    options: {
                      list: [
                        { title: 'Internal Page', value: 'internal' },
                        { title: 'Custom Route', value: 'custom' }
                      ],
                      layout: 'radio'
                    }
                  },
                  {
                    name: 'internalPage',
                    type: 'reference',
                    to: [{ type: 'page' }],
                    hidden: ({ parent }) => parent?.linkType !== 'internal'
                  },
                  {
                    name: 'customRoute',
                    type: 'string',
                    title: 'Custom Route',
                    description: 'Enter a custom route (e.g., /about, /contact)',
                    hidden: ({ parent }) => parent?.linkType !== 'custom'
                  }
                ]
              },
              {
                name: 'groupItems',
                type: 'array',
                title: 'Group Items',
                hidden: ({ parent }) => parent?.type !== 'group',
                of: [{ type: 'reference', to: [{ type: 'navigationItem' }] }],
                validation: Rule => Rule.custom((field, context) => {
                  if (context.parent?.type === 'group' && (!field || field.length === 0)) {
                    return 'Please add at least one item to the group'
                  }
                  return true
                })
              }
            ],
            preview: {
              select: {
                type: 'type',
                itemTitle: 'item.title',
                groupTitle: 'groupTitle',
                groupItems: 'groupItems'
              },
              prepare({ type, itemTitle, groupTitle, groupItems }) {
                if (type === 'single') {
                  return {
                    title: itemTitle || 'No title'
                  }
                } else {
                  const items = groupItems?.map(item => item?.title).filter(Boolean) || []
                  return {
                    title: groupTitle || `List[${items.join(', ')}]`
                  }
                }
              }
            }
          }
        ]
      }
    ]
  }