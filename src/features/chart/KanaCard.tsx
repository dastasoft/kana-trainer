import { useState } from 'react'

import { Box, Flex, IconButton, Text } from '@chakra-ui/react'
import Image from 'next/image'
import { AiFillSound } from 'react-icons/ai'

import useAudio from '@/hooks/useAudio'

import Kana from '../shared/Kana'
import { KanaType } from '../shared/types'

type KanaCardProps = {
  kana: string
  romaji: string
  displayRomaji: boolean
  alphabet: KanaType
  disableAnimations: boolean
}

const KanaCard = ({
  kana,
  romaji,
  displayRomaji,
  alphabet,
  disableAnimations,
}: KanaCardProps) => {
  const [strokeOrderVisible, setStrokeOrderVisible] = useState(false)
  const [play] = useAudio(romaji)

  const toggleHandler = () => {
    if (disableAnimations) return
    setStrokeOrderVisible((prevState: boolean) => !prevState)
  }

  return (
    <Flex flexDirection="column" alignItems="center">
      <Flex
        key={romaji}
        alignItems="center"
        justifyContent="space-around"
        px={2}
        py={1}
      >
        <Box onClick={toggleHandler} cursor="pointer" mr={2}>
          {strokeOrderVisible ? (
            <Box>
              <Image
                src={`/images/animated/${alphabet}/${kana}.gif`}
                height="100%"
                width="100%"
                alt={kana}
              />
            </Box>
          ) : (
            <Box>
              <Kana kana={kana} alphabet={alphabet} />
            </Box>
          )}
        </Box>

        <IconButton
          size="xs"
          aria-label="play sound"
          onClick={play}
          icon={<AiFillSound />}
          backgroundColor="red.200"
        />
      </Flex>
      {displayRomaji && (
        <Flex
          borderTop="1px solid"
          borderColor="red.400"
          bgColor="red.100"
          w="100%"
          alignItems="center"
          justifyContent="center"
        >
          <Text textTransform="uppercase" fontWeight="bold">
            {romaji}
          </Text>
        </Flex>
      )}
    </Flex>
  )
}

export default KanaCard
