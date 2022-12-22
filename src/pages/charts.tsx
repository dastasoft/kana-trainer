import type { NextPage } from 'next'
import { useContext, useState } from 'react'

import { KanaContext } from '@/context/KanaContext'
import KanaList from '@/features/chart/KanaList'
import AlphabetSwapper from '@/features/shared/AlphabetSwapper'
import { Meta } from '@/layouts/Meta'
import { RootLayout } from '@/layouts/RootLayout'
import chart from '@/public/locales/en/chart.json'
import common from '@/public/locales/en/common.json'
import type { KanaType } from '@/types/shared'
import { AppConfig } from '@/utils/AppConfig'

const ChartsPage: NextPage = () => {
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
      <h2 className="mb-3 text-3xl">Chart</h2>
      <p className="text-lg leading-relaxed">{chart.description}</p>
      <div className="mt-10 mb-5">
        <AlphabetSwapper
          currentAlphabet={currentAlphabet}
          setCurrentAlphabet={setCurrentAlphabet}
        />
      </div>
      <p className="mb-5 text-lg leading-relaxed">
        {currentAlphabet === 'hiragana'
          ? chart.hiragana.description
          : chart.katakana.description}
      </p>
      <KanaList
        kanaData={currentAlphabet === 'hiragana' ? hiraganaData : katakanaData}
        alphabet={currentAlphabet}
      />
      <div className="mt-10 leading-relaxed">
        <h2 className="mb-2 text-3xl">{common.kanaAlphabets.romaji}</h2>
        <p className="mb-3">{chart.romaji.description1}</p>
        <p className="mb-3">{chart.romaji.description2}</p>
        <p className="mb-3">{chart.romaji.description3}</p>
      </div>
    </RootLayout>
  )
}

export default ChartsPage
