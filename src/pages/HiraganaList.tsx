import { ChangeEvent, useState } from 'react'

import { Box, Flex, FormLabel, Grid, GridItem, Switch } from '@chakra-ui/react'

import Kana from '@/components/Kana'

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
      <Grid templateColumns="repeat(5, 1fr)" gap={2} mt={6}>
        {hiraganaList.basic.map(({ romaji }) => (
          <GridItem
            key={romaji}
            bg="tomato"
            px="2"
            py="1"
            border="2px solid blueviolet"
          >
            <Kana romaji={romaji} displayRomaji={displayRomaji} />
          </GridItem>
        ))}
      </Grid>
    </Box>
  )
}
