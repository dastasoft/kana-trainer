import { useMemo } from 'react'

import { Text } from '@chakra-ui/react'
import _sampleSize from 'lodash/sampleSize'
import _without from 'lodash/without'

import { Kana } from '@/features/shared/types'
import ResponseSelector from '@/features/training/ResponseSelector'
// @ts-ignore
import hiraganaData from '@/public/hiragana'

type Props = {
  currentKana: Kana
  handleResponse: (isCorrect: boolean) => void
}

const ReverseQuestion = ({ currentKana, handleResponse }: Props) => {
  const options = useMemo(
    () =>
      _sampleSize(_without(hiraganaData.basic, currentKana), 3).map(
        ({ kana }) => kana
      ),
    [currentKana]
  )

  return (
    <>
      <Text textTransform="uppercase" fontWeight="bold">
        {currentKana.romaji}
      </Text>
      <ResponseSelector
        correctOption={currentKana.kana}
        options={options}
        handleResponse={handleResponse}
      />
    </>
  )
}

export default ReverseQuestion
