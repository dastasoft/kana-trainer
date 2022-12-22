import Image from 'next/image'
import type { ChangeEvent, Dispatch, SetStateAction } from 'react'

import common from '@/public/locales/en/common.json'
import type { KanaType } from '@/types/shared'

type AlphabetSwapperProps = {
  currentAlphabet: KanaType
  setCurrentAlphabet: Dispatch<SetStateAction<KanaType>>
}

const AlphabetSwapper = ({
  currentAlphabet,
  setCurrentAlphabet,
}: AlphabetSwapperProps) => {
  return (
    <div className="flex items-center">
      <label className="swap-rotate swap btn-primary btn-circle animate-pulse">
        <input
          type="checkbox"
          checked={currentAlphabet === 'katakana'}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setCurrentAlphabet(event.target.checked ? 'katakana' : 'hiragana')
          }
        />
        <span className="swap-off fill-current">
          <Image
            src={`/assets/images/static/hiragana/あ.svg`}
            height="32"
            width="32"
            alt="あ"
          />
        </span>
        <span className="swap-on fill-current">
          <Image
            src={`/assets/images/static/katakana/ア.svg`}
            height="32"
            width="32"
            alt="ア"
          />
        </span>
      </label>
      <h1 className="ml-3">{common.kanaAlphabets[currentAlphabet]}</h1>
    </div>
  )
}

export default AlphabetSwapper
