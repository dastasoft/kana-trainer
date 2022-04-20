import { useMemo, useState } from 'react'

import { Grid, GridItem, Text } from '@chakra-ui/react'

const Response = ({ response, isCorrect }) => {
  return <Text bgColor={isCorrect ? 'green' : 'tomato'}>{response}</Text>
}

export default function ResponseSelector({
  correctOption = '',
  options = [],
  nextAction,
}) {
  const [revealResponses, setRevealResponses] = useState(false)
  const allOptions = useMemo(
    () => [correctOption, ...options].sort(() => Math.random() - 0.5),
    [correctOption, options]
  )

  const responseHandler = (e) => {
    console.log(e.target)
    setRevealResponses(true)
    if (nextAction) {
      setTimeout(() => {
        setRevealResponses(false)
        nextAction()
      }, 3000)
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
          onClick={responseHandler}
        >
          {revealResponses ? (
            <Response response={option} isCorrect={option === correctOption} />
          ) : (
            option
          )}
        </GridItem>
      ))}
    </Grid>
  )
}
