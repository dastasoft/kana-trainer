import { useMemo } from 'react'

import { Text } from '@chakra-ui/react'
import _sampleSize from 'lodash/sampleSize'
import _without from 'lodash/without'

import { Kana } from '@/features/shared/types'
import ResponseSelector from '@/features/training/ResponseSelector'

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
