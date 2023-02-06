import type { ReactNode } from 'react'

import Footer from '@/components/Footer'
import Header from '@/components/Header'

type RootLayoutProps = {
  meta: ReactNode
  children: ReactNode
}

const RootLayout = ({ meta, children }: RootLayoutProps) => (
  <div className="flex h-full min-h-screen flex-col antialiased">
    {meta}
    <Header />
    <main className="mx-auto w-full max-w-7xl flex-1 text-xl">{children}</main>
    <Footer />
  </div>
)

export { RootLayout }
