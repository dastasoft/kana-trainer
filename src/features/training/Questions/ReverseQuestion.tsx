import _sampleSize from 'lodash/sampleSize'
import _without from 'lodash/without'
import { useMemo } from 'react'

import type { Kana } from '@/types/shared'

import ResponseSelector from '../ResponseSelector'

type Props = {
  kanaList: Kana[]
  currentKana: Kana
  handleResponse: (isCorrect: boolean) => void
}

const ReverseQuestion = ({ kanaList, currentKana, handleResponse }: Props) => {
  const options = useMemo(
    () =>
      _sampleSize(_without(kanaList, currentKana), 3).map(({ kana }) => kana),
    [currentKana, kanaList]
  )

  return (
    <>
      <p className="font-bold uppercase">{currentKana.romaji}</p>
      <ResponseSelector
        correctOption={currentKana.kana}
        options={options}
        handleResponse={handleResponse}
      />
    </>
  )
}

export default ReverseQuestion
