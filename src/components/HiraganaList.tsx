import { ChangeEvent, useState } from 'react'

import { Box, Flex, FormLabel, Grid, GridItem, Switch } from '@chakra-ui/react'

import KanaCard from '@/components/KanaCard'

export default function HiraganaList({ hiraganaList = { basic: [] } }) {
  const [displayRomaji, setDisplayRomaji] = useState(false)

  return (
    <Box>
      <Flex alignItems="center">
        <FormLabel htmlFor="displayRomaji">Display Romaji</FormLabel>
        <Switch
          id="displayRomaji"
          isChecked={displayRomaji}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setDisplayRomaji(Boolean(event.target.checked))
          }
        />
      </Flex>
      <Grid templateColumns="repeat(5, 1fr)" mt={6} gap={2}>
        {['a', 'i', 'u', 'e', 'o'].map((letter) => (
          <GridItem key={letter}>
            <Flex justifyContent="center">{letter}</Flex>
          </GridItem>
        ))}
        {hiraganaList.basic.map(({ romaji }) => (
          <GridItem
            key={romaji}
            border="2px solid"
            borderColor="red.400"
            borderTopRadius={5}
            borderBottomRadius={5}
          >
            <KanaCard romaji={romaji} displayRomaji={displayRomaji} />
          </GridItem>
        ))}
      </Grid>
    </Box>
  )
}
