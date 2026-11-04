'use client'

import React from 'react'
import type { HeroBlock as HeroBlockProps } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import { Oswald } from 'next/font/google'
import { cn } from '@/utilities/ui'

const oswald = Oswald({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
})

export const HeroBlock: React.FC<HeroBlockProps> = ({
  title = "If it doesn't improve the experience, it doesn't belong",
  subtitle = 'Make it work. Make it simple. Make it memorable',
  image,
  backgroundImage,
  badgeText = 'Say less',
  badgeLink,
  links,
}) => {
  const bgSrc =
    backgroundImage && typeof backgroundImage === 'object' && backgroundImage.url
      ? backgroundImage.url
      : typeof backgroundImage === 'string'
        ? backgroundImage
        : '/api/media/file/b273704605a5ae4e3d16b8e8c981f934ad067676.jpg'

  const pencilsSrc =
    image && typeof image === 'object' && image.url
      ? image.url
      : typeof image === 'string'
        ? image
        : '/media/pencils.png'

  return (
    <section id="hero" className="relative w-full overflow-hidden min-h-[100vh] flex flex-col justify-between pt-16 sm:pt-24 lg:pt-32 pb-24 px-6 sm:px-12 lg:px-20 select-none">
      {/* 1. Rolling Hill Landscape Background */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={bgSrc}
        alt="Rolling hill landscape"
        className="absolute inset-0 w-full h-full object-cover object-center z-0"
      />

      {/* 2. Cluster of Pencils (Anchored to Bottom-Right) */}
      <div
        aria-hidden="true"
        className="absolute right-0 bottom-0 pointer-events-none z-20 w-[48%] sm:w-[38%] md:w-[32%] lg:w-[28%] xl:w-[25%] max-w-105 select-none flex items-end justify-end"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={pencilsSrc}
          alt="Pencils illustration"
          className="w-full h-auto max-h-[75vh] sm:max-h-[85vh] lg:max-h-[92vh] object-contain object-bottom drop-shadow-2xl"
        />
      </div>

      {/* 3. Left Content Container: Headline, Subtitle (with eyes next to it), and Floating Badge */}
      <div className="container relative z-30 mx-auto max-w-7xl flex flex-col justify-start">
        <div className="max-w-3xl xl:max-w-4xl">
          {/* Main Title */}
          <h1
            className={cn(
              oswald.className,
              'font-bold text-white text-4xl sm:text-6xl md:text-7xl lg:text-[84px] xl:text-[96px] leading-[0.98] tracking-[-0.02em]',
            )}
          >
            {title || "If it doesn't improve the experience, it doesn't belong"}
          </h1>

          {/* Subtitle with Eyes next to it */}
          {subtitle && (
            <div className="mt-6 sm:mt-8 flex items-center gap-4 sm:gap-6 lg:gap-8 max-w-3xl">
              <p
                className={cn(
                  oswald.className,
                  'text-white max-w-lg text-xl sm:text-2xl md:text-3xl lg:text-[40px] leading-[1.12] tracking-[-0.01em] font-normal opacity-95',
                )}
              >
                {subtitle}
              </p>

              {/* Cartoon Eyes Sticker next to the subtitle */}
              <div
                aria-hidden="true"
                className="shrink-0 w-14 sm:w-18 md:w-22 lg:w-26 select-none pointer-events-none drop-shadow-md"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/media/eyes.png"
                  alt="Eyes illustration"
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          )}

          {/* "Say less" Badge with Cursor Indicator */}
          <div className='w-full flex justify-center'>
            {badgeText && (
            <div className="mt-8 sm:mt-12 inline-flex items-start select-none relative">
              {/* White Pointer Cursor Icon pointing at top-left of pill */}
              <div
                aria-hidden="true"
                className="absolute -top-3.5 -left-3 pointer-events-none z-40 transform -rotate-12 drop-shadow-md"
              >
                <svg
                  className="w-6 h-6 text-white fill-white"
                  viewBox="0 0 24 24"
                  stroke="black"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                >
                  <path d="m3 3 7 18 3.5-7.5L21 10z" />
                </svg>
              </div>

              {badgeLink ? (
                <Link
                  href={badgeLink}
                  className="pl-6 pr-6 py-2.5 bg-black text-white text-sm sm:text-base font-semibold rounded-full border border-white/80 shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
                >
                  {badgeText}
                </Link>
              ) : (
                <span className="pl-6 pr-6 py-2.5 bg-black text-white text-sm sm:text-base font-semibold rounded-full border border-white/80 shadow-2xl">
                  {badgeText}
                </span>
              )}
            </div>
          )}
          </div>

          {/* Optional CTA Links */}
          {links && links.length > 0 && (
            <div className="flex flex-wrap gap-4 mt-8">
              {links.map(({ link }, i) => (
                <CMSLink key={i} size="lg" {...link} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
