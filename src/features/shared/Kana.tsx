import Image from 'next/image'

import { KanaType } from './types'

export default function Kana({
  kana,
  alphabet,
}: {
  kana: string
  alphabet: KanaType
}) {
  return (
    <Image
      src={`/images/static/${alphabet}/${kana}.svg`}
      height="100%"
      width="100%"
      alt={kana}
    />
  )
}
