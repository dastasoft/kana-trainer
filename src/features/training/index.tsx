import _sample from 'lodash/sample'
import _without from 'lodash/without'
import { useState } from 'react'

import Button from '@/components/Button'
import type { Kana, KanaType } from '@/types/shared'

import Questions, { QuestionModes } from './Questions'
import SelectKanas from './SelectKanas'

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

const Training = () => {
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
    setRemainingKana(selectedKanas)
    setTraining(trainingMode)
    setUIState(UIStates.TRAINING)
    displayNext(selectedKanas)
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
      <div className="flex items-center justify-center">
        <Button
          onClick={() => start(QuestionModes.KANA_RECOGNITION)}
          className="mr-5"
        >
          Kana Recognition
        </Button>
        <Button
          onClick={() => start(QuestionModes.REVERSE_RECOGNITION)}
          className="mr-5"
        >
          Reverse Recognition
        </Button>
        <Button
          onClick={() => start(QuestionModes.SOUND_RECOGNITION)}
          className="mr-5"
        >
          Sound Recognition
        </Button>
      </div>
    )
  }

  if (UIState === UIStates.TRAINING) {
    return (
      <>
        {currentKana && (
          <Questions
            alphabet={trainingPath}
            kanaList={selectedKanas}
            currentKana={currentKana}
            handleResponse={handleResponse}
            trainingMode={training}
          />
        )}
      </>
    )
  }

  return (
    <>
      {correctResponses} of {selectedKanas.length}
      <button onClick={startAgain}>Start again</button>
    </>
  )
}

export default Training
