import { Box, Grid, Heading } from '@chakra-ui/react'

import { KanaData } from '../../shared/types'
import IndexLetter from './IndexLetter'
import KanaToGridItem from './KanaToGridItem'

export default function KanaList({
  kanaData,
  displayRomaji,
  alphabet,
}: {
  kanaData: KanaData
  displayRomaji: boolean
  alphabet: 'hiragana' | 'katakana'
}) {
  return (
    <Box>
      <Heading>Seion</Heading>
      <Grid
        templateColumns="20px repeat(5, 1fr)"
        mt={6}
        gap={2}
        alignItems="center"
      >
        {['', 'a', 'i', 'u', 'e', 'o'].map((letter) => (
          <IndexLetter key={letter} letter={letter} />
        ))}
        <KanaToGridItem
          alphabet={alphabet}
          displayRomaji={displayRomaji}
          collection={kanaData.basic}
        />
      </Grid>
      <Heading>Dakuon - Handakuon</Heading>
      <Grid
        templateColumns="20px repeat(5, 1fr)"
        mt={6}
        gap={2}
        alignItems="center"
      >
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

      <Heading>Youon</Heading>
      <Grid
        templateColumns="20px repeat(3, 1fr)"
        mt={6}
        gap={2}
        alignItems="center"
      >
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
