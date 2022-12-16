import _sampleSize from 'lodash/sampleSize'
import _without from 'lodash/without'
import { useMemo } from 'react'

import Kana from '@/features/shared/Kana'
import type { Kana as TKana, KanaType } from '@/types/shared'

import QuestionPanel from './QuestionPanel'

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
    <QuestionPanel
      correctOption={currentKana.romaji}
      options={options}
      handleResponse={handleResponse}
    >
      <Kana kana={currentKana.kana} alphabet={alphabet} fill />
    </QuestionPanel>
  )
}

export default KanaQuestion
