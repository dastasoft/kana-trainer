import type { NextPage } from 'next'

import Training from '@/features/training'
import { Meta } from '@/layouts/Meta'
import { RootLayout } from '@/layouts/RootLayout'
import { AppConfig } from '@/utils/AppConfig'

const TrainingPage: NextPage = () => {
  return (
    <RootLayout
      meta={
        <Meta
          title="Charts | Kana Trainer"
          description={AppConfig.description}
        />
      }
    >
      <Training />
    </RootLayout>
  )
}

export default TrainingPage
