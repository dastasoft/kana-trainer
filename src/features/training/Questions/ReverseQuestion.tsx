import _sampleSize from 'lodash/sampleSize'
import _without from 'lodash/without'
import { useMemo } from 'react'

import type { HandleResponse, Kana } from '@/types/shared'

import QuestionPanel from './QuestionPanel'

type Props = {
  kanaList: Kana[]
  currentKana: Kana
  handleResponse: HandleResponse
}

const ReverseQuestion = ({ kanaList, currentKana, handleResponse }: Props) => {
  const options = useMemo(
    () =>
      _sampleSize(_without(kanaList, currentKana), 3).map(({ kana }) => kana),
    [currentKana, kanaList]
  )
  const question = currentKana.romaji

  return (
    <QuestionPanel
      question={question}
      correctOption={currentKana.kana}
      options={options}
      handleResponse={handleResponse}
    >
      <p className="text-6xl font-bold uppercase">{question}</p>
    </QuestionPanel>
  )
}

export default ReverseQuestion
