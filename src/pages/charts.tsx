import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'

// @ts-ignore
import hiraganaData from '@/public/hiragana'

import HiraganaList from './HiraganaList'

export default function Charts() {
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
