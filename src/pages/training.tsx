import { useState } from 'react'

import { Box, Button } from '@chakra-ui/react'
import { NextPage } from 'next'

import Question from '@/components/Question'
// @ts-ignore
import hiraganaData from '@/public/hiragana'

enum UIStates {
  SETUP,
  TRAINING,
  END,
}

const Training: NextPage = () => {
  const [remainingKana, setRemainingKana] = useState(hiraganaData.basic)
  const [currentKana, setCurrentKana] = useState(null)
  const [correctResponses, setCorrectResponses] = useState(0)
  const [UIState, setUIState] = useState(UIStates.SETUP)

  const displayNext = () => {
    if (remainingKana.length <= 0) {
      setUIState(UIStates.END)
    } else {
      const randomIndex = Math.floor(Math.random() * remainingKana.length)
      const nextKana = remainingKana[randomIndex]
      setRemainingKana(
        remainingKana.filter(({ romaji }) => romaji !== nextKana.romaji)
      )
      setCurrentKana(nextKana)
    }
  }

  const handleResponse = (isCorrect: boolean) => {
    if (isCorrect) setCorrectResponses((prevValue) => prevValue + 1)
    displayNext()
  }

  const start = () => {
    setUIState(UIStates.TRAINING)
    displayNext()
  }

  const startAgain = () => {
    setRemainingKana(hiraganaData.basic)
    setUIState(UIStates.SETUP)
  }

  if (UIState === UIStates.SETUP) {
    return (
      <Box>
        <Button onClick={start}>Start</Button>
      </Box>
    )
  }

  if (UIState === UIStates.TRAINING) {
    return (
      <Box>
        {currentKana && (
          <Question kana={currentKana} nextAction={handleResponse} />
        )}
      </Box>
    )
  }

  return (
    <Box>
      {correctResponses} of {hiraganaData.basic.length}
      <Button onClick={startAgain}>Start again</Button>
    </Box>
  )
}

export default Training
