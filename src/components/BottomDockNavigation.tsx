'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Instagram, Linkedin, Mail, Phone, ExternalLink, X } from 'lucide-react'

export interface DockItemData {
  label: string
  url: string
  image?: { url?: string } | string | null
  backgroundColor?: string | null
  newTab?: boolean | null
  id?: string | null
}

export interface SocialLinkData {
  platform: string
  url: string
  color?: string | null
  id?: string | null
}

export interface BottomDockNavigationProps {
  data?: {
    dockItems?: DockItemData[] | null
    dockCapsule?: {
      backgroundColor?: string | null
      opacity?: number | null
    } | null
    socialStack?: {
      stackImage?: { url?: string } | string | null
      socialLinks?: SocialLinkData[] | null
    } | null
  } | null
}

const defaultDockItems: DockItemData[] = [
  {
    label: 'About Mahmoud',
    url: '#about',
    image: '/media/nav/nav-profile.png',
    backgroundColor: '#87C3FC',
  },
  {
    label: 'Latest Work',
    url: '#work',
    image: '/media/nav/nav-projects.png',
    backgroundColor: '#9CE87E',
  },
  {
    label: 'UX Research & Case Studies',
    url: '#experience',
    image: '/media/nav/nav-experience.png',
    backgroundColor: '#FB8361',
  },
  {
    label: 'Get in Touch',
    url: '#contact',
    image: '/media/nav/nav-contact.png',
    backgroundColor: '#FED443',
  },
]

const defaultSocialLinks: SocialLinkData[] = [
  { platform: 'Instagram', url: 'https://instagram.com', color: '#E4405F' },
  { platform: 'LinkedIn', url: 'https://linkedin.com', color: '#0A66C2' },
  { platform: 'Email', url: 'mailto:hello@mahmoud.co', color: '#0078D4' },
  { platform: 'Phone', url: 'tel:+1234567890', color: '#25D366' },
]

const fallbackIcons = [
  '/media/nav/nav-profile.png',
  '/media/nav/nav-projects.png',
  '/media/nav/nav-experience.png',
  '/media/nav/nav-contact.png',
]

const defaultItemColors = ['#87C3FC', '#9CE87E', '#FB8361', '#FED443']

function resolveImageUrl(img?: { url?: string } | string | null, fallback = ''): string {
  if (!img) return fallback
  if (typeof img === 'string') return img
  return img.url || fallback
}

function getPlatformIcon(platform: string) {
  const p = platform.toLowerCase()
  if (p.includes('insta')) return <Instagram className="w-4 h-4 stroke-[2.2]" />
  if (p.includes('link')) return <Linkedin className="w-4 h-4 stroke-[2.2]" />
  if (p.includes('mail') || p.includes('email')) return <Mail className="w-4 h-4 stroke-[2.2]" />
  if (p.includes('phone') || p.includes('call') || p.includes('tel'))
    return <Phone className="w-4 h-4 stroke-[2.2]" />
  return <ExternalLink className="w-4 h-4 stroke-[2.2]" />
}

