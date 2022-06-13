import { useMemo } from 'react'

import _sampleSize from 'lodash/sampleSize'
import _without from 'lodash/without'

import Kana from '@/features/shared/Kana'
import { Kana as TKana } from '@/features/shared/types'
import ResponseSelector from '@/features/training/ResponseSelector'

type Props = {
  kanaList: TKana[]
  currentKana: TKana
  handleResponse: (isCorrect: boolean) => void
}

const KanaQuestion = ({ kanaList, currentKana, handleResponse }: Props) => {
  const options = useMemo(
    () =>
      _sampleSize(_without(kanaList, currentKana), 3).map(
        ({ romaji }) => romaji
      ),
    [currentKana, kanaList]
  )

  return (
    <>
      <Kana romaji={currentKana.romaji} />
      <ResponseSelector
        correctOption={currentKana.romaji}
        options={options}
        handleResponse={handleResponse}
      />
    </>
  )
}

export default KanaQuestion
