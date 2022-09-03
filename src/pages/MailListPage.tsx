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
// import useDarkMode from '../theme/useDarkMode';

function ToConfigButton({ onClose }: { onClose: () => void }) {
  const { Link } = useNavigation();
  const { t } = useTranslation();

  return (
    <Link to={paths.CONFIG}>
      <button className="mt-4 btn btn-secondary btn-sm" onClick={onClose}>
        {t(strs.설정)}
      </button>
    </Link>
  );
}

function MailListPage() {
  const { t } = useTranslation();
  const tabs = [strs.전체, strs.읽지_않음, strs.중요];
  console.log('MailListPage');
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
      {createPortal(
        <ToConfigButton
          onClose={() => {
            const checkbox = document.getElementById(
              'my-drawer'
            ) as HTMLInputElement;
            checkbox.checked = false;
          }}
        />,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        document.getElementById('to-config')!
      )}
    </div>
  );
}

export default MailListPage;
