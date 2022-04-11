import { PropsWithChildren, ReactNode } from 'react'

import { Box } from '@chakra-ui/react'

export default function Layout({ children }: PropsWithChildren<ReactNode>) {
  return (
    <Box my="4" mx="6">
      {children}
    </Box>
  )
}
