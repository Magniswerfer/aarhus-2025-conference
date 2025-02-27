// schemaTypes/organizers.js
export default {
    name: 'organisers',
    title: 'Organisers',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Page Title',
        type: 'string',
        description: 'Title for the organisers page'
      },
      {
        name: 'description',
        title: 'Page Description',
        type: 'text',
        description: 'Brief description for the organisers page'
      },
      {
        name: 'committees',
        title: 'Committees',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              {
                name: 'title',
                title: 'Committee Title',
                type: 'string',
                description: 'E.g. "General Chairs", "Program Chairs"'
              },
              {
                name: 'email',
                title: 'Contact Email',
                type: 'string',
                description: 'Email address for contacting the committee (optional)'
              },
              {
                name: 'members',
                title: 'Committee Members',
                type: 'array',
                of: [
                  {
                    type: 'object',
                    fields: [
                      {
                        name: 'name',
                        title: 'Name',
                        type: 'string'
                      },
                      {
                        name: 'affiliation',
                        title: 'Affiliation',
                        type: 'string'
                      }
                    ],
                    preview: {
                      select: {
                        title: 'name',
                        subtitle: 'affiliation'
                      }
                    }
                  }
                ]
              },
              {
                name: 'specialNote',
                title: 'Special Note',
                type: 'text',
                description: 'Optional note to display below the committee (e.g. thanking former chairs)'
              }
            ],
            preview: {
              select: {
                title: 'title',
                subtitle: 'email'
              }
            }
          }
        ]
      },
      {
        name: 'footerNote',
        title: 'Footer Note',
        type: 'text',
        description: 'Note to display at the bottom of the page'
      }
    ]
  }