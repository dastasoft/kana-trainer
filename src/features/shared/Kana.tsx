import Image from 'next/image'

export default function Kana({ kana }: { kana: string }) {
  return (
    <Image
      src={`/images/static/${kana}.svg`}
      height="100%"
      width="100%"
      alt={kana}
    />
  )
}
