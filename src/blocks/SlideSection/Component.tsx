'use client'

import React, { useState, useEffect, useCallback, useMemo } from 'react'
import type { Media as MediaType } from '@/payload-types'
import { Media } from '@/components/Media'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Oswald } from 'next/font/google'
import { cn } from '@/utilities/ui'

const oswald = Oswald({
  subsets: ['latin'],
  weight: ['700'],
  display: 'swap',
})

export type SlideItem = {
  title?: string | null
  text: string
  highlightWords?: string | null
  highlightColor?: string | null
  image?: MediaType | string | null
  imagePosition?: 'bottom' | 'center' | null
  backgroundColor?: string | null
  textColor?: string | null
  id?: string | null
}

export type SlideSectionBlockProps = {
  blockType?: 'slideSection'
  slides?: SlideItem[]
  showCounter?: boolean | null
  enableAutoplay?: boolean | null
  autoplaySpeed?: number | null
}

// Helper to parse highlighted text
function renderHighlightedText(
  text: string,
  highlightWordsStr?: string | null,
  highlightColor = '#FF6B4A',
  textColor = '#ffffff',
) {
  if (!text) return null

  // Split into paragraphs
  const paragraphs = text.split(/\r?\n\s*\r?\n/).filter((p) => p.trim().length > 0)

  const keywords = highlightWordsStr
    ? highlightWordsStr
        .split(',')
        .map((w) => w.trim().toLowerCase())
        .filter(Boolean)
    : []

  return paragraphs.map((paragraph, pIdx) => {
    // Match *word*, {word}, [highlight]word[/highlight]
    const tokenRegex = /(\*([^*]+)\*|\{([^}]+)\}|\[highlight\](.*?)\[\/highlight\])/g
    const nodes: React.ReactNode[] = []
    let lastIndex = 0
    let match: RegExpExecArray | null

    while ((match = tokenRegex.exec(paragraph)) !== null) {
      if (match.index > lastIndex) {
        const plain = paragraph.substring(lastIndex, match.index)
        nodes.push(...highlightByKeywords(plain, keywords, highlightColor, `p${pIdx}-sub${lastIndex}`))
      }

      const highlightedWord = match[2] ?? match[3] ?? match[4]
      nodes.push(
        <span
          key={`mark-${pIdx}-${match.index}`}
          style={{ color: highlightColor }}
          className="font-medium transition-colors duration-300 drop-shadow-sm"
        >
          {highlightedWord}
        </span>,
      )

      lastIndex = tokenRegex.lastIndex
    }

    if (lastIndex < paragraph.length) {
      const rest = paragraph.substring(lastIndex)
      nodes.push(...highlightByKeywords(rest, keywords, highlightColor, `p${pIdx}-end${lastIndex}`))
    }

    return (
      <p
        key={`p-${pIdx}`}
        style={{ color: textColor }}
        className="text-lg sm:text-2xl lg:text-[28px] xl:text-[32px] leading-relaxed lg:leading-[1.35] font-light tracking-[-0.015em] opacity-95"
      >
        {nodes}
      </p>
    )
  })
}

function highlightByKeywords(
  text: string,
  keywords: string[],
  highlightColor: string,
  keyPrefix: string,
): React.ReactNode[] {
  if (!keywords.length || !text) return [text]

  const escaped = keywords.map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
  const regex = new RegExp(`\\b(${escaped.join('|')})\\b`, 'gi')

  const parts: React.ReactNode[] = []
  let lastIdx = 0
  let m: RegExpExecArray | null

  while ((m = regex.exec(text)) !== null) {
    if (m.index > lastIdx) {
      parts.push(text.substring(lastIdx, m.index))
    }
    parts.push(
      <span
        key={`${keyPrefix}-kw-${m.index}`}
        style={{ color: highlightColor }}
        className="font-medium transition-colors duration-300 drop-shadow-sm"
      >
        {m[0]}
      </span>,
    )
    lastIdx = regex.lastIndex
  }

  if (lastIdx < text.length) {
    parts.push(text.substring(lastIdx))
  }

  return parts
}

