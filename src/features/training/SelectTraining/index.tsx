import type { ChangeEvent } from 'react'
import { useContext, useEffect, useReducer, useState } from 'react'

import Button from '@/components/Button'
import { KanaContext } from '@/context/KanaContext'
import AlphabetSwapper from '@/features/shared/AlphabetSwapper'
import training from '@/public/locales/en/training.json'
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

  useEffect(() => {
    dispatch({ type: ACTIONS.RESET })
  }, [trainingPath])

  return (
    <>
      <h1 className="mb-5 text-4xl">{training.title}</h1>
      <AlphabetSwapper
        currentAlphabet={trainingPath}
        setCurrentAlphabet={setTrainingPath}
      />
      <div className="my-8 mx-auto max-w-3xl">
        <div className="grid grid-cols-3 gap-5">
          <Button
            className="col-span-3 text-xl"
            onClick={() => {
              dispatch({
                type: ACTIONS.ALL_KANAS,
                payload: kanaData[trainingPath],
              })
            }}
            flavor={activeOptions.allKanas ? 'selected' : 'unselected'}
          >
            {training.actions.allKanas}
          </Button>
          <Button
            className="col-span-3 mx-auto w-1/2 text-sm sm:col-span-1 sm:w-full"
            onClick={() =>
              dispatch({
                type: ACTIONS.ALL_BASIC,
                payload: kanaData[trainingPath].basic,
              })
            }
            flavor={activeOptions.allBasic ? 'selected' : 'unselected'}
          >
            {training.actions.allBasic}
          </Button>
          <Button
            className="col-span-3 mx-auto w-1/2 text-sm sm:col-span-1 sm:w-full"
            onClick={() =>
              dispatch({
                type: ACTIONS.ALL_INTERMEDIATE,
                payload: kanaData[trainingPath].intermediate,
              })
            }
            flavor={activeOptions.allIntermediate ? 'selected' : 'unselected'}
          >
            {training.actions.allIntermediate}
          </Button>
          <Button
            className="col-span-3 mx-auto w-1/2 text-sm sm:col-span-1 sm:w-full"
            onClick={() =>
              dispatch({
                type: ACTIONS.ALL_ADVANCED,
                payload: kanaData[trainingPath].advanced,
              })
            }
            flavor={activeOptions.allAdvanced ? 'selected' : 'unselected'}
          >
            {training.actions.allAdvanced}
          </Button>
          <ImgCheckbox
            checked={questionMode === QuestionModes.KANA_RECOGNITION}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              e.target.checked &&
              setQuestionMode(QuestionModes.KANA_RECOGNITION)
            }
            label={training.actions.kanaRecognition}
            imgURL="/assets/images/kana-recognition.webp"
          />
          <ImgCheckbox
            checked={questionMode === QuestionModes.REVERSE_RECOGNITION}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              e.target.checked &&
              setQuestionMode(QuestionModes.REVERSE_RECOGNITION)
            }
            label={training.actions.reverseRecognition}
            imgURL="/assets/images/reverse-recognition.webp"
          />
          <ImgCheckbox
            checked={questionMode === QuestionModes.SOUND_RECOGNITION}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              e.target.checked &&
              setQuestionMode(QuestionModes.SOUND_RECOGNITION)
            }
            label={training.actions.soundRecognition}
            imgURL="/assets/images/sound-recognition.webp"
          />
        </div>
        <div className="mt-12 flex justify-center">
          <Button
            onClick={onSelectMode}
            disabled={!Object.values(activeOptions).some((value) => value)}
          >
            {training.actions.start}
          </Button>
        </div>
        <div className="mt-12 rounded-lg border border-primary p-5 leading-relaxed">
          <p className="mb-5">{training.description1}</p>
          <p>{training.description2}</p>
        </div>
      </div>
    </>
  )
}
