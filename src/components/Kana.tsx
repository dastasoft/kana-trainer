import { useState } from 'react'

import { BellIcon } from '@chakra-ui/icons'
import { Box, Flex, IconButton, Text } from '@chakra-ui/react'
import Image from 'next/image'

import useAudio from '@/hooks/useAudio'

type Props = {
  romaji: string
  displayRomaji: boolean
}

const Kana = ({ romaji, displayRomaji }: Props) => {
  const [strokeOrderVisible, setStrokeOrderVisible] = useState(false)
  const [play] = useAudio(romaji)

  const toggleHandler = () =>
    setStrokeOrderVisible((prevState: boolean) => !prevState)

  return (
    <Flex flexDirection="column" alignItems="center">
      <Text>{displayRomaji && romaji}</Text>
      <Flex key={romaji} alignItems="center" justifyContent="space-around">
        <Box onClick={toggleHandler} cursor="pointer">
          {strokeOrderVisible ? (
            <Box>
              <Image
                src={`/images/animated/${romaji}.gif`}
                height="100%"
                width="100%"
                alt={romaji}
              />
            </Box>
          ) : (
            <Box>
              <Image
                src={`/images/static/${romaji}.svg`}
                height="100%"
                width="100%"
                alt={romaji}
              />
            </Box>
          )}
        </Box>

        <IconButton
          size="xs"
          aria-label="play sound"
          onClick={play}
          icon={<BellIcon />}
        />
      </Flex>
    </Flex>
  )
}

export default Kana
