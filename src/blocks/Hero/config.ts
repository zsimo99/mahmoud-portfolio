import type { Block } from 'payload'
import { linkGroup } from '../../fields/linkGroup'

export const Hero: Block = {
  slug: 'hero',
  interfaceName: 'HeroBlock',
  labels: {
    singular: 'Hero',
    plural: 'Heroes',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: "If it doesn't improve the experience, it doesn't belong",
      label: 'Title',
    },
    {
      name: 'subtitle',
      type: 'textarea',
      defaultValue: 'Make it work. Make it simple. Make it memorable',
      label: 'Subtitle',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: false,
          label: 'Featured Right Image (Desktop)',
          admin: {
            width: '50%',
            description: 'Displayed on the right side on desktop screens with stacked card effect',
          },
        },
        {
          name: 'backgroundImage',
          type: 'upload',
          relationTo: 'media',
          required: false,
          label: 'Hero Background Image',
          admin: {
            width: '50%',
            description: 'Full landscape background image (e.g. green hills/sky)',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'badgeText',
          type: 'text',
          defaultValue: 'Say less',
          label: 'Floating Badge Text',
          admin: {
            width: '50%',
            description: 'Optional floating pill badge on the featured image (e.g. "Say less")',
          },
        },
        {
          name: 'badgeLink',
          type: 'text',
          label: 'Badge Link',
          admin: {
            width: '50%',
            description: 'Optional link for the badge (e.g. #contact or /contact)',
          },
        },
      ],
    },
    {
      name: 'owner',
      type: 'group',
      label: 'Owner Card (Mobile)',
      admin: {
        description: 'Appears as a glassmorphic card on mobile devices with owner avatar, name, and role',
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'name',
              type: 'text',
              defaultValue: 'Mahmoud Moumen',
              label: 'Owner Name',
              admin: {
                width: '50%',
              },
            },
            {
              name: 'role',
              type: 'text',
              defaultValue: 'UX Designer',
              label: 'Owner Role',
              admin: {
                width: '50%',
              },
            },
          ],
        },
        {
          name: 'avatar',
          type: 'upload',
          relationTo: 'media',
          label: 'Owner Avatar Image',
        },
      ],
    },
    linkGroup({
      appearances: ['default', 'outline'],
      overrides: {
        maxRows: 2,
      },
    }),
  ],
}
