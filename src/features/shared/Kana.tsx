import Image from 'next/image'

import type { KanaType } from '@/types/shared'

export default function Kana({
  kana,
  alphabet,
  height = 150,
  width = 150,
  className,
  fill = false,
}: {
  kana: string
  alphabet: KanaType
  height?: number
  width?: number
  className?: string | undefined
  fill?: boolean
}) {
  return (
    <Image
      className={className}
      fill={fill}
      src={`/assets/images/static/${alphabet}/${kana}.svg`}
      height={fill ? undefined : height}
      width={fill ? undefined : width}
      alt={kana}
    />
  )
}
