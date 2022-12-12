import type { NextPage } from 'next'
import { useContext, useState } from 'react'

import { KanaContext } from '@/context/KanaContext'
import KanaList from '@/features/chart/KanaList'
import RomajiToggler from '@/features/chart/RomajiToggler'
import AlphabetSwapper from '@/features/shared/AlphabetSwapper'
import { Meta } from '@/layouts/Meta'
import { RootLayout } from '@/layouts/RootLayout'
import type { KanaType } from '@/types/shared'
import { AppConfig } from '@/utils/AppConfig'

const ChartsPage: NextPage = () => {
  const [displayRomaji, setDisplayRomaji] = useState(true)
  const [currentAlphabet, setCurrentAlphabet] = useState<KanaType>('hiragana')

  const { hiragana: hiraganaData, katakana: katakanaData } =
    useContext(KanaContext)

  return (
    <RootLayout
      meta={
        <Meta
          title="Charts | Kana Trainer"
          description={AppConfig.description}
        />
      }
    >
      <div className="mb-5 flex items-center justify-between">
        <AlphabetSwapper
          currentAlphabet={currentAlphabet}
          setCurrentAlphabet={setCurrentAlphabet}
        />
        <RomajiToggler
          displayRomaji={displayRomaji}
          setDisplayRomaji={setDisplayRomaji}
        />
      </div>
      {currentAlphabet === 'hiragana' ? (
        <p className="mb-5 text-lg leading-relaxed">
          Hiragana is the basic Japanese phonetic script. It represents every
          sound in the Japanese language. Therefore, you can theoretically write
          everything in Hiragana. However, because Japanese is written with no
          spaces, this will create nearly indecipherable text.
        </p>
      ) : (
        <p className="mb-5 text-lg leading-relaxed">
          Katakana is mainly used for words imported from foreign languages. It
          can also be used to emphasize certain words similar to the function of
          italics.
        </p>
      )}
      <p className="text-base">
        Click on each Kana to display the stroke order animation.
      </p>
      <KanaList
        kanaData={currentAlphabet === 'hiragana' ? hiraganaData : katakanaData}
        displayRomaji={displayRomaji}
        alphabet={currentAlphabet}
      />
    </RootLayout>
  )
}

export default ChartsPage
