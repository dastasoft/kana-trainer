import _shuffle from 'lodash/shuffle'
import { useMemo, useState } from 'react'

import Button from '@/components/Button'

const Response = ({
  response,
  isCorrect,
}: {
  response: string
  isCorrect: boolean
}) => {
  return (
    <p className={isCorrect ? 'bg-green-500' : 'bg-orange-500'}>{response}</p>
  )
}

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
    <div className="grid w-full grid-cols-2 gap-3">
      {allOptions.map((option: string) => (
        <Button as="div" key={option}>
          {revealResponses ? (
            <Response response={option} isCorrect={option === correctOption} />
          ) : (
            <div
              onClick={() => responseHandler(option === correctOption)}
              className="uppercase"
            >
              {option}
            </div>
          )}
        </Button>
      ))}
    </div>
  )
}
