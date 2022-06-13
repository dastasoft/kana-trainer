import { useMemo } from 'react'

import _sampleSize from 'lodash/sampleSize'
import _without from 'lodash/without'

import Kana from '@/features/shared/Kana'
import { Kana as TKana } from '@/features/shared/types'
import ResponseSelector from '@/features/training/ResponseSelector'
// @ts-ignore
import hiraganaData from '@/public/hiragana'

type Props = {
  currentKana: TKana
  handleResponse: (isCorrect: boolean) => void
}

const KanaQuestion = ({ currentKana, handleResponse }: Props) => {
  const options = useMemo(
    () =>
      _sampleSize(_without(hiraganaData.basic, currentKana), 3).map(
        ({ romaji }) => romaji
      ),
    [currentKana]
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
