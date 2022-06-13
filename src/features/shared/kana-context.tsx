import { createContext } from 'react'

// @ts-ignore
import hiraganaData from '@/public/hiragana'
// @ts-ignore
import katakanaData from '@/public/katakana'

import { KanaData } from './types'

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
