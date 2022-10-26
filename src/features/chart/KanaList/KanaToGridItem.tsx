import { ReactNode } from 'react'

import { GridItem } from '@chakra-ui/react'
import _map from 'lodash/map'

import KanaCard from '@/features/chart/KanaCard'

import { Kana } from '../../shared/types'
import IndexLetter from './IndexLetter'

type Filler = {
  [romaji: string]: (children: ReactNode) => JSX.Element
}

const fillers: Filler = {
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

export default function KanaToGridItem({
  collection,
  displayRomaji,
  alphabet,
}: {
  collection: Kana[]
  displayRomaji: boolean
  alphabet: 'hiragana' | 'katakana'
}) {
  return (
    <>
      {collection.map(({ kana, romaji }) => {
        const Item = () => (
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
              alphabet={alphabet}
            />
          </GridItem>
        )

        if (fillers[romaji]) return fillers[romaji]!(<Item />)
        if (romaji.includes('a') || romaji === 'n')
          return (
            <>
              <IndexLetter letter={romaji.charAt(0)} />
              <Item />
            </>
          )

        return <Item key={romaji} />
      })}
    </>
  )
}
