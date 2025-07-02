export default {
    name: 'acceptedPublication',
    title: 'Accepted Publications',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Title',
        type: 'string',
        validation: Rule => Rule.required()
      },
      {
        name: 'author',
        title: 'Author',
        type: 'string',
        validation: Rule => Rule.required()
      },
      {
        name: 'abstract',
        title: 'Abstract',
        type: 'text',
        validation: Rule => Rule.required()
      }
    ],
    preview: {
      select: {
        title: 'title',
        subtitle: 'author'
      }
    }
  } 