import CTA from '@/components/Home/CTA'
import Features from '@/components/Home/Features'
import { Meta } from '@/layouts/Meta'
import { RootLayout } from '@/layouts/RootLayout'
import { AppConfig } from '@/utils/AppConfig'

export default function Home() {
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
