import type { ChangeEvent } from 'react'
import { useContext, useReducer, useState } from 'react'

import Button from '@/components/Button'
import { KanaContext } from '@/context/KanaContext'
import AlphabetSwapper from '@/features/shared/AlphabetSwapper'
import type { Kana, KanaType } from '@/types/shared'

import { QuestionModes } from '../Questions'
import ImgCheckbox from './ImgCheckbox'
import { ACTIONS, initialState, trainingReducer } from './reducer'

interface ITrainingPaths {
  HIRAGANA: 'hiragana'
  KATAKANA: 'katakana'
}

export const TrainingPaths: ITrainingPaths = {
  HIRAGANA: 'hiragana',
  KATAKANA: 'katakana',
} as const

type SelectTrainingProps = {
  start: (
    _selectedKanas: Kana[],
    trainingMode: number,
    _trainingPath: KanaType
  ) => void
}

export default function SelectTraining({ start }: SelectTrainingProps) {
  const [{ selectedKanas, activeOptions }, dispatch] = useReducer(
    trainingReducer,
    initialState
  )
  const [questionMode, setQuestionMode] = useState<number>(
    QuestionModes.KANA_RECOGNITION
  )
  const [trainingPath, setTrainingPath] = useState<KanaType>(
    TrainingPaths.HIRAGANA
  )
  const kanaData = useContext(KanaContext)

  const onSelectMode = () => {
    start(
      [
        ...selectedKanas.basic,
        ...selectedKanas.intermediate,
        ...selectedKanas.advanced,
      ],
      questionMode,
      trainingPath
    )
  }

  return (
    <>
      <h1 className="mb-5 text-4xl">Traning Mode</h1>
      <AlphabetSwapper
        currentAlphabet={trainingPath}
        setCurrentAlphabet={setTrainingPath}
      />
      <div className="my-8 mx-auto max-w-xl">
        <div className="grid grid-cols-3 gap-5">
          <Button
            className="col-span-3"
            onClick={() => {
              dispatch({
                type: ACTIONS.ALL_KANAS,
                payload: kanaData[trainingPath],
              })
            }}
            flavor={activeOptions.allKanas ? 'selected' : 'unselected'}
          >
            All Kanas
          </Button>
          <Button
            onClick={() =>
              dispatch({
                type: ACTIONS.ALL_BASIC,
                payload: kanaData[trainingPath].basic,
              })
            }
            flavor={activeOptions.allBasic ? 'selected' : 'unselected'}
          >
            All Basic
          </Button>
          <Button
            onClick={() =>
              dispatch({
                type: ACTIONS.ALL_INTERMEDIATE,
                payload: kanaData[trainingPath].intermediate,
              })
            }
            flavor={activeOptions.allIntermediate ? 'selected' : 'unselected'}
          >
            All Voiced
          </Button>
          <Button
            onClick={() =>
              dispatch({
                type: ACTIONS.ALL_ADVANCED,
                payload: kanaData[trainingPath].advanced,
              })
            }
            flavor={activeOptions.allAdvanced ? 'selected' : 'unselected'}
          >
            All Y-vowel
          </Button>
          <ImgCheckbox
            checked={questionMode === QuestionModes.KANA_RECOGNITION}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              e.target.checked &&
              setQuestionMode(QuestionModes.KANA_RECOGNITION)
            }
            label="Kana Recognition"
          />
          <ImgCheckbox
            checked={questionMode === QuestionModes.REVERSE_RECOGNITION}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              e.target.checked &&
              setQuestionMode(QuestionModes.REVERSE_RECOGNITION)
            }
            label="Reverse Recognition"
          />
          <ImgCheckbox
            checked={questionMode === QuestionModes.SOUND_RECOGNITION}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              e.target.checked &&
              setQuestionMode(QuestionModes.SOUND_RECOGNITION)
            }
            label="Sound Recognition"
          />
        </div>
        <div className="mt-12 flex justify-center">
          <Button
            onClick={onSelectMode}
            disabled={!Object.values(activeOptions).some((value) => value)}
          >
            Start
          </Button>
        </div>
      </div>
    </>
  )
}
