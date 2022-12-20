/* eslint-disable prefer-spread */
import type { ReactNode } from 'react'
import React from 'react'

import KanaCard from '@/features/chart/KanaCard'
import type { Kana, KanaType } from '@/types/shared'

import IndexLetter from './IndexLetter'

type Filler = {
  [romaji: string]: (children: ReactNode, key: string) => JSX.Element
}

const EmptyCard = () => <div />

const fillers: Filler = {
  yu: (children: ReactNode, key: string) => (
    <React.Fragment key={key}>
      <EmptyCard />
      {children}
      <EmptyCard />
    </React.Fragment>
  ),
  wo: (children: ReactNode, key: string) => (
    <React.Fragment key={key}>
      {Array.apply(null, Array(3)).map((_value, index) => (
        <EmptyCard key={`empty-${index}`} />
      ))}
      {children}
    </React.Fragment>
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
            kana={kana}
            romaji={romaji}
            displayRomaji={displayRomaji}
            alphabet={alphabet}
            disableAnimations={disableAnimations ?? false}
          />
        )

        if (fillers[romaji]) return fillers[romaji]!(<Item />, kana)
        if (romaji.includes('a') || romaji === 'n')
          return (
            <React.Fragment key={kana}>
              <IndexLetter letter={romaji.charAt(0)} />
              <Item />
            </React.Fragment>
          )

        return <Item key={kana} />
      })}
    </>
  )
}
