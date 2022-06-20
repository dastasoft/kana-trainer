import { ReactNode } from 'react'

import { Box, Grid, GridItem } from '@chakra-ui/react'
import _map from 'lodash/map'

import KanaCard from '@/features/chart/KanaCard'

import { KanaData } from '../../shared/types'
import IndexLetter from './IndexLetter'

type Filler = {
  [romaji: string]: (children: ReactNode) => JSX.Element
}

const gridYIndexes = {
  a: (children: ReactNode) => (
    <>
      <GridItem />
      {children}
    </>
  ),
  ka: (children: ReactNode) => (
    <>
      <IndexLetter letter="k" />
      {children}
    </>
  ),
  sa: (children: ReactNode) => (
    <>
      <IndexLetter letter="s" />
      {children}
    </>
  ),
  ta: (children: ReactNode) => (
    <>
      <IndexLetter letter="t" />
      {children}
    </>
  ),
  na: (children: ReactNode) => (
    <>
      <IndexLetter letter="n" />
      {children}
    </>
  ),
  ha: (children: ReactNode) => (
    <>
      <IndexLetter letter="h" />
      {children}
    </>
  ),
  ma: (children: ReactNode) => (
    <>
      <IndexLetter letter="m" />
      {children}
    </>
  ),
  ya: (children: ReactNode) => (
    <>
      <IndexLetter letter="y" />
      {children}
    </>
  ),
  ra: (children: ReactNode) => (
    <>
      <IndexLetter letter="r" />
      {children}
    </>
  ),
  wa: (children: ReactNode) => (
    <>
      <IndexLetter letter="w" />
      {children}
    </>
  ),
  n: (children: ReactNode) => (
    <>
      <IndexLetter letter="n" />
      {children}
    </>
  ),
}

const fillers = {
  yu: (children: ReactNode) => (
    <>
      <GridItem
        key="empty-1"
        border="2px solid"
        borderColor="red.400"
        borderTopRadius={5}
        borderBottomRadius={5}
      />
      {children}
      <GridItem
        key="empty-2"
        border="2px solid"
        borderColor="red.400"
        borderTopRadius={5}
        borderBottomRadius={5}
      />
    </>
  ),
  wo: (children: ReactNode) => (
    <>
      {_map(Array(3), (_value, index) => (
        <GridItem
          key={`empty-${index}`}
          border="2px solid"
          borderColor="red.400"
          borderTopRadius={5}
          borderBottomRadius={5}
        />
      ))}
      {children}
    </>
  ),
}

const extraItems: Filler = { ...gridYIndexes, ...fillers }

export default function HiraganaList({
  kanaData,
  displayRomaji,
}: {
  kanaData: KanaData
  displayRomaji: boolean
}) {
  const basicKana = kanaData.basic.map(({ kana, romaji }) => {
    const Item = () => (
      <>
        <GridItem
          key={romaji}
          border="2px solid"
          borderColor="red.400"
          borderTopRadius={5}
          borderBottomRadius={5}
        >
          <KanaCard kana={kana} romaji={romaji} displayRomaji={displayRomaji} />
        </GridItem>
      </>
    )

    return extraItems[romaji] ? extraItems[romaji]!(<Item />) : <Item />
  })

  return (
    <Box>
      <Grid
        templateColumns="20px repeat(5, 1fr)"
        mt={6}
        gap={2}
        alignItems="center"
      >
        {['', 'a', 'i', 'u', 'e', 'o'].map((letter) => (
          <IndexLetter key={letter} letter={letter} />
        ))}
        {basicKana}
      </Grid>
    </Box>
  )
}
