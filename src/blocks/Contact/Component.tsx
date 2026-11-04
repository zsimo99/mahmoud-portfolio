'use client'

import React, { useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { Oswald } from 'next/font/google'
import type { Form as FormType, FormFieldBlock } from '@payloadcms/plugin-form-builder/types'
import type { Media as MediaType } from '@/payload-types'
import RichText from '@/components/RichText'
import { cn } from '@/utilities/ui'
import { getClientSideURL } from '@/utilities/getURL'
import {
  CheckCircle2,
  AlertCircle,
  Linkedin,
  Dribbble,
  Github,
  Twitter,
  Instagram,
  Globe,
  ArrowUpRight,
} from 'lucide-react'

const oswald = Oswald({
  subsets: ['latin'],
  weight: ['700'],
  display: 'swap',
})

export type SocialLinkItem = {
  platform: 'linkedin' | 'dribbble' | 'github' | 'twitter' | 'instagram' | 'custom' | string
  label: string
  url: string
  id?: string | null
}

export type ContactBlockProps = {
  blockType?: 'contact'
  title?: string | null
  email?: string | null
  subtitle?: string | null
  profile?: {
    name?: string | null
    role?: string | null
    avatar?: MediaType | string | null
  } | null
  socialLinks?: SocialLinkItem[] | null
  form?: FormType | string | null
  id?: string | null
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const defaultFields: Array<FormFieldBlock | any> = [
  {
    blockType: 'text',
    name: 'name',
    label: 'Name',
    required: true,
    width: 100,
  },
  {
    blockType: 'email',
    name: 'email',
    label: 'Email',
    required: true,
    width: 100,
  },
  {
    blockType: 'number',
    name: 'phone',
    label: 'Phone',
    required: false,
    width: 100,
  },
  {
    blockType: 'textarea',
    name: 'message',
    label: 'Message',
    required: false,
    width: 100,
  },
]

const defaultSocialLinks: SocialLinkItem[] = [
  { platform: 'linkedin', label: 'LinkedIn', url: 'https://linkedin.com' },
  { platform: 'dribbble', label: 'Dribbble', url: 'https://dribbble.com' },
  { platform: 'github', label: 'GitHub', url: 'https://github.com' },
  { platform: 'twitter', label: 'Twitter / X', url: 'https://x.com' },
]

function renderSocialIcon(platform: string) {
  switch (platform?.toLowerCase()) {
    case 'linkedin':
      return <Linkedin className="w-4 h-4 shrink-0" />
    case 'dribbble':
      return <Dribbble className="w-4 h-4 shrink-0" />
    case 'github':
      return <Github className="w-4 h-4 shrink-0" />
    case 'twitter':
    case 'x':
      return <Twitter className="w-4 h-4 shrink-0" />
    case 'instagram':
      return <Instagram className="w-4 h-4 shrink-0" />
    default:
      return <Globe className="w-4 h-4 shrink-0" />
  }
}

export const ContactBlock: React.FC<ContactBlockProps> = ({
  title = 'Tell us about your next Project',
  email = 'hello@mahmoud.co',
  subtitle = "Have a project in mind or just a quick query? We're ready to connect with you",
  profile = {
    name: 'Mahmoud Moumen',
    role: 'UX Designer',
  },
  socialLinks = defaultSocialLinks,
  form,
}) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const activeForm = typeof form === 'object' && form !== null ? form : null
  const fields = activeForm?.fields && activeForm.fields.length > 0 ? activeForm.fields : defaultFields
  const formID = activeForm?.id

  // Button label and success message come from Form Builder
  const submitButtonLabel = activeForm?.submitButtonLabel || 'Submit now'
  const confirmationMessage = activeForm?.confirmationMessage

  const formMethods = useForm()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = formMethods

  const onSubmit = useCallback(
    async (data: Record<string, unknown>) => {
      setIsLoading(true)
      setError(null)

      try {
        if (formID) {
          const dataToSend = Object.entries(data).map(([name, value]) => ({
            field: name,
            value,
          }))

          const res = await fetch(`${getClientSideURL()}/api/form-submissions`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              form: formID,
              submissionData: dataToSend,
            }),
          })

          if (!res.ok) {
            const resJson = await res.json().catch(() => ({}))
            throw new Error(resJson.errors?.[0]?.message || 'Failed to submit form.')
          }

          if (activeForm.confirmationType === 'redirect' && activeForm.redirect?.url) {
            router.push(activeForm.redirect.url)
            return
          }
        }

        setHasSubmitted(true)
        reset()
      } catch (err: unknown) {
        console.error('Contact form submission error:', err)
        setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
      } finally {
        setIsLoading(false)
      }
    },
    [formID, activeForm, router, reset],
  )

  const avatarSrc =
    profile?.avatar && typeof profile.avatar === 'object' && profile.avatar.url
      ? profile.avatar.url
      : typeof profile?.avatar === 'string'
        ? profile.avatar
        : '/media/mahmoud-avatar.png'

  const displaySocials = socialLinks && socialLinks.length > 0 ? socialLinks : defaultSocialLinks

  return (
    <section
      id="contact"
      className="relative w-full overflow-hidden bg-[#0A0A0A] text-white py-20 sm:py-28 lg:py-36 px-6 sm:px-12 lg:px-20 select-none scroll-mt-10"
    >
      <div className="container relative z-10 mx-auto max-w-7xl">
        {/* 1. First Section: Title & Subtitle only - No element next to them */}
        <div className="max-w-6xl mb-16 sm:mb-20 lg:mb-24">
          <h2
            className={cn(
              oswald.className,
              'text-white font-semibold text-4xl sm:text-6xl lg:text-[55px] xl:text-[72px] leading-[1.06] tracking-[-0.02em] uppercase',
            )}
          >
            {title || 'Tell us about your next Project'}
            {email && (
              <span className="block mt-2 sm:mt-3">
                at {email}
              </span>
            )}
          </h2>

          {subtitle && (
            <p className="mt-6 sm:mt-8 text-neutral-400 text-base sm:text-lg lg:text-xl max-w-2xl leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        {/* 2. Below: 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start pt-6 ">
          {/* Left Content: Profile Card (image, title, subtitle) & Social Links */}
          <div className="lg:col-span-5 flex flex-col pr-0 lg:pr-4">
            {/* The Card: image, title, subtitle */}
            <div className="flex items-center gap-4.5  rounded-2xl max-w-md shadow-xl transition-all duration-300 hover:border-neutral-700">
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-neutral-700 bg-neutral-800 shrink-0 shadow-md">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={avatarSrc}
                  alt={profile?.name || 'Mahmoud Moumen'}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <h3 className="text-white font-bold text-xl sm:text-2xl leading-tight">
                  {profile?.name || 'Mahmoud Moumen'}
                </h3>
                <span className="text-neutral-400 text-sm sm:text-base font-normal mt-1 leading-tight">
                  {profile?.role || 'UX Designer'}
                </span>
              </div>
            </div>

            {/* Under it: Social Links */}
            {displaySocials && displaySocials.length > 0 && (
              <div className="mt-8 sm:mt-10 max-w-md">
                <span className="text-neutral-500 uppercase tracking-widest text-xs font-semibold block mb-4">
                  Connect & Follow
                </span>
                <div className="flex flex-wrap gap-2.5 sm:gap-3">
                  {displaySocials.map((social, idx) => (
                    <a
                      key={social.id || idx}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-neutral-900/90 hover:bg-white hover:text-black border border-neutral-800 text-neutral-300 text-xs sm:text-sm font-medium transition-all duration-200 group/link active:scale-95"
                    >
                      {renderSocialIcon(social.platform)}
                      <span>{social.label}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-50 group-hover/link:opacity-100 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Content: The Form Builder Form */}
          <div className="lg:col-span-7 w-full pt-2 lg:pt-0">
            {hasSubmitted ? (
              <div className="p-8 sm:p-10 border border-neutral-800 bg-neutral-900/70 backdrop-blur-sm rounded-xl text-left space-y-4 animate-in fade-in zoom-in-95 duration-300">
                <div className="flex items-center gap-3 text-emerald-400">
                  <CheckCircle2 className="w-8 h-8 shrink-0" />
                  <span className="text-sm font-semibold uppercase tracking-wider">Success</span>
                </div>

                {/* Success Message from Form Builder */}
                {confirmationMessage ? (
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  <RichText
                    data={confirmationMessage as any}
                    enableGutter={false}
                    enableProse={false}
                    className="text-white text-base sm:text-lg [&_h2]:text-2xl sm:[&_h2]:text-3xl [&_h2]:font-bold [&_h2]:uppercase [&_h2]:text-white [&_h2]:mb-2 [&_p]:text-neutral-300 [&_p]:leading-relaxed"
                  />
                ) : (
                  <div>
                    <h3 className={cn(oswald.className, 'text-2xl sm:text-3xl font-bold uppercase text-white')}>
                      Message Sent!
                    </h3>
                    <p className="text-neutral-300 text-base mt-2">
                      Thank you for reaching out. We have received your inquiry and will be in touch shortly.
                    </p>
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => setHasSubmitted(false)}
                  className="mt-6 inline-block text-sm text-neutral-400 hover:text-white underline underline-offset-4 cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 sm:space-y-8">
                {error && (
                  <div className="flex items-center gap-2.5 p-4 rounded bg-red-950/40 border border-red-800/60 text-red-200 text-sm">
                    <AlertCircle className="w-5 h-5 shrink-0 text-red-400" />
                    <span>{error}</span>
                  </div>
                )}

                {/* Dynamically render fields from Form Builder */}
                <div className="space-y-6 sm:space-y-7">
                  {fields.map((field, idx) => {
                    const fieldName = 'name' in field ? (field.name as string) : `field_${idx}`
                    const fieldLabel = 'label' in field && field.label ? (field.label as string) : fieldName
                    const isRequired = 'required' in field ? Boolean(field.required) : false
                    const blockType = field.blockType

                    // Textarea field
                    if (blockType === 'textarea') {
                      return (
                        <div
                          key={fieldName || idx}
                          className="relative border-b border-neutral-800 focus-within:border-white transition-colors duration-200 pb-2"
                        >
                          <label
                            htmlFor={fieldName}
                            className="block text-neutral-400 text-sm sm:text-base font-medium mb-1.5"
                          >
                            {fieldLabel}
                            {isRequired && <span className="text-white ml-0.5">*</span>}
                          </label>
                          <textarea
                            id={fieldName}
                            rows={3}
                            placeholder=""
                            className="w-full bg-transparent text-white placeholder-neutral-600 focus:outline-none text-base sm:text-lg resize-none pt-1"
                            {...register(fieldName, { required: isRequired })}
                          />
                          {errors[fieldName] && (
                            <span className="text-red-400 text-xs mt-1 block">This field is required</span>
                          )}
                        </div>
                      )
                    }

                    // Email field
                    if (blockType === 'email') {
                      return (
                        <div
                          key={fieldName || idx}
                          className="relative border-b border-neutral-800 focus-within:border-white transition-colors duration-200 pb-2"
                        >
                          <label
                            htmlFor={fieldName}
                            className="block text-neutral-400 text-sm sm:text-base font-medium mb-1.5"
                          >
                            {fieldLabel}
                            {isRequired && <span className="text-white ml-0.5">*</span>}
                          </label>
                          <input
                            id={fieldName}
                            type="email"
                            placeholder=""
                            className="w-full bg-transparent text-white placeholder-neutral-600 focus:outline-none text-base sm:text-lg py-1.5"
                            {...register(fieldName, {
                              required: isRequired,
                              pattern: {
                                value: /^\S[^\s@]*@\S+\.\S+$/,
                                message: 'Please enter a valid email address',
                              },
                            })}
                          />
                          {errors[fieldName] && (
                            <span className="text-red-400 text-xs mt-1 block">
                              {(errors[fieldName]?.message as string) || 'This field is required'}
                            </span>
                          )}
                        </div>
                      )
                    }

                    // Number / Phone field
                    if ((blockType as string) === 'number' || fieldName.toLowerCase().includes('phone')) {
                      return (
                        <div
                          key={fieldName || idx}
                          className="relative border-b border-neutral-800 focus-within:border-white transition-colors duration-200 pb-2"
                        >
                          <label
                            htmlFor={fieldName}
                            className="block text-neutral-400 text-sm sm:text-base font-medium mb-1.5"
                          >
                            {fieldLabel}
                            {isRequired && <span className="text-white ml-0.5">*</span>}
                          </label>
                          <input
                            id={fieldName}
                            type="tel"
                            placeholder=""
                            className="w-full bg-transparent text-white placeholder-neutral-600 focus:outline-none text-base sm:text-lg py-1.5"
                            {...register(fieldName, { required: isRequired })}
                          />
                          {errors[fieldName] && (
                            <span className="text-red-400 text-xs mt-1 block">This field is required</span>
                          )}
                        </div>
                      )
                    }

                    // Select field
                    if (blockType === 'select' && 'options' in field) {
                      return (
                        <div
                          key={fieldName || idx}
                          className="relative border-b border-neutral-800 focus-within:border-white transition-colors duration-200 pb-2"
                        >
                          <label
                            htmlFor={fieldName}
                            className="block text-neutral-400 text-sm sm:text-base font-medium mb-1.5"
                          >
                            {fieldLabel}
                            {isRequired && <span className="text-white ml-0.5">*</span>}
                          </label>
                          <select
                            id={fieldName}
                            className="w-full bg-transparent text-white focus:outline-none text-base sm:text-lg py-1.5 cursor-pointer [&>option]:bg-neutral-900 [&>option]:text-white"
                            {...register(fieldName, { required: isRequired })}
                          >
                            <option value="">Select an option</option>
                            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                            {field.options?.map((opt: any, optIdx: number) => (
                              <option key={optIdx} value={opt.value}>
                                {opt.label}
                              </option>
                            ))}
                          </select>
                          {errors[fieldName] && (
                            <span className="text-red-400 text-xs mt-1 block">This field is required</span>
                          )}
                        </div>
                      )
                    }

                    // Default text input (e.g. name, text)
                    return (
                      <div
                        key={fieldName || idx}
                        className="relative border-b border-neutral-800 focus-within:border-white transition-colors duration-200 pb-2"
                      >
                        <label
                          htmlFor={fieldName}
                          className="block text-neutral-400 text-sm sm:text-base font-medium mb-1.5"
                        >
                          {fieldLabel}
                          {isRequired && <span className="text-white ml-0.5">*</span>}
                        </label>
                        <input
                          id={fieldName}
                          type="text"
                          placeholder=""
                          className="w-full bg-transparent text-white placeholder-neutral-600 focus:outline-none text-base sm:text-lg py-1.5"
                          {...register(fieldName, { required: isRequired })}
                        />
                        {errors[fieldName] && (
                          <span className="text-red-400 text-xs mt-1 block">This field is required</span>
                        )}
                      </div>
                    )
                  })}
                </div>

                {/* Submit Button - Label from Form Builder */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className={cn(
                    oswald.className,
                    'w-full mt-10 sm:mt-12 bg-white text-black font-bold uppercase text-lg sm:text-xl py-4 sm:py-4.5 px-8 tracking-wider hover:bg-neutral-200 active:scale-[0.99] transition-all duration-200 cursor-pointer disabled:opacity-50 select-none shadow-md',
                  )}
                >
                  {isLoading ? 'Submitting...' : submitButtonLabel}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
