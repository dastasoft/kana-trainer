import { createContext } from 'react'

const trainingData: {
  nextQuestionTime: number
  revealResponsetime: number
} = {
  nextQuestionTime: 1500,
  revealResponsetime: 1000,
}

const TrainingContext = createContext(trainingData)

type Props = {
  children?: React.ReactNode
}

function TrainingProvider({ children }: Props) {
  return (
    <TrainingContext.Provider value={trainingData}>
      {children}
    </TrainingContext.Provider>
  )
}
export { TrainingContext, TrainingProvider }
