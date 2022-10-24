import { ChangeEvent, useContext, useState } from 'react'

import {
  Flex,
  FormLabel,
  Switch,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react'
import { NextPage } from 'next'

import KanaList from '@/features/chart/KanaList/'
import { KanaContext } from '@/features/shared/kana-context'

const Charts: NextPage = () => {
  const [displayRomaji, setDisplayRomaji] = useState(false)

  const { hiragana: hiraganaData, katakana: katakanaData } =
    useContext(KanaContext)

  return (
    <Tabs>
      <TabList>
        <Tab>Hiragana</Tab>
        <Tab>Katakana</Tab>
      </TabList>

      <Flex alignItems="center">
        <FormLabel htmlFor="displayRomaji">Display Romaji</FormLabel>
        <Switch
          id="displayRomaji"
          isChecked={displayRomaji}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setDisplayRomaji(Boolean(event.target.checked))
          }
        />
      </Flex>

      <TabPanels>
        <TabPanel>
          <KanaList
            kanaData={hiraganaData}
            displayRomaji={displayRomaji}
            alphabet="hiragana"
          />
        </TabPanel>
        <TabPanel>
          <KanaList
            kanaData={katakanaData}
            displayRomaji={displayRomaji}
            alphabet="katakana"
          />
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}

export default Charts
