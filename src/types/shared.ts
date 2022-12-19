export type Kana = {
  kana: string
  romaji: string
}

export type KanaData = {
  basic: Kana[]
  intermediate: Kana[]
  advanced: Kana[]
}

export type KanaType = 'hiragana' | 'katakana'

export type HandleResponse = (
  question: string,
  responseSelected: string,
  correctOption: string
) => void
