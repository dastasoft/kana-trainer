/* eslint-disable no-nested-ternary */
import _shuffle from 'lodash/shuffle'
import { useEffect, useMemo, useState } from 'react'

import Button from '@/components/Button'

const NEXT_QUESTION_TIME = 1500
const REVEAL_RESPONSE_TIME = 1000

type ResponseSelectorProps = {
  correctOption: string
  options: string[]
  handleResponse: (isCorrect: boolean) => void
}

export default function ResponseSelector({
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
            handleResponse(responseSelected === correctOption)
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
          disabled={iddleResponse}
          as="div"
          id={option}
          className={`text-2xl uppercase ${
            responseSelected === option && iddleResponse && 'animate-pulse'
          }`}
          onClick={(e) => setResponseSelected(e.currentTarget.id)}
          flavor={
            revealResponses
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
