import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'
import { Facebook, Instagram, Linkedin } from 'lucide-react'

// Custom X / Twitter SVG matching official brand mark
function XIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function renderSocialIcon(platform: string) {
  switch (platform?.toLowerCase()) {
    case 'twitter':
    case 'x':
      return <XIcon className="w-4 h-4 fill-current" />
    case 'facebook':
      return <Facebook className="w-4.5 h-4.5 fill-current stroke-0" />
    case 'instagram':
      return <Instagram className="w-4.5 h-4.5" />
    case 'linkedin':
      return <Linkedin className="w-4.5 h-4.5 fill-current stroke-0" />
    default:
      return <XIcon className="w-4 h-4 fill-current" />
  }
}

export async function Footer() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const footerData: any = await getCachedGlobal('footer', 1)()

  const name = footerData?.name || 'Mahmoud Moumen'
  const role = footerData?.role || 'UX Designer'
  const copyright = footerData?.copyright || `© ${new Date().getFullYear()} Mahmoud. All rights reserved.`

  const avatarSrc =
    footerData?.avatar && typeof footerData.avatar === 'object' && footerData.avatar.url
      ? footerData.avatar.url
      : typeof footerData?.avatar === 'string'
        ? footerData.avatar
        : '/media/mahmoud-avatar.png'

  const bgImageSrc =
    footerData?.backgroundImage && typeof footerData.backgroundImage === 'object' && footerData.backgroundImage.url
      ? footerData.backgroundImage.url
      : typeof footerData?.backgroundImage === 'string'
        ? footerData.backgroundImage
        : '/media/Footer.png'

  const socialLinks =
    footerData?.socialLinks && footerData.socialLinks.length > 0
      ? footerData.socialLinks
      : [
          { platform: 'twitter', url: 'https://x.com' },
          { platform: 'facebook', url: 'https://facebook.com' },
          { platform: 'instagram', url: 'https://instagram.com' },
          { platform: 'linkedin', url: 'https://linkedin.com' },
        ]

  const legalLinks =
    footerData?.legalLinks && footerData.legalLinks.length > 0
      ? footerData.legalLinks
      : [
          { label: 'Privacy Policy', url: '#' },
          { label: 'Terms of Service', url: '#' },
          { label: 'Security', url: '#' },
        ]

  return (
    <footer id="footer" className="relative w-full overflow-hidden bg-black text-white flex flex-col justify-between pt-6 sm:pt-10 lg:pt-14 pb-20 sm:pb-24 lg:pb-28 px-6 sm:px-12 lg:px-20 select-none aspect-1440/811 scroll-mt-6">
      {/* 1. Full Landscape Image showing all */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={bgImageSrc}
        alt="Footer background"
        className="absolute inset-0 w-full h-full object-cover object-center z-0"
      />

      {/* 2. Top Bar: Profile Badge (Desktop only, left) + Social Icons (Mobile: centered top; Desktop: right) */}
      <div className="mt-8 sm:mt-16 lg:mt-30 relative z-10 mx-auto w-full flex items-center justify-center sm:justify-between gap-6">
        {/* Left: Profile Card (Hidden on phone / mobile) */}
        <div className="hidden sm:flex items-center gap-3.5 sm:gap-4">
          <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border border-white/20 bg-black/40 shrink-0 shadow-lg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={avatarSrc} alt={name} className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col">
            <span className="text-white font-bold text-base sm:text-lg leading-tight tracking-wide drop-shadow-sm">
              {name}
            </span>
            <span className="text-neutral-300 text-xs sm:text-sm font-normal leading-tight mt-0.5 drop-shadow-sm">
              {role}
            </span>
          </div>
        </div>

        {/* Social Icons (Centered at the top on phone, right-aligned on desktop) */}
        <div className="flex items-center justify-center gap-2.5 sm:gap-3.5">
          {socialLinks.map((item: { platform: string; url: string }, i: number) => (
            <a
              key={i}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.platform}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-white/25 bg-black/30 hover:bg-white hover:text-black hover:border-white transition-all duration-200 backdrop-blur-md flex items-center justify-center text-white/90 shadow-md active:scale-95"
            >
              {renderSocialIcon(item.platform)}
            </a>
          ))}
        </div>
      </div>

      {/* 3. Middle Area: Spacer allowing the image's embedded giant wordmark and landscape to show fully */}
      <div className="relative z-10 flex-1 min-h-16 sm:min-h-36 lg:min-h-48" />

      {/* 4. Bottom Row: Copyright + Legal Links (Hidden on phone / mobile) */}
      <div className="hidden sm:flex relative z-10 mx-auto w-full max-w-7xl pt-4 sm:pt-6 border-t border-white/10 flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-neutral-400">
        <div>
          <span>{copyright}</span>
        </div>

        <div className="flex items-center gap-6 sm:gap-8">
          {legalLinks.map((link: { label: string; url: string }, i: number) => (
            <Link
              key={i}
              href={link.url}
              className="hover:text-white transition-colors duration-200 text-neutral-400 font-normal"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  )
}
