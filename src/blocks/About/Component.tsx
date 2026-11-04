'use client'

import React from 'react'
import type { Media as MediaType } from '@/payload-types'
import { Media } from '@/components/Media'
import Link from 'next/link'
import { Oswald } from 'next/font/google'
import { cn } from '@/utilities/ui'
import { ArrowDown } from 'lucide-react'

const oswald = Oswald({
  subsets: ['latin'],
  weight: ['700'],
  display: 'swap',
})

export type AboutBlockProps = {
  blockType?: 'about'
  title?: string | null
  highlightWord?: string | null
  mobileTitle?: string | null
  description?: string | null
  mobileDescription?: string | null
  cardImage?: MediaType | string | null
  badgeText?: string | null
  cardProfile?: {
    avatar?: MediaType | string | null
    name?: string | null
    role?: string | null
    bio?: string | null
  } | null
  contactText?: string | null
  contactUrl?: string | null
  backgroundColor?: string | null
}

const BlueCard: React.FC<{
  cardImage?: MediaType | string | null
  badgeText?: string | null
  profileName: string
  profileRole: string
  profileBio: string
  avatar?: MediaType | string | null
  backgroundColor?: string | null
}> = ({ cardImage, badgeText = 'Say less', profileName, profileRole, profileBio, avatar, backgroundColor }) => {
  return (
    <div className="relative w-full max-w-full aspect-[400/532] rounded-[32px] overflow-hidden shadow-2xl bg-[#4D8BF8] select-none group">
      {/* 1. White Diagonal Stripe at Top-Left */}
      <div
        className="absolute top-5 -left-20  w-100 h-11 bg-white transform -rotate-45 pointer-events-none z-0 shadow-sm"
        style={{ transformOrigin: 'center' }}
      />

      {/* 2. Geometric 8-pointed White Asterisk in Top-Right */}
      <div className="absolute -top-6 -right-6 w-36 h-36 pointer-events-none z-0">
        <svg viewBox="0 0 100 100" className="w-full h-full text-white fill-current drop-shadow-sm">
          <rect x="44" y="5" width="12" height="90" rx="3" />
          <rect x="5" y="44" width="90" height="12" rx="3" />
          <rect x="44" y="5" width="12" height="90" rx="3" transform="rotate(45 50 50)" />
          <rect x="44" y="5" width="12" height="90" rx="3" transform="rotate(-45 50 50)" />
        </svg>
      </div>

      {/* 3. Mahmoud Portrait Photo */}
      <div className="absolute inset-0 z-10 flex items-end justify-center pointer-events-none">
        {cardImage && typeof cardImage === 'object' ? (
          <Media
            resource={cardImage}
            fill
            imgClassName="object-cover object-top w-full h-full"
          />
        ) : (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src="/media/mahmoud-cutout.png"
            alt={profileName}
            className="w-[94%] h-[96%] object-contain object-bottom"
          />
        )}
      </div>

      

      {/* 5. Frosted Glassmorphic Blur Card Overlay at Bottom */}
      <div className="absolute bottom-4 left-4 right-4 z-20 backdrop-blur-xl bg-white/20 border border-white/30  p-4 sm:p-5 text-white shadow-2xl">
        <div className="flex items-center gap-3.5 mb-10">
          {/* Avatar */}
          <div className="relative w-12 h-12 rounded-full overflow-hidden shadow-md shrink-0 bg-[#4D8BF8] " >
            {avatar && typeof avatar === 'object' ? (
              <Media
                resource={avatar}
                fill
                // pictureClassName="relative block w-full h-full"
                // imgClassName="object-cover w-full h-full"
                className='w-full h-full  object-contain'
              />
            ) : (
              /* eslint-disable-next-line @next/next/no-img-element */
              <div
                
                className="w-full bg-red-700 h-full object-cover"
              />
            )}
          </div>

          {/* Name & Role */}
          <div className="flex flex-col">
            <h3
              className={cn(
                oswald.className,
                'font-bold text-white text-base sm:text-lg leading-tight tracking-wide drop-shadow-sm uppercase',
              )}
            >
              {profileName}
            </h3>
            <span className="text-white/85 text-xs sm:text-sm font-medium mt-0.5 drop-shadow-sm">
              {profileRole}
            </span>
          </div>
        </div>

        {/* Bio paragraph */}
        <p className="text-white/95 text-xs sm:text-[13px] leading-snug font-normal drop-shadow-sm">
          {profileBio}
        </p>
      </div>
    </div>
  )
}

