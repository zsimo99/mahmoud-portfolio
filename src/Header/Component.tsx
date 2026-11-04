import { BottomDockNavigation } from '@/components/BottomDockNavigation'
import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

export async function Header() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const headerData: any = await getCachedGlobal('header', 1)()

  return <BottomDockNavigation data={headerData} />
}
