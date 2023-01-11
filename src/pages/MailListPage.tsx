import React from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';

import AppBar from '../components/AppBar';
import MailList from '../components/MailList';
import { RizeTabs } from '../components/RizeTabs';
import { strs } from '../i18n/i18n';
import { modes } from '../mailList/mailListModel';
import { useResults } from '../mailList/useResult';
import paths from '../router/paths';
import useNavigation from '../router/useNavigation';
import { useMailList } from '../hooks/Dependencies';
// import useDarkMode from '../theme/useDarkMode';

function MailListPage() {
  useMailList().waitForAll();
  const { Link } = useNavigation();
  const { t } = useTranslation();
  const tabs = [strs.전체, strs.읽지_않음, strs.중요];
  console.log('MailListPage');
  const portalTarget = document.getElementById('to-config');
  return (
    <div>
      <AppBar />
      <RizeTabs<string>
        data={modes}
        value={(mode) => mode}
        label={(_mode, index) => {
          const results = useResults();
          return `${t(tabs[index])} ${results[index].length}`;
        }}
        Content={({ index }) => <MailList index={index} /> || null}
      />
      {portalTarget && createPortal(
        <Link to={paths.CONFIG} className="mt-4 btn btn-secondary btn-sm">
          {t(strs.설정)}
        </Link>,
        portalTarget
      )}
    </div>
  );
}

export default MailListPage;
