import type { Dispatch, SetStateAction } from 'react'
import { useContext } from 'react'

import Button from '@/components/Button'
import { KanaContext } from '@/context/KanaContext'
import AlphabetSwapper from '@/features/shared/AlphabetSwapper'
import type { Kana, KanaType } from '@/types/shared'

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
    <>
      <h1 className="text-5xl">Select what you want to train</h1>
      <AlphabetSwapper
        currentAlphabet={trainingPath}
        setCurrentAlphabet={setTrainingPath}
      />
      <div className="flex">
        <Button
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
      </div>
      <div className="flex items-center">
        <Button onClick={() => setSelectedKanas(kanaData[trainingPath].basic)}>
          All Basic
        </Button>
        <Button
          onClick={() => setSelectedKanas(kanaData[trainingPath].intermediate)}
        >
          All Voiced
        </Button>
        <Button
          onClick={() => setSelectedKanas(kanaData[trainingPath].advanced)}
        >
          All Y-vowel
        </Button>
      </div>
      <div className="flex justify-center">
        <Button onClick={nextScreen}>Select Mode</Button>
      </div>
    </>
  )
}
