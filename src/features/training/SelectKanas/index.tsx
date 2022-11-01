import { Dispatch, SetStateAction, useContext } from 'react'

import { Box, Button, Flex, Radio, RadioGroup, Stack } from '@chakra-ui/react'
import _capitalize from 'lodash/capitalize'
import _find from 'lodash/find'
import _map from 'lodash/map'

import { KanaContext } from '@/features/shared/kana-context'
import { Kana, KanaType } from '@/features/shared/types'

interface ITrainingPaths {
  HIRAGANA: 'hiragana'
  KATAKANA: 'katakana'
}

const TrainingPaths: ITrainingPaths = {
  HIRAGANA: 'hiragana',
  KATAKANA: 'katakana',
} as const

type SelectKanasProps = {
  trainingPath: KanaType
  setTrainingPath: Dispatch<SetStateAction<KanaType>>
  setSelectedKanas: Dispatch<SetStateAction<Kana[]>>
  nextScreen: () => void
}

export default function SelectKanas({
  trainingPath,
  setTrainingPath,
  setSelectedKanas,
  nextScreen,
}: SelectKanasProps) {
  const kanaData = useContext(KanaContext)

  return (
    <Box>
      <RadioGroup
        onChange={(nextValue: KanaType) =>
          setTrainingPath(_find(TrainingPaths, (v) => v === nextValue)!)
        }
        value={trainingPath}
      >
        <Stack direction="row">
          {_map(TrainingPaths, (value) => (
            <Radio key={value} value={value}>
              {_capitalize(value)}
            </Radio>
          ))}
        </Stack>
      </RadioGroup>
      <Flex py="6">
        <Button
          w="full"
          onClick={() =>
            setSelectedKanas([
              ...kanaData[trainingPath].basic,
              ...kanaData[trainingPath].intermediate,
              ...kanaData[trainingPath].advanced,
            ])
          }
        >
          All Kanas
        </Button>
      </Flex>
      <Stack spacing={4} direction="row" align="center" py="6">
        <Button
          onClick={() => setSelectedKanas(kanaData[trainingPath].basic)}
          w="full"
        >
          All Basic
        </Button>
        <Button
          w="full"
          onClick={() => setSelectedKanas(kanaData[trainingPath].intermediate)}
        >
          All Voiced
        </Button>
        <Button
          w="full"
          onClick={() => setSelectedKanas(kanaData[trainingPath].advanced)}
        >
          All Y-vowel
        </Button>
      </Stack>
      <Flex justifyContent="center">
        <Button onClick={nextScreen}>Select Mode</Button>
      </Flex>
    </Box>
  )
}
