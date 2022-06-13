import { Flex } from '@chakra-ui/react'

import { Kana } from '@/features/shared/types'

import KanaQuestion from './KanaQuestion'
import ReverseQuestion from './ReverseQuestion'
import SoundQuestion from './SoundQuestion'

export const QuestionModes = {
  KANA_RECOGNITION: 0,
  REVERSE_RECOGNITION: 1,
  SOUND_RECOGNITION: 2,
} as const

type Props = {
  currentKana: Kana
  handleResponse: (isCorrect: boolean) => void
  trainingMode: number
}

export default function Questions({
  currentKana,
  handleResponse,
  trainingMode = QuestionModes.KANA_RECOGNITION,
}: Props) {
  const Question = () => {
    if (trainingMode === QuestionModes.KANA_RECOGNITION)
      return (
        <KanaQuestion
          currentKana={currentKana}
          handleResponse={handleResponse}
        />
      )

    if (trainingMode === QuestionModes.REVERSE_RECOGNITION)
      return (
        <ReverseQuestion
          currentKana={currentKana}
          handleResponse={handleResponse}
        />
      )

    if (trainingMode === QuestionModes.SOUND_RECOGNITION)
      return (
        <SoundQuestion
          currentKana={currentKana}
          handleResponse={handleResponse}
        />
      )

    return null
  }

  return (
    <Flex flexDirection="column" alignItems="center">
      <Question />
    </Flex>
  )
}
