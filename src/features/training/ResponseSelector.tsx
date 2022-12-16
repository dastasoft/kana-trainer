/* eslint-disable no-nested-ternary */
import _shuffle from 'lodash/shuffle'
import { useMemo, useState } from 'react'

import Button from '@/components/Button'

const NEXT_QUESTION_TIME = 1000

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
  const allOptions = useMemo(
    () => _shuffle([correctOption, ...options]),
    [correctOption, options]
  )

  const responseHandler = (isCorrect: boolean) => {
    setRevealResponses(true)
    if (handleResponse) {
      setTimeout(() => {
        setRevealResponses(false)
        handleResponse(isCorrect)
      }, NEXT_QUESTION_TIME)
    }
  }

  return (
    <div className="grid w-full grid-cols-2 gap-5">
      {allOptions.map((option: string) => (
        <Button
          key={option}
          as="div"
          className="uppercase"
          onClick={() => responseHandler(option === correctOption)}
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
