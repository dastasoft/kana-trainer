import type { ReactNode } from 'react'

import Footer from '@/components/Footer'
import Header from '@/components/Header'

type RootLayoutProps = {
  meta: ReactNode
  children: ReactNode
}

const RootLayout = ({ meta, children }: RootLayoutProps) => (
  <div className="flex h-full min-h-screen w-full flex-col antialiased">
    {meta}
    <Header />
    <main className="flex-1 text-xl">{children}</main>
    <Footer />
  </div>
)

export { RootLayout }
