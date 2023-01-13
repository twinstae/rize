import React from 'react';
import { useTranslation } from '../i18n/i18n';
import { strs } from '../i18n/i18n';
import MemberList from './MemberList';
import paths from '../router/paths';
import useNavigation from '../router/useNavigation';
import XMarkIcon from './icons/XMarkIcon';
import { HStack } from './rize-ui';

function LeftDrawler({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation();
  const { Link } = useNavigation();

  return (
    <div className="drawer bg-base-100 ">
      <input id="my-drawer" type="checkbox" className="drawer-toggle"/>
      <div className="drawer-content overflow-x-hidden">{children}</div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer"
          className="drawer-overlay bg-secondary"
        ></label>
        <div className="menu bg-base-100 pl-4 pr-1 w-2/3 relative">
          <HStack className="w-full justify-between">
            <h2 className="p-2 text-xl">{t(strs.메뉴)}</h2>{' '}
            <label
              htmlFor="my-drawer"
              className="btn btn-ghost btn-md btn-circle right-0 top-0 drawer-button p-0 focus:border-2 focus:border-primary"
            >
              <XMarkIcon aria-label={t(strs.닫기) ?? ''} />
            </label>
          </HStack>
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
