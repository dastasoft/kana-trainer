import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import { NextPage } from 'next'

import HiraganaList from '@/components/HiraganaList'
// @ts-ignore
import hiraganaData from '@/public/hiragana'

const Charts: NextPage = () => {
  return (
    <Tabs>
      <TabList>
        <Tab>Hiragana</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <HiraganaList hiraganaList={hiraganaData} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}

export default Charts
