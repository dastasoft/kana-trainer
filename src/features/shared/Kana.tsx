import Image from 'next/image'

export default function Kana({
  kana,
  alphabet,
}: {
  kana: string
  alphabet: 'hiragana' | 'katakana'
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
