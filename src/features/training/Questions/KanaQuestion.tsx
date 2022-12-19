import _sampleSize from 'lodash/sampleSize'
import _without from 'lodash/without'
import { useMemo } from 'react'

import Kana from '@/features/shared/Kana'
import type { HandleResponse, Kana as TKana, KanaType } from '@/types/shared'

import QuestionPanel from './QuestionPanel'

type KanaQuestionProps = {
  kanaList: TKana[]
  currentKana: TKana
  handleResponse: HandleResponse
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
  const question = currentKana.kana

  return (
    <QuestionPanel
      question={question}
      correctOption={currentKana.romaji}
      options={options}
      handleResponse={handleResponse}
    >
      <Kana kana={question} alphabet={alphabet} fill />
    </QuestionPanel>
  )
}

export default KanaQuestion