export function BottomDockNavigation({ data }: BottomDockNavigationProps) {
  const [activeItem, setActiveItem] = useState<string>('#about')
  const [socialsOpen, setSocialsOpen] = useState(false)
  const popoverRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLDivElement>(null)

  // Close popover when clicking outside or pressing Escape
  useEffect(() => {
    if (!socialsOpen) return

    const handleClickOutside = (e: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setSocialsOpen(false)
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSocialsOpen(false)
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [socialsOpen])

  // Items from Payload CMS or fallback
  const items: DockItemData[] =
    data?.dockItems && data.dockItems.length > 0 ? data.dockItems : defaultDockItems

  // Social links from Payload CMS or fallback
  const socialLinks: SocialLinkData[] =
    data?.socialStack?.socialLinks && data.socialStack.socialLinks.length > 0
      ? data.socialStack.socialLinks
      : defaultSocialLinks

  // Stack image from Payload CMS or fallback
  const stackImageSrc = resolveImageUrl(
    data?.socialStack?.stackImage,
    '/media/nav/nav-icon-socials2.png',
  )

  const handleScroll = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <aside
      aria-label="Floating navigation dock"
      className="fixed bottom-4 sm:bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-50 select-none print:hidden pointer-events-auto"
    >
      {/* Sleek White Glassmorphic Floating Card Popover (Centered directly above the socials icon) */}
      {socialsOpen && (
        <div
          ref={popoverRef}
          role="dialog"
          aria-label="Quick contact & social profiles"
          className="absolute bottom-full right-2 sm:right-3.5 z-60 w-60 bg-white/95 backdrop-blur-2xl border border-white/80 p-3 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.35),0_0_1px_rgba(0,0,0,0.15)] animate-in fade-in zoom-in-95 duration-200"
        >
          {/* Header row */}
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-black/10 px-1">
            <span className="text-[11px] font-bold text-neutral-600 uppercase tracking-widest">
              Quick Connect
            </span>
            <button
              type="button"
              onClick={() => setSocialsOpen(false)}
              aria-label="Close popover"
              className="text-neutral-400 hover:text-black p-1 rounded-md transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Social Links List */}
          <div className="space-y-1.5">
            {socialLinks.map((item, idx) => {
              const brandColor = item.color || '#4D8BF8'
              return (
                <a
                  key={item.id || item.platform || idx}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between px-2.5 py-2 rounded-xl bg-black/[0.03] hover:bg-black/[0.08] border border-black/[0.06] hover:border-black/15 text-neutral-800 transition-all duration-150 active:scale-[0.98]"
                >
                  <div className="flex items-center gap-2.5">
                    {/* Brand icon in a soft tinted rounded container */}
                    <span
                      style={{
                        backgroundColor: `${brandColor}18`,
                        color: brandColor,
                      }}
                      className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border border-black/5 group-hover:scale-110 transition-transform duration-200"
                    >
                      {getPlatformIcon(item.platform)}
                    </span>
                    <span className="text-xs font-semibold tracking-wide text-neutral-800 group-hover:text-black">
                      {item.platform}
                    </span>
                  </div>

                  <ExternalLink className="w-3.5 h-3.5 text-neutral-400 group-hover:text-neutral-800 transition-colors" />
                </a>
              )
            })}
          </div>

          {/* Arrow Pointer Indicator pointing down to the dock icon */}
          <div className="absolute -bottom-2 right-5 w-4 h-4 bg-white/95 border-r border-b border-black/10 transform rotate-45" />
        </div>
      )}

      {/* Main Pill Dock Capsule */}
      <nav className="relative flex items-center backdrop-blur-md border bg-white/20 border-white/20 rounded-full px-3 sm:px-6 py-2 sm:py-4  transition-all duration-300 hover:shadow-[0_25px_60px_rgba(0,0,0,0.6)]">
        {/* Nav Items (Left Squircles) */}
        <div className="flex items-center gap-2 sm:gap-3 md:gap-3.5">
          {items.map((item, idx) => {
            const fallbackIcon = fallbackIcons[idx % fallbackIcons.length]
            const iconSrc = resolveImageUrl(item.image, fallbackIcon)
            const itemBgColor = item.backgroundColor || defaultItemColors[idx % defaultItemColors.length]
            const isActive = activeItem === item.url
            const isAnchor = item.url.startsWith('#')

            return (
              <Link
                key={item.id || item.url || idx}
                href={item.url}
                target={item.newTab ? '_blank' : undefined}
                rel={item.newTab ? 'noopener noreferrer' : undefined}
                onClick={(e) => {
                  if (isAnchor) {
                    e.preventDefault()
                    setActiveItem(item.url)
                    handleScroll(item.url)
                  }
                }}
                title={item.label}
                aria-label={item.label}
                className="group relative flex items-center justify-center transition-transform duration-200 hover:-translate-y-1.5 active:scale-95 focus:outline-none"
              >
                {/* Tooltip on hover */}
                <span className="pointer-events-none absolute -top-10 scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-150 px-2.5 py-1 text-xs font-semibold text-white bg-black/85 backdrop-blur-md rounded-md border border-white/10 shadow-lg whitespace-nowrap z-50">
                  {item.label}
                </span>

                {/* Squircle Icon with customizable backgroundColor */}
                <div
                  style={{
                    backgroundColor: itemBgColor,
                  }}
                  className={`relative w-11 h-11 sm:w-13 sm:h-13 md:w-16 md:h-16 rounded-2xl overflow-hidden transition-all duration-200 flex items-center justify-center ${
                    isActive ? 'ring-2 ring-white/90 scale-105 shadow-lg' : 'hover:brightness-105 shadow-md'
                  }`}
                >
                  <Image
                    src={iconSrc}
                    alt={item.label}
                    width={64}
                    height={64}
                    unoptimized={iconSrc.startsWith('/api/')}
                    className="w-full h-full object-contain select-none pointer-events-none"
                    priority
                  />
                </div>
              </Link>
            )
          })}
        </div>

        {/* Vertical Divider */}
        <div className="mx-2 sm:mx-3 h-8 sm:h-10 w-[1.5px] bg-white/40 rounded-full" />

        {/* Stacked Socials / Contact Cards (Right side) */}
        <div
          ref={triggerRef}
          className="relative group flex items-center justify-center transition-transform duration-200 hover:-translate-y-1.5 active:scale-95 cursor-pointer focus:outline-none"
          onClick={() => setSocialsOpen((prev) => !prev)}
          role="button"
          tabIndex={0}
          aria-haspopup="dialog"
          aria-expanded={socialsOpen}
          aria-label="Social profiles and contact methods"
          title="Social profiles & contact"
        >
          {/* Tooltip */}
          <span className="pointer-events-none absolute -top-10 scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-150 px-2.5 py-1 text-xs font-semibold text-white bg-black/85 backdrop-blur-md rounded-md border border-white/10 shadow-lg whitespace-nowrap z-50">
            Socials & Links
          </span>

          {/* Stacked Cards Icon */}
          <div className="relative w-12 h-11 sm:w-14 sm:h-13 md:w-15 md:h-14 rounded-2xl overflow-visible transition-all duration-200 hover:brightness-105 drop-shadow-md">
            <Image
              src={stackImageSrc}
              alt="Social media and links"
              width={71}
              height={70}
              unoptimized={stackImageSrc.startsWith('/api/')}
              className="w-full h-full object-contain select-none pointer-events-none"
              priority
            />
          </div>
        </div>
      </nav>
    </aside>
  )
}
