/* eslint-disable no-nested-ternary */
import _shuffle from 'lodash/shuffle'
import { useEffect, useMemo, useState } from 'react'

import Button from '@/components/Button'
import type { HandleResponse } from '@/types/shared'

const NEXT_QUESTION_TIME = 1500
const REVEAL_RESPONSE_TIME = 1000

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
          }, NEXT_QUESTION_TIME)
        }
      }, REVEAL_RESPONSE_TIME)
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
