import { GridItem, Flex } from '@chakra-ui/react'

export default function IndexLetter({
  key,
  letter,
}: {
  key?: string
  letter: string
}) {
  return (
    <GridItem key={key}>
      <Flex justifyContent="center">{letter}</Flex>
    </GridItem>
  )
}
