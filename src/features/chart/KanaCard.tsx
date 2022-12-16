import Image from 'next/image'
import { useState } from 'react'

import Kana from '@/features/shared/Kana'
import useAudio from '@/hooks/useAudio'
import type { KanaType } from '@/types/shared'

type KanaCardProps = {
  kana: string
  romaji: string
  displayRomaji: boolean
  alphabet: KanaType
  disableAnimations: boolean
}

const KanaCard = ({
  kana,
  romaji,
  displayRomaji,
  alphabet,
  disableAnimations,
}: KanaCardProps) => {
  const [strokeOrderVisible, setStrokeOrderVisible] = useState(false)
  const [play] = useAudio(romaji)

  const toggleHandler = () => {
    if (disableAnimations) return
    setStrokeOrderVisible((prevState: boolean) => !prevState)
  }

  return (
    <div className="flex h-full flex-col items-center rounded-lg bg-primary">
      <div
        key={romaji}
        className="flex h-full w-full flex-1 flex-col items-center justify-center rounded-lg border-2 border-primary bg-white py-1 hover:bg-gray-400 md:flex-row md:justify-between md:px-2"
      >
        <div
          onClick={toggleHandler}
          className="min-h-8 relative h-full w-2/3 cursor-pointer md:mr-2"
        >
          {strokeOrderVisible ? (
            <Image
              src={`/assets/images/animated/${alphabet}/${kana}.gif`}
              fill
              alt={kana}
            />
          ) : (
            <Kana kana={kana} alphabet={alphabet} fill />
          )}
        </div>
        <button
          className="btn-primary btn-xs btn-circle btn lg:btn-md"
          onClick={play}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 384 512"
            className="h-4 w-4 text-white lg:h-6 lg:w-6"
          >
            <path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" />
          </svg>
        </button>
      </div>
      <div className="h-4 rounded-lg border-2 border-primary bg-primary text-xs uppercase md:h-6 md:text-lg">
        <p>{displayRomaji && romaji}</p>
      </div>
    </div>
  )
}

export default KanaCard
