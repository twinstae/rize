import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import AppBar from '../components/AppBar';
import MailList from '../components/MailList';
import { useDependencies } from '../hooks/Dependencies';
import { strs } from '../i18n/i18n';
import { modes } from '../mailList/mailListModel';
import useTag from '../mailList/useTag';
import useSearch from '../search/useSearch';
import useDarkMode from '../theme/useDarkMode';

function MailListPage() {
  const { isDark } = useDarkMode();
  const [tag] = useTag();
  const { mailList } = useDependencies().useMailList();
  const { t } = useTranslation();

  const allMailList = mailList('all', '');
  const { isInResult } = useSearch(allMailList);

  const results = modes
    .map((mode) => mailList(mode, tag))
    .map((data) => data.filter((mail) => isInResult(mail.id)));

  return (
    <div style={{ overflow: 'hidden' }}>
      <AppBar />
      <Tabs isFitted colorScheme={isDark ? 'pink' : 'izone'}>
        <TabList>
          <Tab fontSize="lg">
            {t(strs.전체)} {results[0].length}
          </Tab>
          <Tab fontSize="lg">
            {t(strs.읽지_않음)} {results[1].length}
          </Tab>
          <Tab fontSize="lg">
            {t(strs.중요)} {results[2].length}
          </Tab>
        </TabList>
        <TabPanels>
          {modes.map((mode, i) => (
            <TabPanel style={{ padding: '0.5rem' }} key={mode}>
              <MailList allMailList={allMailList} result={results[i]} />
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </div>
  );
}

export default MailListPage;
