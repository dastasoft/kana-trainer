/* eslint-disable no-nested-ternary */
import _shuffle from 'lodash/shuffle'
import { useContext, useEffect, useMemo, useState } from 'react'

import Button from '@/components/Button'
import { TrainingContext } from '@/context/TrainingContext'
import type { HandleResponse } from '@/types/shared'

type ResponseSelectorProps = {
  question: string
  correctOption: string
  options: string[]
  handleResponse: HandleResponse
}

export default function ResponseSelector({
  question = '',
  correctOption = '',
  options = [],
  handleResponse,
}: ResponseSelectorProps) {
  const [revealResponses, setRevealResponses] = useState(false)
  const [iddleResponse, setIddleResponse] = useState(false)
  const [responseSelected, setResponseSelected] = useState<string | null>(null)
  const { nextQuestionTime, revealResponsetime } = useContext(TrainingContext)

  const allOptions = useMemo(
    () => _shuffle([correctOption, ...options]),
    [correctOption, options]
  )

  useEffect(() => {
    if (responseSelected) {
      setIddleResponse(true)
      setTimeout(() => {
        setRevealResponses(true)

        if (handleResponse) {
          setTimeout(() => {
            setRevealResponses(false)
            handleResponse(question, responseSelected, correctOption)
          }, nextQuestionTime)
        }
      }, revealResponsetime)
    }
  }, [responseSelected])

  return (
    <div className="grid w-full grid-cols-2 gap-5">
      {allOptions.map((option: string) => (
        <Button
          key={option}
          disabled={!!responseSelected}
          id={option}
          className={`text-2xl uppercase ${
            responseSelected === option && iddleResponse && 'animate-pulse'
          }`}
          onClick={(e) => setResponseSelected(e.currentTarget.id)}
          flavor={
            responseSelected === option && !revealResponses
              ? 'selected'
              : revealResponses
              ? option === correctOption
                ? 'correct'
                : 'wrong'
              : 'unselected'
          }
        >
          {option}
        </Button>
      ))}
    </div>
  )
}
