import _sampleSize from 'lodash/sampleSize'
import _without from 'lodash/without'
import { useMemo } from 'react'

import Kana from '@/features/shared/Kana'
import type { Kana as TKana, KanaType } from '@/types/shared'

import ResponseSelector from '../ResponseSelector'

type KanaQuestionProps = {
  kanaList: TKana[]
  currentKana: TKana
  handleResponse: (isCorrect: boolean) => void
  alphabet: KanaType
}

const KanaQuestion = ({
  kanaList,
  currentKana,
  handleResponse,
  alphabet,
}: KanaQuestionProps) => {
  const options = useMemo(
    () =>
      _sampleSize(_without(kanaList, currentKana), 3).map(
        ({ romaji }) => romaji
      ),
    [currentKana, kanaList]
  )

  return (
    <div className="mx-auto flex h-full max-w-5xl flex-col">
      <div className="relative mb-5 flex flex-1 rounded-lg bg-gray-700">
        <Kana
          className="motion-safe:animate-fade-in-left"
          kana={currentKana.kana}
          alphabet={alphabet}
          fill
        />
      </div>
      <ResponseSelector
        correctOption={currentKana.romaji}
        options={options}
        handleResponse={handleResponse}
      />
    </div>
  )
}

export default KanaQuestion
