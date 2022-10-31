import { GridItem, Flex } from '@chakra-ui/react'

export default function IndexLetter({ letter }: { letter: string }) {
  return (
    <GridItem>
      <Flex justifyContent="center">{letter}</Flex>
    </GridItem>
  )
}