export const SlideSectionBlock: React.FC<SlideSectionBlockProps> = ({
  slides = [],
  showCounter = true,
  enableAutoplay = false,
  autoplaySpeed = 5000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [touchStartX, setTouchStartX] = useState<number | null>(null)

  // Default fallback slides if array is empty
  const activeSlides = useMemo(() => {
    if (slides && slides.length > 0) return slides
    return [
      {
        title: 'UX\nRESEARCH',
        text: 'Dive deeper into your thoughts by expanding on your UX research findings here.\n\nFeel free to emphasize certain terms to highlight important concepts or insights.',
        highlightWords: 'emphasize',
        highlightColor: '#FFA38F',
        backgroundColor: '#E14D2A',
        imagePosition: 'bottom' as const,
      },
      {
        text: 'Designing with intent and curiosity. Every detail is crafted to provide *clarity* and create *delightful* user experiences.\n\nSimplicity is not the lack of clutter, but the presence of *purpose*.',
        highlightWords: 'clarity, delightful, purpose',
        highlightColor: '#FF6B4A',
        backgroundColor: '#000000',
        imagePosition: 'center' as const,
      },
    ]
  }, [slides])

  const totalSlides = activeSlides.length

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides)
  }, [totalSlides])

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides)
  }, [totalSlides])

  // Autoplay handler
  useEffect(() => {
    if (!enableAutoplay || totalSlides <= 1) return
    const interval = setInterval(() => {
      nextSlide()
    }, autoplaySpeed || 5000)
    return () => clearInterval(interval)
  }, [enableAutoplay, totalSlides, autoplaySpeed, nextSlide])

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        nextSlide()
      } else if (e.key === 'ArrowLeft') {
        prevSlide()
      }
    },
    [nextSlide, prevSlide],
  )

  // Mobile swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX)
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return
    const touchEndX = e.changedTouches[0].clientX
    const diff = touchStartX - touchEndX
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextSlide()
      } else {
        prevSlide()
      }
    }
    setTouchStartX(null)
  }

  const currentSlide = activeSlides[currentIndex] || activeSlides[0]
  const highlightColor = currentSlide.highlightColor || '#FF6B4A'
  const bgColor = currentSlide.backgroundColor || '#000000'
  const textColor = currentSlide.textColor || '#ffffff'
  const isBottom = currentSlide.imagePosition === 'bottom'

  return (
    <section
      id="experience"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{ backgroundColor: bgColor }}
      className="relative w-full overflow-hidden h-170 sm:h-185 lg:h-200 outline-none select-none transition-colors duration-700 scroll-mt-6"
    >
      {/* 1. Flush Bottom-Left Graphic (Anchored directly to the very bottom and left edge of the section) */}
      {isBottom && (
        <div
          key={`img-bottom-${currentIndex}`}
          className="absolute left-0 bottom-0 z-0 pointer-events-none select-none flex items-end justify-start max-w-[90vw] sm:max-w-[70vw] lg:max-w-[50vw] xl:max-w-[45vw] leading-none transition-opacity duration-300 animate-fadeIn"
        >
          {currentSlide.image && typeof currentSlide.image === 'object' ? (
            <Media
              resource={currentSlide.image}
              imgClassName="block object-contain object-bottom-left max-h-90 sm:max-h-110 lg:max-h-135 xl:max-h-150 w-auto drop-shadow-2xl"
            />
          ) : typeof currentSlide.image === 'string' ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={currentSlide.image}
              alt={currentSlide.title || 'Slide graphic'}
              className="block object-contain object-bottom-left max-h-90 sm:max-h-110 lg:max-h-135 xl:max-h-150 w-auto drop-shadow-2xl"
            />
          ) : (
            <div className="w-56 h-56 rounded-tr-3xl bg-white/5 border-t border-r border-white/10 flex items-center justify-center text-white/40 text-sm">
              Graphic (Flush Left & Bottom)
            </div>
          )}
        </div>
      )}

      {/* 2. Main Content Container with padding for title, text, and controls */}
      <div className="container relative z-10 mx-auto max-w-7xl h-full flex flex-col justify-between pt-10 sm:pt-14 lg:pt-16 pb-16 px-6 sm:px-12 lg:px-20">
        {/* Content Row: Desktop Grid / Mobile Flex */}
        <div
          key={currentIndex}
          className="flex flex-col lg:grid lg:grid-cols-12 gap-6 lg:gap-16 flex-1 h-full items-stretch transition-opacity duration-300 animate-fadeIn"
        >
          {/* Mobile Title (shown only on mobile above text if slide has a title) */}
          {currentSlide.title && (
            <div className="order-1 lg:hidden shrink-0 z-10">
              <h2
                style={{ color: textColor }}
                className={cn(
                  oswald.className,
                  'font-bold text-4xl sm:text-5xl leading-[0.95] tracking-[-0.02em] uppercase whitespace-pre-line',
                )}
              >
                {currentSlide.title}
              </h2>
            </div>
          )}

          {/* Left Column (Desktop flex column / Mobile contents) */}
          <div
            className={cn(
              'contents lg:flex lg:flex-col lg:col-span-6 lg:h-full z-10',
              isBottom ? 'lg:justify-start lg:items-start' : 'lg:justify-center lg:items-center',
            )}
          >
            {/* Desktop Title (shown before/above the image on desktop) */}
            {currentSlide.title && (
              <div className="hidden lg:block w-full mb-4 shrink-0">
                <h2
                  style={{ color: textColor }}
                  className={cn(
                    oswald.className,
                    'font-bold text-6xl md:text-7xl lg:text-8xl xl:text-[96px] leading-[0.92] tracking-[-0.02em] uppercase whitespace-pre-line',
                  )}
                >
                  {currentSlide.title}
                </h2>
              </div>
            )}

            {/* Vertically Centered Image (only rendered here if NOT isBottom) */}
            {!isBottom && (
              <div className="order-3 lg:order-0 relative w-full flex items-center justify-center my-auto aspect-square max-w-105 sm:max-w-120 lg:max-w-140 mx-auto lg:mx-0 py-4 lg:py-0 transition-all duration-300">
                <div className="relative w-full h-full flex items-center justify-center">
                  {currentSlide.image && typeof currentSlide.image === 'object' ? (
                    <Media
                      resource={currentSlide.image}
                      imgClassName="object-contain max-h-95 sm:max-h-115 lg:max-h-130 w-auto drop-shadow-2xl transition-transform duration-500 hover:scale-105"
                    />
                  ) : typeof currentSlide.image === 'string' ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={currentSlide.image}
                      alt={currentSlide.title || 'Slide illustration'}
                      className="object-contain max-h-95 sm:max-h-115 lg:max-h-130 w-auto drop-shadow-2xl transition-transform duration-500 hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-72 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 text-sm">
                      Graphic (Centered)
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Textarea Content */}
          <div className="order-2 lg:order-0 lg:col-span-6 flex flex-col justify-center my-auto pb-8 lg:pb-0 z-10">
            <div className="flex flex-col space-y-6 sm:space-y-8 max-w-xl">
              {renderHighlightedText(currentSlide.text, currentSlide.highlightWords, highlightColor, textColor)}
            </div>
          </div>
        </div>

        {/* Absolute Bottom Bar: Placed at the REAL bottom with reliable interactive buttons */}
        <div className="absolute bottom-6 sm:bottom-8 left-6 sm:left-12 lg:left-20 right-6 sm:right-12 lg:right-20 flex items-center justify-between z-30 pointer-events-none">
          {showCounter ? (
            <div
              style={{ color: textColor }}
              className={cn(oswald.className, 'text-3xl sm:text-4xl lg:text-5xl font-bold tracking-wider select-none pointer-events-auto')}
            >
              {String(currentIndex + 1).padStart(2, '0')}
            </div>
          ) : (
            <div />
          )}

          {/* Interactive Navigation Control Pill at the Real Bottom Right */}
          <div className="flex items-center gap-3 sm:gap-4 ml-auto pointer-events-auto bg-black/25 backdrop-blur-xs px-3 sm:px-4 py-1.5 rounded-full border border-white/15 shadow-lg">
            {/* Prev Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                prevSlide()
              }}
              onTouchStart={(e) => e.stopPropagation()}
              onTouchEnd={(e) => e.stopPropagation()}
              aria-label="Previous slide"
              style={{ color: textColor }}
              className="p-1.5 sm:p-2 opacity-80 hover:opacity-100 hover:scale-115 active:scale-90 transition-all duration-200 cursor-pointer rounded-full hover:bg-white/15 focus:outline-none"
            >
              <ArrowLeft className="w-6 h-6 sm:w-7 sm:h-7 stroke-[1.75]" />
            </button>

            {/* Vertical Divider */}
            <div
              style={{ backgroundColor: textColor }}
              className="w-px h-5 sm:h-6 opacity-30 select-none"
            />

            {/* Next Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                nextSlide()
              }}
              onTouchStart={(e) => e.stopPropagation()}
              onTouchEnd={(e) => e.stopPropagation()}
              aria-label="Next slide"
              style={{ color: textColor }}
              className="p-1.5 sm:p-2 opacity-80 hover:opacity-100 hover:scale-115 active:scale-90 transition-all duration-200 cursor-pointer rounded-full hover:bg-white/15 focus:outline-none"
            >
              <ArrowRight className="w-6 h-6 sm:w-7 sm:h-7 stroke-[1.75]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
