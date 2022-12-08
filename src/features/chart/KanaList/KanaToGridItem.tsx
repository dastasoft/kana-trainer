/* eslint-disable prefer-spread */
import type { ReactNode } from 'react'

import KanaCard from '@/features/chart/KanaCard'
import type { Kana, KanaType } from '@/types/shared'

import IndexLetter from './IndexLetter'

type Filler = {
  [romaji: string]: (children: ReactNode) => JSX.Element
}

const EmptyCard = () => <div />

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
      {Array.apply(null, Array(3)).map((_value, index) => (
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
  alphabet: KanaType
  disableAnimations?: boolean
}) {
  return (
    <>
      {collection.map(({ kana, romaji }) => {
        const Item = () => (
          <KanaCard
            key={romaji}
            kana={kana}
            romaji={romaji}
            displayRomaji={displayRomaji}
            alphabet={alphabet}
            disableAnimations={disableAnimations ?? false}
          />
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
