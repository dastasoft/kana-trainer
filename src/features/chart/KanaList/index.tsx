import { useState } from 'react'

import chart from '@/public/locales/en/chart.json'
import common from '@/public/locales/en/common.json'
import type { KanaData, KanaType } from '@/types/shared'

import RomajiToggler from '../RomajiToggler'
import IndexLetter from './IndexLetter'
import styles from './KanaList.module.css'
import KanaToGridItem from './KanaToGridItem'

export default function KanaList({
  kanaData,
  alphabet,
}: {
  kanaData: KanaData
  alphabet: KanaType
}) {
  const [displayRomaji, setDisplayRomaji] = useState(true)

  return (
    <div className="flex flex-col xl:grid xl:grid-cols-2 xl:gap-8">
      <div className="rounded-xl border border-primary p-5 xl:col-span-2">
        <div className="flex items-center justify-between">
          <h2 className="mb-2 text-3xl">{common.kanaTypes.basic}</h2>
          <RomajiToggler
            displayRomaji={displayRomaji}
            setDisplayRomaji={setDisplayRomaji}
          />
        </div>
        <p className="mb-8">{chart.basicSounds}</p>
        <p className="mb-3 text-sm">{chart.displayStrokeOrder}</p>
        <div className="mx-auto grid max-w-screen-lg grid-cols-6 items-center gap-2 md:gap-6">
          {['', 'a', 'i', 'u', 'e', 'o'].map((letter) => (
            <IndexLetter key={letter} letter={letter} />
          ))}
          <KanaToGridItem
            alphabet={alphabet}
            displayRomaji={displayRomaji}
            collection={kanaData.basic}
          />
        </div>
      </div>
      <div className="mt-10 rounded-xl border border-primary p-5 xl:mt-0">
        <div className="flex items-center justify-between">
          <h2 className="mb-2 text-3xl">{common.kanaTypes.intermediate}</h2>
          <RomajiToggler
            displayRomaji={displayRomaji}
            setDisplayRomaji={setDisplayRomaji}
          />
        </div>
        <p className="mt-3 mb-8">{chart.additionalSounds}</p>
        <div className="mx-auto grid max-w-screen-lg grid-cols-6 items-center gap-2 md:gap-6">
          {['', 'a', 'i', 'u', 'e', 'o'].map((letter) => (
            <IndexLetter key={letter} letter={letter} />
          ))}
          <KanaToGridItem
            alphabet={alphabet}
            displayRomaji={displayRomaji}
            collection={kanaData.intermediate}
            disableAnimations
          />
        </div>
      </div>
      <div className="mt-10 rounded-xl border border-primary p-5 xl:mt-0">
        <div className="flex items-center justify-between">
          <h2 className="mb-2 text-3xl">{common.kanaTypes.advanced}</h2>
          <RomajiToggler
            displayRomaji={displayRomaji}
            setDisplayRomaji={setDisplayRomaji}
          />
        </div>
        <p className="mt-3 mb-8">{chart.compound}</p>
        <div className={styles.chart}>
          {['', 'a', 'u', 'o'].map((letter) => (
            <IndexLetter key={letter} letter={letter} />
          ))}
          <KanaToGridItem
            alphabet={alphabet}
            displayRomaji={displayRomaji}
            collection={kanaData.advanced}
            disableAnimations
          />
        </div>
      </div>
    </div>
  )
}
