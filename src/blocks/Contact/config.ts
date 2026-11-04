import type { Block } from 'payload'

export const Contact: Block = {
  slug: 'contact',
  interfaceName: 'ContactBlock',
  labels: {
    singular: 'Contact Section',
    plural: 'Contact Sections',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Tell us about your next Project',
      label: 'Heading Title',
      required: true,
    },
    {
      name: 'email',
      type: 'text',
      defaultValue: 'hello@mahmoud.co',
      label: 'Contact Email in Heading',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'textarea',
      defaultValue: "Have a project in mind or just a quick query? We're ready to connect with you",
      label: 'Subtitle',
    },
    {
      name: 'profile',
      type: 'group',
      label: 'Profile Card',
      fields: [
        {
          name: 'name',
          type: 'text',
          defaultValue: 'Mahmoud Moumen',
          label: 'Card Title / Name',
        },
        {
          name: 'role',
          type: 'text',
          defaultValue: 'UX Designer',
          label: 'Card Subtitle / Role',
        },
        {
          name: 'avatar',
          type: 'upload',
          relationTo: 'media',
          label: 'Card Avatar / Image',
        },
      ],
    },
    {
      name: 'socialLinks',
      type: 'array',
      label: 'Social Links',
      labels: {
        singular: 'Social Link',
        plural: 'Social Links',
      },
      defaultValue: [
        {
          platform: 'linkedin',
          label: 'LinkedIn',
          url: 'https://linkedin.com',
        },
        {
          platform: 'dribbble',
          label: 'Dribbble',
          url: 'https://dribbble.com',
        },
        {
          platform: 'github',
          label: 'GitHub',
          url: 'https://github.com',
        },
        {
          platform: 'twitter',
          label: 'Twitter / X',
          url: 'https://x.com',
        },
      ],
      fields: [
        {
          name: 'platform',
          type: 'select',
          defaultValue: 'linkedin',
          options: [
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'Dribbble', value: 'dribbble' },
            { label: 'GitHub', value: 'github' },
            { label: 'Twitter / X', value: 'twitter' },
            { label: 'Instagram', value: 'instagram' },
            { label: 'Website / Other', value: 'custom' },
          ],
        },
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      label: 'Form (from Form Builder)',
      required: false,
      admin: {
        description: 'Select a form built with the Form Builder plugin. The fields, submit button label, and confirmation message will be dynamically loaded from this form.',
      },
    },
  ],
}
