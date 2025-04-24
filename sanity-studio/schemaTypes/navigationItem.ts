export default {
    name: 'navigationItem',
    type: 'document',
    title: 'Navigation Item',
    fields: [
      {
        name: 'title',
        type: 'string',
        title: 'Title',
        validation: Rule => Rule.required()
      },
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
        },
        validation: Rule => Rule.required()
      },
      {
        name: 'internalPage',
        type: 'reference',
        to: [{ type: 'page' }],
        hidden: ({ parent }) => parent?.linkType !== 'internal',
        validation: Rule => Rule.custom((field, context) => {
          if (context.parent?.linkType === 'internal' && !field) {
            return 'Please select a page'
          }
          return true
        })
      },
      {
        name: 'customRoute',
        type: 'string',
        title: 'Custom Route',
        description: 'Enter a custom route (e.g., /about, /contact)',
        hidden: ({ parent }) => parent?.linkType !== 'custom',
        validation: Rule => Rule.custom((field, context) => {
          if (context.parent?.linkType === 'custom' && !field) {
            return 'Please enter a custom route'
          }
          return true
        })
      }
    ]
  } 