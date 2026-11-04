'use client'

import React from 'react'
import type { Media as MediaType } from '@/payload-types'
import { Media } from '@/components/Media'
import Link from 'next/link'
import { Oswald } from 'next/font/google'
import { cn } from '@/utilities/ui'
import { ArrowRight, Glasses, Smartphone, Layers } from 'lucide-react'

const oswald = Oswald({
  subsets: ['latin'],
  weight: ['700'],
  display: 'swap',
})

export type LatestWorkProject = {
  category: string
  icon?: 'glasses' | 'spiral' | 'asterisk' | 'smartphone' | 'layers' | string | null
  backgroundColor?: string | null
  image?: MediaType | string | null
  description?: string | null
  link?: string | null
  tags?: Array<{
    tag: string
    id?: string | null
  }> | null
  id?: string | null
}

export type LatestWorkBlockProps = {
  blockType?: 'latestWork'
  title?: string | null
  projects?: LatestWorkProject[] | null
}

const defaultProjects: LatestWorkProject[] = [
  {
    category: 'UX Design',
    icon: 'glasses',
    backgroundColor: '#F46C4E',
    image: '/media/latest-work-ux.jpg',
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
    image: '/media/latest-work-mobile.jpg',
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
    image: '/media/latest-work-saas.jpg',
    description:
      'Utilize analytical skills to turn complex data into **actionable insights** and support decision-making processes.',
    link: '#',
    tags: [
      { tag: 'DATA VISUALIZATION' },
      { tag: 'DATA MINING' },
      { tag: 'BUSINESS INTELLIGENCE' },
    ],
  },
]

function renderProjectIcon(iconType?: string | null) {
  switch (iconType) {
    case 'glasses':
      return (
        <svg
          className="w-6 h-6 stroke-2 text-[#1e1e1e]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <circle cx="6" cy="14" r="3.5" />
          <circle cx="18" cy="14" r="3.5" />
          <path d="M9.5 14h5" />
          <path d="M2.5 14l3.5-6h12l3.5 6" />
        </svg>
      )
    case 'spiral':
      return (
        <svg
          className="w-6 h-6 stroke-2 text-[#1e1e1e]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path
            d="M12 2a10 10 0 1 0 10 10c0-3.3-2.7-6-6-6s-6 2.7-6 6a2 2 0 1 0 4 0c0-.55-.45-1-1-1"
            strokeLinecap="round"
          />
        </svg>
      )
    case 'asterisk':
      return (
        <svg
          className="w-6 h-6 stroke-2 text-[#1e1e1e]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07l14.14-14.14" strokeLinecap="round" />
        </svg>
      )
    case 'smartphone':
      return <Smartphone className="w-6 h-6 stroke-2 text-[#1e1e1e]" />
    case 'layers':
      return <Layers className="w-6 h-6 stroke-2 text-[#1e1e1e]" />
    default:
      return <Glasses className="w-6 h-6 stroke-2 text-[#1e1e1e]" />
  }
}

function parseFormattedText(text: string) {
  if (!text) return null
  const paragraphs = text.split('\n\n')

  return paragraphs.map((paragraph, pIdx) => {
    const parts = paragraph.split(/(\*\*.*?\*\*)/g)
    return (
      <p key={pIdx} className={cn(pIdx > 0 && 'mt-4', 'leading-relaxed')}>
        {parts.map((part, idx) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return (
              <strong key={idx} className="font-bold text-[#1e1e1e]">
                {part.slice(2, -2)}
              </strong>
            )
          }
          return <React.Fragment key={idx}>{part}</React.Fragment>
        })}
      </p>
    )
  })
}

export const LatestWorkBlock: React.FC<LatestWorkBlockProps> = ({
  title = 'Latest Work',
  projects = defaultProjects,
}) => {
  const displayProjects = projects && projects.length > 0 ? projects : defaultProjects

  return (
    <section id="work" className="relative w-full py-16 sm:py-24 px-6 sm:px-12 lg:px-20 bg-white text-[#1e1e1e] scroll-mt-6">
      <div className="container relative z-10 mx-auto max-w-7xl">
        {/* Section Heading */}
        <h2
          className={cn(
            oswald.className,
            'text-[#1e1e1e] font-bold text-4xl sm:text-6xl lg:text-[68px] leading-tight tracking-[-0.02em] uppercase mb-10 sm:mb-14',
          )}
        >
          {title}
        </h2>

        {/* Project Cards Stack */}
        <div className="space-y-8 sm:space-y-12">
          {displayProjects.map((project, index) => {
            const {
              category,
              icon = 'glasses',
              image,
              description,
              link = '#',
              tags = [],
            } = project

            const fallbackImage =
              index === 0
                ? '/media/latest-work-ux.jpg'
                : index === 1
                  ? '/media/latest-work-mobile.jpg'
                  : '/media/latest-work-saas.jpg'

            return (
              <article
                key={project.id || index}
                className="group relative grid grid-cols-1 lg:grid-cols-2 border border-[#E5E5E5] bg-[#FBFBFB] overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-black/30"
              >
                {/* Left: Media Container (square aspect ratio, image covers whole container, no bg) */}
                <div className="relative w-full aspect-square overflow-hidden bg-neutral-100">
                  {image && typeof image === 'object' ? (
                    <Media
                      resource={image}
                      fill
                      className="w-full h-full absolute inset-0"
                      pictureClassName="w-full h-full block"
                      imgClassName="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={(typeof image === 'string' && image) || fallbackImage}
                      alt={category}
                      className="w-full h-full absolute inset-0 object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                </div>

                {/* Right: Project Information */}
                <div className="flex flex-col bg-[#FBFBFB] border-t lg:border-t-0 lg:border-l border-[#E5E5E5]">
                  {/* Top Bar: Icon + Category + Arrow Action Button */}
                  <div className="flex items-stretch justify-between border-b border-[#E5E5E5]">
                    <div className="flex items-center gap-3.5 px-6 sm:px-8 py-5">
                      <span className="shrink-0">{renderProjectIcon(icon)}</span>
                      <h3
                        className={cn(
                          oswald.className,
                          'text-[#1e1e1e] font-bold text-xl sm:text-2xl uppercase tracking-wider leading-none',
                        )}
                      >
                        {category}
                      </h3>
                    </div>

                    {/* Arrow Button */}
                    <Link
                      href={link || '#'}
                      aria-label={`View ${category}`}
                      className="w-14 sm:w-16 bg-black text-white flex items-center justify-center shrink-0 border-l border-[#E5E5E5] hover:bg-neutral-800 transition-colors"
                    >
                      <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
                    </Link>
                  </div>

                  {/* Body Content (Top-aligned) */}
                  <div className="px-6 sm:px-8 py-6 sm:py-8 text-[#333333] text-base sm:text-lg lg:text-[19px] max-w-xl">
                    {description && parseFormattedText(description)}
                  </div>

                  {/* Tags Row at Bottom */}
                  {tags && tags.length > 0 && (
                    <div className="mt-auto px-6 sm:px-8 pb-6 sm:pb-8 pt-4 flex flex-wrap gap-2.5 items-center">
                      {tags.map((t, tIdx) => (
                        <span
                          key={t.id || tIdx}
                          className="bg-[#EFEFEF] text-[#444444] text-[11px] sm:text-xs font-semibold tracking-wider uppercase px-3.5 py-1.5 border border-[#DFDFDF] select-none rounded-[2px]"
                        >
                          {t.tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
