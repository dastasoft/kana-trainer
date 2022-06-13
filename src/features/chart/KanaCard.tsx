import { useState } from 'react'

import { Box, Flex, IconButton, Text } from '@chakra-ui/react'
import Image from 'next/image'
import { FaSoundcloud } from 'react-icons/fa'

import useAudio from '@/hooks/useAudio'

import Kana from '../shared/Kana'

type Props = {
  romaji: string
  displayRomaji: boolean
}

const KanaCard = ({ romaji, displayRomaji }: Props) => {
  const [strokeOrderVisible, setStrokeOrderVisible] = useState(false)
  const [play] = useAudio(romaji)

  const toggleHandler = () =>
    setStrokeOrderVisible((prevState: boolean) => !prevState)

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
                src={`/images/animated/${romaji}.gif`}
                height="100%"
                width="100%"
                alt={romaji}
              />
            </Box>
          ) : (
            <Box>
              <Kana romaji={romaji} />
            </Box>
          )}
        </Box>

        <IconButton
          size="xs"
          aria-label="play sound"
          onClick={play}
          icon={<FaSoundcloud />}
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
