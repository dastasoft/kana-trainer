import { useEffect, useMemo } from 'react'

import Button from '@/components/Button'
import useConfetti from '@/hooks/useConfetti'

function calculePercentage(
  totalNumberOfQuestions: number,
  correctAnswers: number
) {
  return (correctAnswers / totalNumberOfQuestions) * 100
}

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
  const [fireConfetti] = useConfetti()
  const correctResponses = useMemo(
    () => responses.filter((response: any) => response.wasCorrect).length,
    [responses]
  )
  const percentage = calculePercentage(correctResponses, responses.length)

  useEffect(() => {
    if (percentage === 100) fireConfetti!()
  }, [])

  return (
    <div className="mx-auto max-w-lg">
      <h2 className="text-center text-3xl">
        Results {correctResponses} of {responses.length}
      </h2>
      <p className="mb-4 text-center">
        {percentage > 50
          ? `You're doing great!`
          : `Try to revisit the Chart section for more practice`}
      </p>
      <Button onClick={startAgain}>Return to Select Training</Button>
      <div className="my-4">
        {responses.map(
          ({ question, response, correctResponse, wasCorrect }) => {
            return (
              <div
                key={question}
                className={
                  'my-4 flex items-center rounded-lg bg-gray-800 p-4 shadow-xl'
                }
              >
                <p
                  className={`w-20 min-w-max rounded-full p-4 text-center text-3xl ${
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
