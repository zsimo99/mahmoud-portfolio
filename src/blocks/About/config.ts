import type { Block } from 'payload'

export const About: Block = {
  slug: 'about',
  interfaceName: 'AboutBlock',
  labels: {
    singular: 'About Section',
    plural: 'About Sections',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      defaultValue: "Hi I'm Mahmoud Moumen",
      label: 'Main Greeting / Title',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'text',
      defaultValue: 'User Experience',
      label: 'Subtitle Line',
    },
    {
      name: 'highlightWord',
      type: 'text',
      defaultValue: 'Designer',
      label: 'Highlight Word (Large)',
    },
    {
      name: 'mobileTitle',
      type: 'text',
      defaultValue: "Hi I'm Mahmoud Moumen Digital Product Designer",
      label: 'Mobile Heading Override',
      admin: {
        description: 'Heading shown on mobile screens (defaults to "Hi I\'m Mahmoud Moumen Digital Product Designer")',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      defaultValue:
        'I design intuitive digital products that combine strategy, user experience, and clean visual design. From research and wireframes to polished interfaces, I create solutions that help businesses grow and users enjoy every interaction',
      label: 'Desktop Description Paragraph',
    },
    {
      name: 'mobileDescription',
      type: 'textarea',
      defaultValue:
        'UI/UX & Web Designer crafting clean, user friendly, and impactful digital experiences that balance creativity and usability',
      label: 'Mobile Description',
    },
    {
      name: 'cardImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Featured Right Card Image (Blue Card)',
      admin: {
        description: 'Optional custom image. If not provided, the default blue graphic card will be used.',
      },
    },
    {
      name: 'badgeText',
      type: 'text',
      defaultValue: 'Say less',
      label: 'Card Floating Badge Text',
    },
    {
      name: 'cardProfile',
      type: 'group',
      label: 'Card Profile Overlay',
      fields: [
        {
          name: 'avatar',
          type: 'upload',
          relationTo: 'media',
          label: 'Profile Avatar',
        },
        {
          name: 'name',
          type: 'text',
          defaultValue: 'Mahmoud Moumen',
          label: 'Profile Name',
        },
        {
          name: 'role',
          type: 'text',
          defaultValue: 'UX Designer',
          label: 'Profile Role',
        },
        {
          name: 'bio',
          type: 'textarea',
          defaultValue:
            'UI/UX & Web Designer crafting clean, user friendly, and impactful digital experiences that balance creativity and usability',
          label: 'Card Profile Bio',
        },
      ],
    },
    {
      name: 'contactText',
      type: 'text',
      defaultValue: 'Contact me',
      label: 'Contact Link Text',
    },
    {
      name: 'contactUrl',
      type: 'text',
      defaultValue: '#contact',
      label: 'Contact Link URL',
    },
    {
      name: 'backgroundColor',
      type: 'text',
      defaultValue: '#f5f5f5',
      label: 'Section Background Color',
    },
  ],
}
