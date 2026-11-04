import type { Block } from 'payload'

export const SlideSection: Block = {
  slug: 'slideSection',
  interfaceName: 'SlideSectionBlock',
  labels: {
    singular: 'Slide Section',
    plural: 'Slide Sections',
  },
  fields: [
    {
      name: 'slides',
      type: 'array',
      required: true,
      minRows: 1,
      label: 'Slides',
      labels: {
        singular: 'Slide',
        plural: 'Slides',
      },
      defaultValue: [
        {
          title: 'UX\nRESEARCH',
          text: 'Dive deeper into your thoughts by expanding on your UX research findings here.\n\nFeel free to emphasize certain terms to highlight important concepts or insights.',
          highlightWords: 'emphasize',
          highlightColor: '#FFA38F',
          backgroundColor: '#E14D2A',
          imagePosition: 'bottom',
        },
        {
          text: 'Designing with intent and curiosity. Every detail is crafted to provide *clarity* and create *delightful* user experiences.\n\nSimplicity is not the lack of clutter, but the presence of *purpose*.',
          highlightWords: 'clarity, delightful, purpose',
          highlightColor: '#FF6B4A',
          backgroundColor: '#000000',
          imagePosition: 'center',
        },
      ],
      fields: [
        {
          name: 'title',
          type: 'textarea',
          label: 'Slide Title (Optional)',
          admin: {
            rows: 2,
            description:
              'Optional big title displayed before/above the image (e.g. "UX\\nRESEARCH" or "UX STRATEGIST"). Leave empty for slides without a title.',
          },
        },
        {
          name: 'text',
          type: 'textarea',
          required: true,
          label: 'Textarea Content',
          admin: {
            description:
              'Wrap words in *asterisks* (e.g. *insights*) or {curly braces} to highlight them in the highlight color. Separate paragraphs with empty lines.',
            rows: 6,
          },
        },
        {
          type: 'row',
          fields: [
            {
              name: 'highlightWords',
              type: 'text',
              label: 'Words to Highlight',
              admin: {
                width: '50%',
                description: 'Comma-separated words to highlight in accent color (e.g. "insights, highlight")',
              },
            },
            {
              name: 'highlightColor',
              type: 'text',
              defaultValue: '#FF6B4A',
              label: 'Highlight Color',
              admin: {
                width: '50%',
                description: 'Hex or CSS color (default: #FF6B4A orange/coral)',
              },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              label: 'Graphic / Card Image',
              admin: {
                width: '50%',
                description: 'Graphic shown on the slide',
              },
            },
            {
              name: 'imagePosition',
              type: 'select',
              defaultValue: 'bottom',
              label: 'Image Position',
              options: [
                {
                  label: 'Bottom (Anchored to bottom)',
                  value: 'bottom',
                },
                {
                  label: 'Center (Vertically centered)',
                  value: 'center',
                },
              ],
              admin: {
                width: '50%',
                description: 'Align the image to the bottom edge or center it vertically',
              },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'backgroundColor',
              type: 'text',
              defaultValue: '#000000',
              label: 'Background Color',
              admin: {
                width: '50%',
                description: 'Hex or CSS color (e.g. #E14D2A or #000000)',
              },
            },
            {
              name: 'textColor',
              type: 'text',
              defaultValue: '#ffffff',
              label: 'Text Color',
              admin: {
                width: '50%',
                description: 'Hex or CSS color for default text (default: #ffffff)',
              },
            },
          ],
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'showCounter',
          type: 'checkbox',
          defaultValue: false,
          label: 'Show Slide Numbers (e.g. 01 / 02)',
          admin: {
            width: '50%',
          },
        },
        {
          name: 'enableAutoplay',
          type: 'checkbox',
          defaultValue: false,
          label: 'Enable Autoplay',
          admin: {
            width: '50%',
          },
        },
      ],
    },
  ],
}
