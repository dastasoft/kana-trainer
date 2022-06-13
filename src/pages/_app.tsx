import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'

import Layout from '@/components/Layout'
import { KanaProvider } from '@/features/shared/kana-context'

import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <KanaProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </KanaProvider>
    </ChakraProvider>
  )
}

export default MyApp
