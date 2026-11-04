'use client'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

export const RowLabel: React.FC<RowLabelProps> = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data: any = useRowLabel<any>()

  const text = data?.data?.label || data?.data?.link?.label || ''
  const label = text
    ? `${data.rowNumber !== undefined ? data.rowNumber + 1 + '. ' : ''}${text}`
    : `Item ${data.rowNumber !== undefined ? data.rowNumber + 1 : ''}`

  return <div>{label}</div>
}
