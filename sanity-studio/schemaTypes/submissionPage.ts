export default {
    name: 'submissionPage',
    title: 'Submission Pages',
    type: 'document',
    fields: [
      {
        name: 'type',
        title: 'Submission Type',
        type: 'string',
        options: {
          list: [
            {title: 'Papers', value: 'papers'},
            {title: 'Critiques', value: 'critiques'},
            {title: 'Workshops', value: 'workshops'},
            {title: 'Work in Progress', value: 'work-in-progress'},
            {title: 'Demos', value: 'demos'},
            {title: 'Doctoral Consortium', value: 'doctoral-consortium'}
          ]
        },
        validation: Rule => Rule.required()
      },
      {
        name: 'title',
        title: 'Title',
        type: 'string',
        validation: Rule => Rule.required()
      },
      {
        name: 'description',
        title: 'Description',
        type: 'text',
        validation: Rule => Rule.required()
      },
      {
        name: 'submissionDates',
        title: 'Submission Dates',
        type: 'object',
        fields: [
          {
            name: 'deadline',
            title: 'Deadline',
            type: 'string',
            validation: Rule => Rule.required()
          },
          {
            name: 'notification',
            title: 'Notification',
            type: 'string',
            validation: Rule => Rule.required()
          },
          {
            name: 'cameraReady',
            title: 'Camera Ready',
            type: 'string'
          },
          {
            name: 'customDates',
            title: 'Custom Dates',
            type: 'array',
            of: [
              {
                type: 'object',
                fields: [
                  {
                    name: 'date',
                    title: 'Date',
                    type: 'string',
                    validation: Rule => Rule.required()
                  },
                  {
                    name: 'label',
                    title: 'Label',
                    type: 'string',
                    validation: Rule => Rule.required()
                  }
                ]
              }
            ]
          }
        ]
      },
      {
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
                    }
                  ]
                }
              ]
            }
          },
          {
            type: 'object',
            name: 'bulletList',
            title: 'Bullet List',
            fields: [
              {
                name: 'items',
                title: 'Items',
                type: 'array',
                of: [{type: 'text'}]
              }
            ]
          }
        ]
      },
      {
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
      }
    ],
    preview: {
      select: {
        title: 'title',
        subtitle: 'type'
      }
    }
  }