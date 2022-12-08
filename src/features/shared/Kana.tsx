import Image from 'next/image'

import type { KanaType } from '@/types/shared'

export default function Kana({
  kana,
  alphabet,
}: {
  kana: string
  alphabet: KanaType
}) {
  return (
    <Image
      src={`/assets/images/static/${alphabet}/${kana}.svg`}
      height="150"
      width="150"
      alt={kana}
    />
  )
}
