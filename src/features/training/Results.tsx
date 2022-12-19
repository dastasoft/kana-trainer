import { useMemo } from 'react'

import Button from '@/components/Button'

export type Response = {
  question: string | undefined
  response: string
  correctResponse: string
  wasCorrect: boolean
}

type ResultsProps = {
  responses: Response[]
  startAgain: () => void
}

export default function Results({ responses, startAgain }: ResultsProps) {
  const correctResponses = useMemo(
    () => responses.filter((response: any) => response.wasCorrect).length,
    [responses]
  )
  return (
    <div className="mx-auto max-w-lg">
      <h2 className="text-center text-3xl">
        Results {correctResponses} of {responses.length}
      </h2>
      <p className="mb-4 text-center">
        {(correctResponses / responses.length) * 100 > 50
          ? `You're doing great!`
          : `Try to revisit the Chart section for more practice`}
      </p>
      <Button onClick={startAgain}>Return to Select Training</Button>
      <div className="my-4">
        {responses.map(
          ({ question, response, correctResponse, wasCorrect }) => {
            return (
              <div
                key={response}
                className={
                  'my-4 flex items-center rounded-lg bg-gray-800 p-4 shadow-xl'
                }
              >
                <p
                  className={`rounded-full p-4 text-center text-3xl ${
                    wasCorrect ? 'bg-green-500' : 'bg-red-500'
                  }`}
                >
                  {question}
                </p>
                <div className="ml-3">
                  <p>Your answer: {response}</p>
                  {!wasCorrect && <p>Correct answer: {correctResponse}</p>}
                </div>
              </div>
            )
          }
        )}
      </div>
    </div>
  )
}
