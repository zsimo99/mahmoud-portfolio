import type { RequiredDataFromCollectionSlug } from 'payload'

// Used for pre-seeded content so that the homepage is not empty
export const homeStatic: RequiredDataFromCollectionSlug<'pages'> = {
  slug: 'home',
  _status: 'published',
  meta: {
    description: 'An open-source website built with Payload and Next.js.',
    title: 'Payload Website Template',
  },
  title: 'Home',
  layout: [
    {
      blockType: 'hero',
      title: "If it doesn't improve the experience, it doesn't belong",
      subtitle: 'Make it work. Make it simple. Make it memorable',
      badgeText: 'Say less',
      owner: {
        name: 'Mahmoud Moumen',
        role: 'UX Designer',
      },
    },
    {
      blockType: 'about',
      title: "Hi I'm Mahmoud Moumen",
      subtitle: 'User Experience',
      highlightWord: 'Designer',
      mobileTitle: "Hi I'm Mahmoud Moumen Digital Product Designer",
      description:
        'I design intuitive digital products that combine strategy, user experience, and clean visual design. From research and wireframes to polished interfaces, I create solutions that help businesses grow and users enjoy every interaction',
      mobileDescription:
        'UI/UX & Web Designer crafting clean, user friendly, and impactful digital experiences that balance creativity and usability',
      badgeText: 'Say less',
      contactText: 'Contact me',
      contactUrl: '#contact',
    },
    {
      blockType: 'slideSection',
      slides: [
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
    },
    {
      blockType: 'latestWork',
      title: 'Latest Work',
    },
    {
      blockType: 'contact',
      title: 'Tell us about your next Project',
      email: 'hello@mahmoud.co',
      subtitle: "Have a project in mind or just a quick query? We're ready to connect with you",
      profile: {
        name: 'Mahmoud Moumen',
        role: 'UX Designer',
      },
    },
  ],
}

