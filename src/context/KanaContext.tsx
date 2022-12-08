import { createContext } from 'react'

import hiraganaData from '@/public/hiragana.json'
import katakanaData from '@/public/katakana.json'
import type { KanaData } from '@/types/shared'

const kanaData: { hiragana: KanaData; katakana: KanaData } = {
  hiragana: hiraganaData,
  katakana: katakanaData,
}

const KanaContext = createContext(kanaData)

type Props = {
  children?: React.ReactNode
}

function KanaProvider({ children }: Props) {
  return (
    <KanaContext.Provider value={kanaData}>{children}</KanaContext.Provider>
  )
}

export { KanaContext, KanaProvider }
