import { useContext, useReducer, useState } from 'react'

import Button from '@/components/Button'
import { KanaContext } from '@/context/KanaContext'
import AlphabetSwapper from '@/features/shared/AlphabetSwapper'
import type { Kana, KanaType } from '@/types/shared'

import { QuestionModes } from '../Questions'
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
      <h1 className="text-5xl">Select what you want to train</h1>
      <AlphabetSwapper
        currentAlphabet={trainingPath}
        setCurrentAlphabet={setTrainingPath}
      />
      <div className="my-8">
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
          <div className="form-control">
            <label className="label cursor-pointer">
              <input
                type="radio"
                name="radio-10"
                className="radio mr-3 checked:bg-primary"
                checked={questionMode === QuestionModes.KANA_RECOGNITION}
                onChange={(e) =>
                  e.target.checked &&
                  setQuestionMode(QuestionModes.KANA_RECOGNITION)
                }
              />
              <span className="label-text">Kana Recognition</span>
            </label>
          </div>
          <div className="form-control">
            <label className="label cursor-pointer">
              <input
                type="radio"
                name="radio-10"
                className="radio mr-3 checked:bg-primary"
                checked={questionMode === QuestionModes.REVERSE_RECOGNITION}
                onChange={(e) =>
                  e.target.checked &&
                  setQuestionMode(QuestionModes.REVERSE_RECOGNITION)
                }
              />
              <span className="label-text">Reverse Recognition</span>
            </label>
          </div>
          <div className="form-control">
            <label className="label cursor-pointer">
              <input
                type="radio"
                name="radio-10"
                className="radio mr-3 checked:bg-primary"
                checked={questionMode === QuestionModes.SOUND_RECOGNITION}
                onChange={(e) =>
                  e.target.checked &&
                  setQuestionMode(QuestionModes.SOUND_RECOGNITION)
                }
              />
              <span className="label-text">Sound Recognition</span>
            </label>
          </div>
        </div>
        <div className="mt-12 flex justify-center">
          <Button
            onClick={onSelectMode}
            disabled={!Object.values(activeOptions).some((value) => value)}
          >
            Select Mode
          </Button>
        </div>
      </div>
    </>
  )
}
