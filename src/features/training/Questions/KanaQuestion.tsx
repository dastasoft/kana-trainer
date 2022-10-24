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
  alphabet: 'hiragana' | 'katakana'
}

const KanaQuestion = ({
  kanaList,
  currentKana,
  handleResponse,
  alphabet,
}: Props) => {
  const options = useMemo(
    () =>
      _sampleSize(_without(kanaList, currentKana), 3).map(
        ({ romaji }) => romaji
      ),
    [currentKana, kanaList]
  )

  return (
    <>
      <Kana kana={currentKana.kana} alphabet={alphabet} />
      <ResponseSelector
        correctOption={currentKana.romaji}
        options={options}
        handleResponse={handleResponse}
      />
    </>
  )
}

export default KanaQuestion
