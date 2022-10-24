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
  kanaList: Kana[]
  currentKana: Kana
  handleResponse: (isCorrect: boolean) => void
  trainingMode: number
  alphabet: 'hiragana' | 'katakana'
}

export default function Questions({
  kanaList,
  currentKana,
  handleResponse,
  trainingMode = QuestionModes.KANA_RECOGNITION,
  alphabet,
}: Props) {
  const Question = () => {
    if (trainingMode === QuestionModes.KANA_RECOGNITION)
      return (
        <KanaQuestion
          alphabet={alphabet}
          kanaList={kanaList}
          currentKana={currentKana}
          handleResponse={handleResponse}
        />
      )

    if (trainingMode === QuestionModes.REVERSE_RECOGNITION)
      return (
        <ReverseQuestion
          kanaList={kanaList}
          currentKana={currentKana}
          handleResponse={handleResponse}
        />
      )

    if (trainingMode === QuestionModes.SOUND_RECOGNITION)
      return (
        <SoundQuestion
          kanaList={kanaList}
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
