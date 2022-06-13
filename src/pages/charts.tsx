import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import { NextPage } from 'next'

import HiraganaList from '@/features/chart/HiraganaList'

const Charts: NextPage = () => {
  return (
    <Tabs>
      <TabList>
        <Tab>Hiragana</Tab>
        <Tab>Katakana</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <HiraganaList />
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}

export default Charts
