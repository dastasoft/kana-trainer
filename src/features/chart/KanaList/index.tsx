import { Box, Grid, Heading, Text } from '@chakra-ui/react'

import { KanaData, KanaType } from '../../shared/types'
import IndexLetter from './IndexLetter'
import KanaToGridItem from './KanaToGridItem'

export default function KanaList({
  kanaData,
  displayRomaji,
  alphabet,
}: {
  kanaData: KanaData
  displayRomaji: boolean
  alphabet: KanaType
}) {
  return (
    <Box>
      <Heading>Basic</Heading>
      <Text py="2">
        *Click on each Kana to display the stroke order animation.
      </Text>
      <Grid templateColumns="20px repeat(5, 1fr)" gap={2} alignItems="center">
        {['', 'a', 'i', 'u', 'e', 'o'].map((letter) => (
          <IndexLetter key={letter} letter={letter} />
        ))}
        <KanaToGridItem
          alphabet={alphabet}
          displayRomaji={displayRomaji}
          collection={kanaData.basic}
        />
      </Grid>
      <Heading mt="10">Voiced</Heading>
      <Grid templateColumns="20px repeat(5, 1fr)" gap={2} alignItems="center">
        {['', 'a', 'i', 'u', 'e', 'o'].map((letter) => (
          <IndexLetter key={letter} letter={letter} />
        ))}
        <KanaToGridItem
          alphabet={alphabet}
          displayRomaji={displayRomaji}
          collection={kanaData.intermediate}
          disableAnimations
        />
      </Grid>

      <Heading mt="10">Y-vowel</Heading>
      <Grid templateColumns="20px repeat(3, 1fr)" gap={2} alignItems="center">
        {['', 'a', 'u', 'o'].map((letter) => (
          <IndexLetter key={letter} letter={letter} />
        ))}
        <KanaToGridItem
          alphabet={alphabet}
          displayRomaji={displayRomaji}
          collection={kanaData.advanced}
          disableAnimations
        />
      </Grid>
    </Box>
  )
}
