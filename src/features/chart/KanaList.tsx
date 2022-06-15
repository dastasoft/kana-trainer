import { Box, Flex, Grid, GridItem } from '@chakra-ui/react'

import KanaCard from '@/features/chart/KanaCard'

import { KanaData } from '../shared/types'

export default function HiraganaList({
  kanaData,
  displayRomaji,
}: {
  kanaData: KanaData
  displayRomaji: boolean
}) {
  return (
    <Box>
      <Grid templateColumns="repeat(5, 1fr)" mt={6} gap={2}>
        {['a', 'i', 'u', 'e', 'o'].map((letter) => (
          <GridItem key={letter}>
            <Flex justifyContent="center">{letter}</Flex>
          </GridItem>
        ))}
        {kanaData.basic.map(({ kana, romaji }) => (
          <GridItem
            key={romaji}
            border="2px solid"
            borderColor="red.400"
            borderTopRadius={5}
            borderBottomRadius={5}
          >
            <KanaCard
              kana={kana}
              romaji={romaji}
              displayRomaji={displayRomaji}
            />
          </GridItem>
        ))}
      </Grid>
    </Box>
  )
}
