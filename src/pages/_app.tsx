import '../styles/global.css'

import localFont from '@next/font/local'
import type { AppProps } from 'next/app'

const myFont = localFont({ src: '../styles/fonts/Coiny-Regular.ttf' })

const MyApp = ({ Component, pageProps }: AppProps) => (
  <div className={myFont.className}>
    <Component {...pageProps} />
  </div>
)

export default MyApp
