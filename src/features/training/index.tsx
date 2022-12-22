import _sample from 'lodash/sample'
import _without from 'lodash/without'
import { useState } from 'react'

import Button from '@/components/Button'
import type { HandleResponse, Kana, KanaType } from '@/types/shared'

import Questions, { QuestionModes } from './Questions'
import type { Response } from './Results'
import Results from './Results'
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
  const [responses, setResponses] = useState<Response[]>([])
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

  const handleResponse: HandleResponse = (
    question,
    responseSelected,
    correctOption
  ) => {
    const newResponse: Response = {
      question,
      response: responseSelected,
      correctResponse: correctOption,
      wasCorrect: responseSelected === correctOption,
    }

    setResponses((prev) => [...prev, newResponse])
    displayNext(remainingKana)
  }

  const start = (
    _selectedKanas: Kana[],
    trainingMode: number,
    _trainingPath: KanaType
  ) => {
    setSelectedKanas(_selectedKanas)
    setRemainingKana(_selectedKanas)
    setResponses([])
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
        <div className="mb-6 flex h-5 items-center justify-between">
          <Button className="w-min" onClick={startAgain} variant="flat">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              className="h-5 fill-white"
            >
              <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
            </svg>
          </Button>
        </div>
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

  return <Results responses={responses} startAgain={startAgain} />
}

export default Training
