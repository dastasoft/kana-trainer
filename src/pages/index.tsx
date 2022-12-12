import type { NextPage } from 'next'

import CTA from '@/components/Home/CTA'
import Features from '@/components/Home/Features'
import { Meta } from '@/layouts/Meta'
import { RootLayout } from '@/layouts/RootLayout'
import { AppConfig } from '@/utils/AppConfig'

const HomePage: NextPage = () => {
  return (
    <RootLayout
      meta={
        <Meta title="Home | Kana Trainer" description={AppConfig.description} />
      }
    >
      <CTA />
      <Features />
    </RootLayout>
  )
}

export default HomePage
