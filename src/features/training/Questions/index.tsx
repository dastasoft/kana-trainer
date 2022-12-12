import type { Kana, KanaType } from '@/types/shared'

import KanaQuestion from './KanaQuestion'
import ReverseQuestion from './ReverseQuestion'
import SoundQuestion from './SoundQuestion'

export const QuestionModes = {
  KANA_RECOGNITION: 0,
  REVERSE_RECOGNITION: 1,
  SOUND_RECOGNITION: 2,
} as const

type QuestionsProps = {
  kanaList: Kana[]
  currentKana: Kana
  handleResponse: (isCorrect: boolean) => void
  trainingMode: number
  alphabet: KanaType
}

export default function Questions({
  kanaList,
  currentKana,
  handleResponse,
  trainingMode = QuestionModes.KANA_RECOGNITION,
  alphabet,
}: QuestionsProps) {
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
    <div className="flex flex-col items-center">
      <Question />
    </div>
  )
}
