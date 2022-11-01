/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-underscore-dangle */
import { useState } from 'react'

import { Box, Button, VStack } from '@chakra-ui/react'
import _sample from 'lodash/sample'
import _without from 'lodash/without'
import { NextPage } from 'next'

import { Kana, KanaType } from '@/features/shared/types'
import Questions, { QuestionModes } from '@/features/training/Questions'
import SelectKanas from '@/features/training/SelectKanas'

const UIStates = {
  SELECT_KANAS: 0,
  SELECT_MODE: 1,
  TRAINING: 2,
  END: 3,
} as const

interface ITrainingPaths {
  HIRAGANA: 'hiragana'
  KATAKANA: 'katakana'
}

const TrainingPaths: ITrainingPaths = {
  HIRAGANA: 'hiragana',
  KATAKANA: 'katakana',
} as const

const Training: NextPage = () => {
  const [trainingPath, setTrainingPath] = useState<KanaType>(
    TrainingPaths.HIRAGANA
  )
  const [training, setTraining] = useState<number>(
    QuestionModes.KANA_RECOGNITION
  )
  const [remainingKana, setRemainingKana] = useState([] as Kana[])
  const [selectedKanas, setSelectedKanas] = useState([] as Kana[])
  const [currentKana, setCurrentKana] = useState<Kana | null>(null)
  const [correctResponses, setCorrectResponses] = useState(0)
  const [UIState, setUIState] = useState<number>(UIStates.SELECT_KANAS)

  const nextScreen = () => setUIState((prevState) => prevState + 1)

  const displayNext = (_remainingKana: Kana[]) => {
    if (_remainingKana.length <= 0) {
      setUIState(UIStates.END)
    } else {
      const nextKana = _sample(_remainingKana)
      setRemainingKana(_without(_remainingKana, nextKana) as Kana[])
      setCurrentKana(nextKana as Kana)
    }
  }

  const handleResponse = (isCorrect: boolean) => {
    if (isCorrect) setCorrectResponses(correctResponses + 1)
    displayNext(remainingKana)
  }

  const start = (trainingMode: number) => {
    const _remainingKana = selectedKanas
    setRemainingKana(_remainingKana)
    setTraining(trainingMode)
    setUIState(UIStates.TRAINING)
    displayNext(_remainingKana)
  }

  const startAgain = () => {
    setUIState(UIStates.SELECT_MODE)
  }

  if (UIState === UIStates.SELECT_KANAS) {
    return (
      <SelectKanas
        trainingPath={trainingPath}
        setTrainingPath={setTrainingPath}
        setSelectedKanas={setSelectedKanas}
        nextScreen={nextScreen}
      />
    )
  }

  if (UIState === UIStates.SELECT_MODE) {
    return (
      <Box>
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
      </Box>
    )
  }

  if (UIState === UIStates.TRAINING) {
    return (
      <Box>
        {currentKana && (
          <Questions
            alphabet={trainingPath}
            kanaList={selectedKanas}
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
      {correctResponses} of {selectedKanas.length}
      <Button onClick={startAgain}>Start again</Button>
    </Box>
  )
}

export default Training
