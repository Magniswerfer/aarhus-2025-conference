// schemas/committee.js
export default {
    name: 'committee',
    type: 'document',
    title: 'Committee',
    fields: [
      {
        name: 'title',
        type: 'string',
        title: 'Committee Title'
      },
      {
        name: 'committeeType',
        type: 'string',
        title: 'Committee Type',
        description: 'For example: papers, critiques, etc.',
        options: {
          list: [
            { title: 'Papers', value: 'papers' },
            { title: 'Critiques', value: 'critiques' }
          ]
        }
      },
      {
        name: 'members',
        type: 'array',
        title: 'Members',
        of: [
          {
            type: 'object',
            name: 'member',
            title: 'Committee Member',
            fields: [
              {
                name: 'name',
                type: 'string',
                title: 'Name'
              },
              {
                name: 'affiliation',
                type: 'string',
                title: 'Affiliation'
              }
            ]
          }
        ]
      }
    ]
  };