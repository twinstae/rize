import { Tab, TabList, TabPanel,TabPanels, Tabs } from '@chakra-ui/react';
import React from 'react';
import { withTranslation } from 'react-i18next';

import AppBar from '../components/AppBar';
import MailList from '../components/MailList';
import { modes } from '../constants';
import { useDependencies } from '../hooks/Dependencies';
import { withSuspense } from '../hooks/util';
import { strs, TranslationProps } from '../i18n/i18n';
import useMailList from '../mailList/useMailList';
import useSearch from '../search/useSearch';

function MailListPage({ t }: TranslationProps) {
  const { isDark, tag } = useDependencies();

  const mailData = useMailList();

  const allMailList = mailData.mailList('all', '');
  const { isInResult } = useSearch(allMailList);

  const results = modes
    .map((mode) => mailData.mailList(mode, tag))
    .map((data) => data.filter((mail) => isInResult(mail.id)));

  return (
    <div style={{ overflow: 'hidden' }}>
      <AppBar />
      <Tabs isFitted colorScheme={isDark ? 'pink' : 'izone'}>
        <TabList>
          <Tab>{t(strs.전체)} {results[0].length}</Tab>
          <Tab>{t(strs.읽지_않음)} {results[1].length}</Tab>
          <Tab>{t(strs.중요)} {results[2].length}</Tab>
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

export default withTranslation()(withSuspense(MailListPage));
