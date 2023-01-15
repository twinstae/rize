import React from 'react';
import { useTranslation } from '../i18n/i18n';

import AppBar from '../components/AppBar';
import MailList from '../components/MailList';
import { RizeTabs } from '../components/RizeTabs';
import { strs } from '../i18n/i18n';
import { modes } from '../mailList/mailListModel';
import { useMailList } from '../hooks/Dependencies';
import LeftDrawler from '../components/LeftDrawer';
import isInArray from '../isInArray';
import invariant from '../invariant';

function MailListPage() {
  const { t } = useTranslation();
  const tabs = [strs.전체, strs.읽지_않음, strs.중요];
  const [, setCurrentMode] = useMailList().useCurrentMode();
  return (
    <LeftDrawler>
      <AppBar />
      <RizeTabs<string>
        data={modes}
        value={(mode) => mode}
        Label={({index}) => {
          const result = useMailList().mailList()[modes[index]];
          
          return <span className="text-md">{t(tabs[index])} {result.length}</span>;
        }}
        Content={({ index }) => <MailList index={index} />}
        onChange={({value}) => {
          invariant(isInArray(value, modes));
          setCurrentMode(value);
        }}
      />
    </LeftDrawler>
  );
}

export default MailListPage;
