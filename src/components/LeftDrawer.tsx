import React from 'react';
import { CloseIcon } from '@chakra-ui/icons';
import { useTranslation } from 'react-i18next';
import { strs } from '../i18n/i18n';
import MemberList from './MemberList';
import paths from '../router/paths';
import useNavigation from '../router/useNavigation';

function LeftDrawler({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation();
  const { Link } = useNavigation();
  return (
    <div className="drawer bg-base-100 ">
      <input id="my-drawer" type="checkbox" className="drawer-toggle"/>
      <div className="drawer-content">{children}</div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer"
          className="drawer-overlay bg-secondary"
        ></label>
        <div className="menu bg-base-100 px-4 w-2/3 relative">
          <h2 className="text-xl">{t(strs.메뉴)}</h2>{' '}
          <label
            htmlFor="my-drawer"
            className="btn btn-ghost btn-md btn-circle absolute right-0 top-0 drawer-button p-0 focus:border-2"
          >
            <CloseIcon aria-label={t(strs.닫기) ?? ''} />
          </label>
          <MemberList />
          <div id="to-config">
            <Link to={paths.CONFIG} className="mt-4 btn btn-primary btn-sm">
              {t(strs.설정)}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftDrawler;
