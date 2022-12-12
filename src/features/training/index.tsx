import _sample from 'lodash/sample'
import _without from 'lodash/without'
import { useState } from 'react'

import Button from '@/components/Button'
import type { Kana, KanaType } from '@/types/shared'

import Questions, { QuestionModes } from './Questions'
import SelectTraining, { TrainingPaths } from './SelectTraining'

const UIStates = {
  SELECT_TRAINING: 0,
  TRAINING: 2,
  END: 3,
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
  const [UIState, setUIState] = useState<number>(UIStates.SELECT_TRAINING)

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

  const start = (
    _selectedKanas: Kana[],
    trainingMode: number,
    _trainingPath: KanaType
  ) => {
    setSelectedKanas(_selectedKanas)
    setRemainingKana(_selectedKanas)
    setTrainingPath(_trainingPath)
    setTraining(trainingMode)
    setUIState(UIStates.TRAINING)
    displayNext(_selectedKanas)
  }

  const startAgain = () => setUIState(UIStates.SELECT_TRAINING)

  if (UIState === UIStates.SELECT_TRAINING) {
    return <SelectTraining start={start} />
  }

  if (UIState === UIStates.TRAINING) {
    return (
      <div>
        <Button onClick={startAgain}>Return to select training</Button>
        {currentKana && (
          <Questions
            alphabet={trainingPath}
            kanaList={selectedKanas}
            currentKana={currentKana}
            handleResponse={handleResponse}
            trainingMode={training}
          />
        )}
      </div>
    )
  }

  return (
    <>
      <p className="mb-8">
        {correctResponses} of {selectedKanas.length}
      </p>
      <Button onClick={startAgain}>Start again</Button>
    </>
  )
}

export default Training
