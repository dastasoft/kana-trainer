import { useMemo } from 'react'

import { Flex } from '@chakra-ui/react'

// @ts-ignore
import hiraganaData from '@/public/hiragana'

import Kana from './Kana'
import ResponseSelector from './ResponseSelector'

const randomKanaPicker = (num: number, excluded: string) => {
  const availableKanas = [...hiraganaData.basic]
  let randomKanas = []

  for (let i = 0; i < num; i += 1) {
    let found = false
    while (!found && availableKanas.length >= num) {
      const randomIndex = Math.floor(Math.random() * availableKanas.length)
      if (availableKanas[randomIndex].romaji !== excluded) {
        randomKanas = [...randomKanas, ...availableKanas.splice(randomIndex, 1)]
        found = true
      }
    }
  }

  return randomKanas
}

export default function Question({ kana, nextAction }) {
  const options = useMemo(
    () => randomKanaPicker(3, kana.romaji).map(({ romaji }) => romaji),
    [kana.romaji]
  )

  return (
    <Flex flexDirection="column" alignItems="center">
      <Kana romaji={kana.romaji} />
      <ResponseSelector
        correctOption={kana.romaji}
        options={options}
        nextAction={nextAction}
      />
    </Flex>
  )
}
