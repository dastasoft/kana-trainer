import common from '@/public/locales/en/common.json'
import type { KanaData, KanaType } from '@/types/shared'

import IndexLetter from './IndexLetter'
import KanaToGridItem from './KanaToGridItem'

export default function KanaList({
  kanaData,
  displayRomaji,
  alphabet,
}: {
  kanaData: KanaData
  displayRomaji: boolean
  alphabet: KanaType
}) {
  return (
    <div className="my-12 mx-auto max-w-5xl">
      <div>
        <h2 className="mb-2 text-3xl">{common.kanaTypes.basic}</h2>
        <div className="grid grid-cols-6 items-center gap-2 md:gap-4">
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
      <div className="mt-20">
        <h2 className="mb-2 text-3xl">{common.kanaTypes.intermediate}</h2>
        <div className="grid grid-cols-6 items-center gap-2">
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
      <div className="mt-20">
        <h2 className="mb-2 text-3xl">{common.kanaTypes.advanced}</h2>
        <div className="grid grid-cols-4 items-center gap-2">
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