export const AboutBlock: React.FC<AboutBlockProps> = ({
  title = "Hi I'm Mahmoud Moumen User Experience",
  highlightWord = 'Designer',
  mobileTitle,
  description = 'I design intuitive digital products that combine strategy, user experience, and clean visual design. From research and wireframes to polished interfaces, I create solutions that help businesses grow and users enjoy every interaction',
  mobileDescription = 'UI/UX & Web Designer crafting clean, user friendly, and impactful digital experiences that balance creativity and usability',
  cardImage,
  badgeText = 'Say less',
  cardProfile,
  contactText = 'Contact me',
  contactUrl = '#contact',
  backgroundColor = '#f5f5f5',
}) => {
  const profileName = cardProfile?.name || 'Mahmoud Moumen'
  const profileRole = cardProfile?.role || 'UX Designer'
  const profileBio =
    cardProfile?.bio ||
    'UI/UX & Web Designer crafting clean, user friendly, and impactful digital experiences that balance creativity and usability'

  return (
    <section
      id="about"
      style={{ backgroundColor: backgroundColor || '#f5f5f5' }}
      className="relative w-full py-16 sm:py-24 lg:py-28 px-6 sm:px-12 lg:px-20 text-[#1e1e1e] scroll-mt-6"
    >
      <div className="container relative z-10 mx-auto max-w-7xl">
        {/* DESKTOP LAYOUT (Matches Image 1) */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-12  items-center">
          {/* Left Column: Heading, Paragraph, and Contact Link */}
          <div className="lg:col-span-8 flex flex-col justify-center pr-4">
            <h2
              className={cn(
                oswald.className,
                'text-[#333333] font-bold tracking-[-0.02em] leading-[1.05] uppercase mb-20',
              )}
            >
              <span className="block text-4xl sm:text-6xl lg:text-[68px] font-bold leading-[1.4]">
                {title}
              </span>

              <span className="block text-6xl sm:text-8xl lg:text-[108px] font-black leading-[0.9] mt-8  mb-8">
                {highlightWord}
              </span>
            </h2>

            {description && (
              <p className="text-[#333333] text-lg lg:text-[19px] leading-relaxed max-w-2xl font-normal">
                {description}
              </p>
            )}

            {contactText && (
              <div className="mt-10">
                <Link
                  href={contactUrl || '#contact'}
                  className={cn(
                    oswald.className,
                    'inline-flex items-center gap-3.5 text-2xl font-bold uppercase tracking-wide text-[#1e1e1e] hover:opacity-75 transition-opacity group cursor-pointer',
                  )}
                >
                  <span>{contactText}</span>
                  <span className="w-8 h-8 border border-black/30 flex items-center justify-center rounded-xs transition-transform duration-200 group-hover:translate-y-0.5">
                    <ArrowDown className="w-4 h-4 stroke-[2]" />
                  </span>
                </Link>
              </div>
            )}
          </div>

          {/* Right Column: Featured Blue Card */}
          <div className="lg:col-span-4 flex justify-center ">
            <BlueCard
              cardImage={cardImage}
              badgeText={badgeText}
              profileName={profileName}
              profileRole={profileRole}
              profileBio={profileBio}
              avatar={cardProfile?.avatar}
              backgroundColor={backgroundColor}
            />
          </div>
        </div>

        {/* MOBILE LAYOUT (Matches Image 2) */}
        <div className="flex flex-col lg:hidden space-y-8">
          {/* Top: Blue Graphic Card */}
          <div className="flex justify-center">
            <BlueCard
              cardImage={cardImage}
              badgeText={badgeText}
              profileName={profileName}
              profileRole={profileRole}
              profileBio={profileBio}
              avatar={cardProfile?.avatar}
              backgroundColor={backgroundColor}
            />
          </div>

          {/* Bottom: Heading, Subtext, Contact Button */}
          <div className="flex flex-col">
            <h2
              className={cn(
                oswald.className,
                'text-[#1e1e1e] font-bold text-4xl sm:text-5xl leading-[1.1] uppercase tracking-[-0.02em] mb-5',
              )}
            >
              {mobileTitle || `${title} ${highlightWord}`}
            </h2>

            <p className="text-[#333333] text-sm sm:text-base leading-relaxed mb-8">
              {mobileDescription || profileBio}
            </p>

            {contactText && (
              <div>
                <Link
                  href={contactUrl || '#contact'}
                  className={cn(
                    oswald.className,
                    'inline-flex items-center gap-3 text-xl font-bold uppercase tracking-wide text-[#1e1e1e] hover:opacity-75 transition-opacity group cursor-pointer',
                  )}
                >
                  <span>{contactText}</span>
                  <span className="w-7 h-7 border border-black/30 flex items-center justify-center rounded-xs transition-transform duration-200 group-hover:translate-y-0.5">
                    <ArrowDown className="w-3.5 h-3.5 stroke-[2]" />
                  </span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
