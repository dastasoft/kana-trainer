import { useEffect, useMemo } from 'react'

import { IconButton } from '@chakra-ui/react'
import _sampleSize from 'lodash/sampleSize'
import _without from 'lodash/without'
import { FaSoundcloud } from 'react-icons/fa'

import { Kana } from '@/features/shared/types'
import ResponseSelector from '@/features/training/ResponseSelector'
import useAudio from '@/hooks/useAudio'
// @ts-ignore
import hiraganaData from '@/public/hiragana'

type Props = {
  currentKana: Kana
  handleResponse: (isCorrect: boolean) => void
}

const SoundQuestion = ({ currentKana, handleResponse }: Props) => {
  const [play] = useAudio(currentKana.romaji)
  const options = useMemo(
    () =>
      _sampleSize(_without(hiraganaData.basic, currentKana), 3).map(
        ({ kana }) => kana
      ),
    [currentKana]
  )

  useEffect(() => {
    if (play) play()
  }, [play])

  return (
    <>
      <IconButton
        size="xs"
        aria-label="play sound"
        onClick={play}
        icon={<FaSoundcloud />}
      />
      <ResponseSelector
        correctOption={currentKana.kana}
        options={options}
        handleResponse={handleResponse}
      />
    </>
  )
}

export default SoundQuestion
