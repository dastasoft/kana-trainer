import { useEffect, useMemo } from 'react'

import Button from '@/components/Button'
import useConfetti from '@/hooks/useConfetti'
import training from '@/public/locales/en/training.json'

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
        {training.results.title
          .replace('{{correctResponses}}', String(correctResponses))
          .replace('{{numberOfQuestions}}', String(responses.length))}
      </h2>
      <p className="mb-4 text-center">
        {training.results[`subtitle${percentage > 50 ? 'Above50' : 'Below50'}`]}
      </p>
      <Button onClick={startAgain}>
        {training.results.returnToSelectTraining}
      </Button>
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
                  <p>
                    {training.results.yourAnswer} {response}
                  </p>
                  {!wasCorrect && (
                    <p>
                      {training.results.correctResponse} {correctResponse}
                    </p>
                  )}
                </div>
              </div>
            )
          }
        )}
      </div>
    </div>
  )
}
