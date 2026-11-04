import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'

export const Header: GlobalConfig = {
  slug: 'header',
  label: 'Navigation Dock',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'dockItems',
      type: 'array',
      label: 'Dock Apps / Navigation Items',
      labels: {
        singular: 'Dock App',
        plural: 'Dock Apps',
      },
      defaultValue: [
        {
          label: 'About Mahmoud',
          url: '#about',
          image: null,
        },
        {
          label: 'Latest Work',
          url: '#work',
          image: null,
        },
        {
          label: 'UX Research & Case Studies',
          url: '#experience',
          image: null,
        },
        {
          label: 'Get in Touch',
          url: '#contact',
          image: null,
        },
      ],
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
              label: 'Label / Tooltip',
              admin: {
                width: '50%',
              },
            },
            {
              name: 'url',
              type: 'text',
              required: true,
              label: 'Destination URL (e.g. #about, #work, #contact or /page)',
              admin: {
                width: '50%',
              },
            },
          ],
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: false,
          label: 'Custom App Icon (Image)',
          admin: {
            description: 'Custom squircle icon image for this dock item (PNG/SVG/WebP)',
          },
        },
        {
          type: 'row',
          fields: [
            {
              name: 'backgroundColor',
              type: 'text',
              label: 'App Background Color',
              admin: {
                width: '50%',
                description: 'Hex / CSS color for the squircle background (e.g. #87C3FC, #9CE87E, #FB8361, #FED443)',
              },
            },
            {
              name: 'newTab',
              type: 'checkbox',
              label: 'Open in new tab',
              defaultValue: false,
              admin: {
                width: '50%',
                style: {
                  alignSelf: 'center',
                },
              },
            },
          ],
        },
      ],
      admin: {
        initCollapsed: false,
        components: {
          RowLabel: '@/Header/RowLabel#RowLabel',
        },
      },
    },
    {
      name: 'socialStack',
      type: 'group',
      label: 'Socials / Stacked Card (Right Side of Dock)',
      fields: [
        {
          name: 'stackImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Custom 3D Stack Image',
          admin: {
            description: 'Optional custom stacked cards icon image. Defaults to the built-in 3D cards.',
          },
        },
        {
          name: 'socialLinks',
          type: 'array',
          label: 'Social Quick Links (Pop-up on hover / click)',
          defaultValue: [
            { platform: 'Instagram', url: 'https://instagram.com', color: '#E4405F' },
            { platform: 'LinkedIn', url: 'https://linkedin.com', color: '#0A66C2' },
            { platform: 'Email', url: 'mailto:hello@mahmoud.co', color: '#0078D4' },
            { platform: 'Phone', url: 'tel:+1234567890', color: '#25D366' },
          ],
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'platform',
                  type: 'text',
                  required: true,
                  label: 'Platform Label (e.g. Instagram, LinkedIn, Email)',
                  admin: {
                    width: '33%',
                  },
                },
                {
                  name: 'url',
                  type: 'text',
                  required: true,
                  label: 'URL / mailto / tel',
                  admin: {
                    width: '34%',
                  },
                },
                {
                  name: 'color',
                  type: 'text',
                  label: 'Accent Color (Hex e.g. #0A66C2)',
                  admin: {
                    width: '33%',
                  },
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'dockCapsule',
      type: 'group',
      label: 'Main Dock Bar Appearance',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'backgroundColor',
              type: 'text',
              label: 'Dock Capsule Background Color',
              defaultValue: '#728f3a',
              admin: {
                width: '50%',
                description: 'Hex or CSS color for the main outer pill (e.g. #728f3a, #1a1a1a, rgba(114, 143, 58, 0.8))',
              },
            },
            {
              name: 'opacity',
              type: 'number',
              label: 'Background Opacity (%)',
              defaultValue: 80,
              min: 0,
              max: 100,
              admin: {
                width: '50%',
                description: 'Transparency percentage for the glassmorphism pill effect (0 - 100)',
              },
            },
          ],
        },
      ],
    },
    // Backwards-compatible legacy navItems field so existing seed scripts and types stay 100% compatible
    {
      name: 'navItems',
      type: 'array',
      admin: {
        hidden: true,
      },
      fields: [
        link({
          appearances: false,
        }),
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
