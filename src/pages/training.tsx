import { useContext, useEffect, useState } from 'react'

import { Box, Button, VStack } from '@chakra-ui/react'
import _sample from 'lodash/sample'
import _without from 'lodash/without'
import { NextPage } from 'next'

import { KanaContext } from '@/features/shared/kana-context'
import { Kana } from '@/features/shared/types'
import Questions, { QuestionModes } from '@/features/training/Questions'

const UIStates = {
  SELECT_MODE: 0,
  TRAINING: 1,
  END: 2,
} as const

const Training: NextPage = () => {
  const [training, setTraining] = useState<number>(
    QuestionModes.KANA_RECOGNITION
  )
  const [remainingKana, setRemainingKana] = useState([] as Kana[])
  const [currentKana, setCurrentKana] = useState<Kana | null>(null)
  const [correctResponses, setCorrectResponses] = useState(0)
  const [UIState, setUIState] = useState<number>(UIStates.SELECT_MODE)

  const { hiragana: hiraganaData } = useContext(KanaContext)

  useEffect(() => {
    setRemainingKana(hiraganaData.basic)
  }, [hiraganaData.basic])

  const displayNext = () => {
    if (remainingKana.length <= 0) {
      setUIState(UIStates.END)
    } else {
      const nextKana = _sample(remainingKana)
      setRemainingKana(_without(remainingKana, nextKana) as Kana[])
      setCurrentKana(nextKana as Kana)
    }
  }

  const handleResponse = (isCorrect: boolean) => {
    if (isCorrect) setCorrectResponses(correctResponses + 1)
    displayNext()
  }

  const start = (trainingMode: number) => {
    setTraining(trainingMode)
    setUIState(UIStates.TRAINING)
    displayNext()
  }

  const startAgain = () => {
    setRemainingKana(hiraganaData.basic)
    setUIState(UIStates.SELECT_MODE)
  }

  if (UIState === UIStates.SELECT_MODE) {
    return (
      <VStack mt="4">
        <Button onClick={() => start(QuestionModes.KANA_RECOGNITION)}>
          Kana Recognition
        </Button>
        <Button onClick={() => start(QuestionModes.REVERSE_RECOGNITION)}>
          Reverse Recognition
        </Button>
        <Button onClick={() => start(QuestionModes.SOUND_RECOGNITION)}>
          Sound Recognition
        </Button>
      </VStack>
    )
  }

  if (UIState === UIStates.TRAINING) {
    return (
      <Box>
        {currentKana && (
          <Questions
            kanaList={hiraganaData.basic}
            currentKana={currentKana}
            handleResponse={handleResponse}
            trainingMode={training}
          />
        )}
      </Box>
    )
  }

  return (
    <Box>
      {correctResponses} of {hiraganaData.basic.length}
      <Button onClick={startAgain}>Start again</Button>
    </Box>
  )
}

export default Training
