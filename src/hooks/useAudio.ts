/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Howl } from 'howler'
import { useState } from 'react'

const defaultHowlConfig = {
  autoplay: false,
  loop: false,
  volume: 1,
  preload: false,
}

const useAudio = (soundName: string) => {
  const [sound] = useState(
    new Howl({
      src: [`/assets/sounds/${soundName}.mp3`],
      ...defaultHowlConfig,
    })
  )

  const play = () => {
    sound.load()
    sound.play()
  }

  return [play]
}

export default useAudio
