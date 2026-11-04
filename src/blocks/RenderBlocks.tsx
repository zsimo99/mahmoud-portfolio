import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { AboutBlock } from '@/blocks/About/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { HeroBlock } from '@/blocks/Hero/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { SlideSectionBlock } from '@/blocks/SlideSection/Component'
import { LatestWorkBlock } from '@/blocks/LatestWork/Component'
import { ContactBlock } from '@/blocks/Contact/Component'

const blockComponents = {
  about: AboutBlock,
  contact: ContactBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  hero: HeroBlock,
  latestWork: LatestWorkBlock,
  mediaBlock: MediaBlock,
  slideSection: SlideSectionBlock,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              const isHero = blockType === 'hero'

              return (
                <div key={index}>
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} disableInnerContainer />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
