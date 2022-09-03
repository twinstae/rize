import React from 'react';
import { CloseIcon } from '@chakra-ui/icons';
import { useTranslation } from 'react-i18next';
import { strs } from '../i18n/i18n';
import MemberList from './MemberList';
import { Tooltip } from './Tooltip';

function LeftDrawler({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation();
  return (
    <div className="drawer bg-base-100 ">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">{children}</div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer"
          className="drawer-overlay bg-secondary"
        ></label>
        <div className="menu bg-base-100 p-4 w-2/3">
          <h2 className="text-xl">{t(strs.메뉴)}</h2>{' '}
          <Tooltip tip={t(strs.메뉴)} className="tooltip-bottom">
            <label
              htmlFor="my-drawer"
              className="btn btn-sm btn-ghost drawer-button"
              aria-label={t(strs.닫기)}
            >
              <CloseIcon />
            </label>
          </Tooltip>
          <MemberList />
          <div id="to-config"></div>
        </div>
      </div>
    </div>
  );
}

export default LeftDrawler;
