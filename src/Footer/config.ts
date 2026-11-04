import type { GlobalConfig } from 'payload'

import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      defaultValue: 'Mahmoud Moumen',
      label: 'Name',
    },
    {
      name: 'role',
      type: 'text',
      defaultValue: 'UX Designer',
      label: 'Role / Designation',
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
      label: 'Avatar Photo',
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Landscape Background Image',
    },
    {
      name: 'socialLinks',
      type: 'array',
      label: 'Social Links',
      defaultValue: [
        { platform: 'twitter', url: 'https://x.com' },
        { platform: 'facebook', url: 'https://facebook.com' },
        { platform: 'instagram', url: 'https://instagram.com' },
        { platform: 'linkedin', url: 'https://linkedin.com' },
      ],
      fields: [
        {
          name: 'platform',
          type: 'select',
          defaultValue: 'twitter',
          options: [
            { label: 'Twitter / X', value: 'twitter' },
            { label: 'Facebook', value: 'facebook' },
            { label: 'Instagram', value: 'instagram' },
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'GitHub', value: 'github' },
            { label: 'Dribbble', value: 'dribbble' },
          ],
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'copyright',
      type: 'text',
      defaultValue: '© 2026 Mahmoud. All rights reserved.',
      label: 'Copyright Text',
    },
    {
      name: 'legalLinks',
      type: 'array',
      label: 'Legal Links (Bottom Right)',
      defaultValue: [
        { label: 'Privacy Policy', url: '#' },
        { label: 'Terms of Service', url: '#' },
        { label: 'Security', url: '#' },
      ],
      fields: [
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
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
