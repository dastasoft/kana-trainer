import type { NextPage } from 'next'
import { useContext, useState } from 'react'

import { KanaContext } from '@/context/KanaContext'
import KanaList from '@/features/chart/KanaList'
import RomajiToggler from '@/features/chart/RomajiToggler'
import AlphabetSwapper from '@/features/shared/AlphabetSwapper'
import { Meta } from '@/layouts/Meta'
import { RootLayout } from '@/layouts/RootLayout'
import chart from '@/public/locales/en/chart.json'
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
          {chart.hiragana.description}
        </p>
      ) : (
        <p className="mb-5 text-lg leading-relaxed">
          {chart.katakana.description}
        </p>
      )}
      <p className="text-base">{chart.displayStrokeOrder}</p>
      <KanaList
        kanaData={currentAlphabet === 'hiragana' ? hiraganaData : katakanaData}
        displayRomaji={displayRomaji}
        alphabet={currentAlphabet}
      />
    </RootLayout>
  )
}

export default ChartsPage
