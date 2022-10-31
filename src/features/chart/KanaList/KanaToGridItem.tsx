import { ReactNode } from 'react'

import { GridItem } from '@chakra-ui/react'
import _map from 'lodash/map'
import Image from 'next/image'

import KanaCard from '@/features/chart/KanaCard'
import Logo from '@/public/images/logo.webp'

import { Kana } from '../../shared/types'
import IndexLetter from './IndexLetter'

type Filler = {
  [romaji: string]: (children: ReactNode) => JSX.Element
}

const EmptyCard = () => (
  <GridItem
    border="2px solid"
    borderColor="red.400"
    borderTopRadius={5}
    borderBottomRadius={5}
    display="flex"
    justifyContent="center"
  >
    <Image src={Logo} height="100%" width="100%" alt="KanaTrainer" />
  </GridItem>
)

const fillers: Filler = {
  yu: (children: ReactNode) => (
    <>
      <EmptyCard />
      {children}
      <EmptyCard />
    </>
  ),
  wo: (children: ReactNode) => (
    <>
      {_map(Array(3), (_value, index) => (
        <EmptyCard key={`empty-${index}`} />
      ))}
      {children}
    </>
  ),
}

export default function KanaToGridItem({
  collection,
  displayRomaji,
  alphabet,
  disableAnimations,
}: {
  collection: Kana[]
  displayRomaji: boolean
  alphabet: 'hiragana' | 'katakana'
  disableAnimations?: boolean
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
              disableAnimations={disableAnimations ?? false}
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
