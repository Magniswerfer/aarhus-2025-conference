// schemas/keynoteSpeaker.ts
export default {
  name: 'keynoteSpeaker',
  type: 'document',
  title: 'Keynote Speaker',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      description: 'Professional title or role',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'bio',
      type: 'text',
      title: 'Biography',
      description: 'A brief biography of the speaker',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'image',
      type: 'image',
      title: 'Speaker Image',
      description: 'A professional photo of the speaker',
      options: {
        hotspot: true // Enables the hotspot functionality for better image cropping
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'photoCredit',
      type: 'string',
      title: 'Photo Credit',
      description: 'Credit for the photographer or source of the image (optional)'
    }
  ]
}; 