import { useMemo, useState } from 'react'

import { Box, Grid, GridItem, Text } from '@chakra-ui/react'
import _shuffle from 'lodash/shuffle'

const Response = ({
  response,
  isCorrect,
}: {
  response: string
  isCorrect: boolean
}) => {
  return <Text bgColor={isCorrect ? 'green' : 'tomato'}>{response}</Text>
}

const NEXT_QUESTION_TIME = 1000

type Props = {
  correctOption: string
  options: string[]
  handleResponse: (isCorrect: boolean) => void
}

export default function ResponseSelector({
  correctOption = '',
  options = [],
  handleResponse,
}: Props) {
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
    <Grid templateColumns="repeat(2, 1fr)" gap={3} w="full">
      {allOptions.map((option: string) => (
        <GridItem
          key={option}
          border="2px solid black"
          fontWeight="bold"
          textTransform="uppercase"
          textAlign="center"
        >
          {revealResponses ? (
            <Response response={option} isCorrect={option === correctOption} />
          ) : (
            <Box onClick={() => responseHandler(option === correctOption)}>
              {option}
            </Box>
          )}
        </GridItem>
      ))}
    </Grid>
  )
}
