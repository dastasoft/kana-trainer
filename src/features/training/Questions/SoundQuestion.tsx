import _sampleSize from 'lodash/sampleSize'
import _without from 'lodash/without'
import { useEffect, useMemo } from 'react'

import useAudio from '@/hooks/useAudio'
import type { Kana } from '@/types/shared'

import QuestionPanel from './QuestionPanel'

type Props = {
  kanaList: Kana[]
  currentKana: Kana
  handleResponse: (isCorrect: boolean) => void
}

const SoundQuestion = ({ kanaList, currentKana, handleResponse }: Props) => {
  const [play] = useAudio(currentKana.romaji)
  const options = useMemo(
    () =>
      _sampleSize(_without(kanaList, currentKana), 3).map(({ kana }) => kana),
    [currentKana, kanaList]
  )

  useEffect(() => {
    if (play) play()
  }, [play])

  return (
    <QuestionPanel
      correctOption={currentKana.kana}
      options={options}
      handleResponse={handleResponse}
    >
      <button className="btn-primary btn-circle btn-lg btn p-2" onClick={play}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 384 512"
          className="h-full"
        >
          <path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" />
        </svg>
      </button>
    </QuestionPanel>
  )
}

export default SoundQuestion
