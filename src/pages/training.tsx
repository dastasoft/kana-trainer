/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-underscore-dangle */
import { useContext, useState } from 'react'

import { Box, Button, Radio, RadioGroup, Stack, VStack } from '@chakra-ui/react'
import _capitalize from 'lodash/capitalize'
import _find from 'lodash/find'
import _map from 'lodash/map'
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

interface ITrainingPaths {
  HIRAGANA: 'hiragana'
  KATAKANA: 'katakana'
}

const TrainingPaths: ITrainingPaths = {
  HIRAGANA: 'hiragana',
  KATAKANA: 'katakana',
} as const

const Training: NextPage = () => {
  const [trainingPath, setTrainingPath] = useState<'hiragana' | 'katakana'>(
    TrainingPaths.HIRAGANA
  )
  const [training, setTraining] = useState<number>(
    QuestionModes.KANA_RECOGNITION
  )
  const [remainingKana, setRemainingKana] = useState([] as Kana[])
  const [currentKana, setCurrentKana] = useState<Kana | null>(null)
  const [correctResponses, setCorrectResponses] = useState(0)
  const [UIState, setUIState] = useState<number>(UIStates.SELECT_MODE)

  const kanaData = useContext(KanaContext)

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
    const _remainingKana = kanaData[trainingPath].basic
    setRemainingKana(_remainingKana)
    setTraining(trainingMode)
    setUIState(UIStates.TRAINING)
    displayNext(_remainingKana)
  }

  const startAgain = () => {
    setUIState(UIStates.SELECT_MODE)
  }

  if (UIState === UIStates.SELECT_MODE) {
    return (
      <Box>
        <RadioGroup
          onChange={(nextValue: 'hiragana' | 'katakana') =>
            setTrainingPath(_find(TrainingPaths, (v) => v === nextValue)!)
          }
          value={trainingPath}
        >
          <Stack direction="row">
            {_map(TrainingPaths, (value) => (
              <Radio key={value} value={value}>
                {_capitalize(value)}
              </Radio>
            ))}
          </Stack>
        </RadioGroup>
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
            kanaList={kanaData[trainingPath].basic}
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
      {correctResponses} of {kanaData[trainingPath].basic.length}
      <Button onClick={startAgain}>Start again</Button>
    </Box>
  )
}

export default Training
