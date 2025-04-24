export default {
    name: 'acceptedWorkshop',
    title: 'Accepted Workshops',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Title',
        type: 'string',
        validation: Rule => Rule.required()
      },
      {
        name: 'contactName',
        title: 'Contact Name',
        type: 'string',
        validation: Rule => Rule.required()
      },
      {
        name: 'contactEmail',
        title: 'Contact Email',
        type: 'string',
        validation: Rule => Rule.required().email()
      },
      {
        name: 'workshopDocument',
        title: 'Workshop Document URL',
        type: 'url',
        validation: Rule => Rule.required()
      },
      {
        name: 'description',
        title: 'Description',
        type: 'text',
        validation: Rule => Rule.required()
      },
      {
        name: 'website',
        title: 'Website URL',
        type: 'url'
      }
    ],
    preview: {
      select: {
        title: 'title',
        subtitle: 'contactName'
      }
    }
  }
  