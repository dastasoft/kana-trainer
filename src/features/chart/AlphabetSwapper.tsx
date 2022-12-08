import Image from 'next/image'
import type { ChangeEvent, Dispatch, SetStateAction } from 'react'

import type { KanaType } from '@/types/shared'

type AlphabetSwapperProps = {
  currentAlphabet: KanaType
  setCurrentAlphabet: Dispatch<SetStateAction<KanaType>>
}

const AlphabetSwapper = ({
  currentAlphabet,
  setCurrentAlphabet,
}: AlphabetSwapperProps) => (
  <div className="flex items-center">
    <label className="swap-rotate swap btn-primary btn-circle">
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
    <h1 className="ml-3">
      {currentAlphabet.replace(/^\w/, (c: string) => c.toUpperCase())}
    </h1>
  </div>
)

export default AlphabetSwapper
