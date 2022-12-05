import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import {
  Box,
  Flex,
  HStack,
  IconButton,
  useDisclosure,
  useColorModeValue,
  Stack,
  Heading,
} from '@chakra-ui/react'

import NavLink from './NavLink'

const Links = [
  { name: 'Home', href: '/' },
  { name: 'Charts', href: '/charts' },
  { name: 'Training', href: '/training' },
  { name: 'Resources', href: '/resources' },
]

export default function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box bg={useColorModeValue('red.500', 'red.900')} px={4} color="white">
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <HStack spacing={8} alignItems={'center'}>
          <Heading as="h1" fontWeight="extrabold">
            KanaTrainer
          </Heading>
          <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
            {Links.map(({ name, href }) => (
              <NavLink key={name} href={href}>
                {name}
              </NavLink>
            ))}
          </HStack>
        </HStack>
        <IconButton
          size={'md'}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={'Open Menu'}
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
          backgroundColor="red.500"
        />
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: 'none' }}>
          <Stack as={'nav'} spacing={4}>
            {Links.map(({ name, href }) => (
              <NavLink key={name} href={href}>
                {name}
              </NavLink>
            ))}
          </Stack>
        </Box>
      ) : null}
    </Box>
  )
}
