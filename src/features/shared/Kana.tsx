import Image from 'next/image'

export default function Kana({ romaji }: { romaji: string }) {
  return (
    <Image
      src={`/images/static/${romaji}.svg`}
      height="100%"
      width="100%"
      alt={romaji}
    />
  )
}
