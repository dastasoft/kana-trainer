import { ReactNode } from 'react'

import { Box, Flex } from '@chakra-ui/react'

import Footer from './Footer'
import Header from './Header'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <Flex flexDirection="column" h="full">
      <Header />
      <Box flex="1">{children}</Box>
      <Footer />
    </Flex>
  )
}
