import type { Block } from 'payload'

export const LatestWork: Block = {
  slug: 'latestWork',
  interfaceName: 'LatestWorkBlock',
  labels: {
    singular: 'Latest Work Section',
    plural: 'Latest Work Sections',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Latest Work',
      label: 'Section Heading',
      required: true,
    },
    {
      name: 'projects',
      type: 'array',
      label: 'Projects',
      labels: {
        singular: 'Project',
        plural: 'Projects',
      },
      defaultValue: [
        {
          category: 'UX Design',
          icon: 'glasses',
          backgroundColor: '#F46C4E',
          description:
            'Elaborate more on your ideas by writing body text here.\n\nYou can even **highlight certain words** to emphasize **key phrases or ideas**.',
          link: '#',
          tags: [
            { tag: 'UX DESIGN' },
            { tag: 'UI DESIGN' },
            { tag: 'PRODUCT DESIGN' },
          ],
        },
        {
          category: 'APPLICATION MOBILE',
          icon: 'spiral',
          backgroundColor: '#4D8BF8',
          description:
            'Focus on creating seamless **user experiences** through **effective coding** practices and responsive design.',
          link: '#',
          tags: [
            { tag: 'FRONT-END DEVELOPMENT' },
            { tag: 'BACK-END DEVELOPMENT' },
            { tag: 'FULL STACK DEVELOPMENT' },
          ],
        },
        {
          category: 'SAAS PLATFORM',
          icon: 'asterisk',
          backgroundColor: '#8CE054',
          description:
            'Utilize analytical skills to turn complex data into **actionable insights** and support decision-making processes.',
          link: '#',
          tags: [
            { tag: 'DATA VISUALIZATION' },
            { tag: 'DATA MINING' },
            { tag: 'BUSINESS INTELLIGENCE' },
          ],
        },
      ],
      fields: [
        {
          name: 'category',
          type: 'text',
          required: true,
          label: 'Category / Title',
        },
        {
          name: 'icon',
          type: 'select',
          defaultValue: 'glasses',
          label: 'Icon',
          options: [
            { label: 'Glasses / UX', value: 'glasses' },
            { label: 'Spiral / Mobile', value: 'spiral' },
            { label: 'Asterisk / SaaS', value: 'asterisk' },
            { label: 'Smartphone', value: 'smartphone' },
            { label: 'Layers', value: 'layers' },
          ],
        },
        {
          name: 'backgroundColor',
          type: 'text',
          defaultValue: '#F46C4E',
          label: 'Media Background Color',
          admin: {
            description: 'Hex or CSS color for the media card background (e.g. #F46C4E, #4D8BF8, #8CE054)',
          },
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Project Mockup Image',
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          label: 'Description',
          admin: {
            description: 'Supports markdown bold (**text**) to emphasize key words or phrases.',
          },
        },
        {
          name: 'link',
          type: 'text',
          defaultValue: '#',
          label: 'Project Link URL',
        },
        {
          name: 'tags',
          type: 'array',
          label: 'Tags',
          labels: {
            singular: 'Tag',
            plural: 'Tags',
          },
          fields: [
            {
              name: 'tag',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
  ],
}
