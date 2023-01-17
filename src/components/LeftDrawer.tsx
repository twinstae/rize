import React, { createContext, useId, useRef } from 'react';
import { useTranslation } from '../i18n/i18n';
import { strs } from '../i18n/i18n';
import MemberList from './MemberList';
import paths from '../router/paths';
import useNavigation from '../router/useNavigation';
import XMarkIcon from './icons/XMarkIcon';
import { HStack } from './rize-ui';
import IconButtonWithTooltip from './IconButtonWithTooltip';
import invariant from '../invariant';

export const drawlerIdContext = createContext('my-drawer');

function LeftDrawler({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation();
  const { Link } = useNavigation();
  const checkboxRef = useRef<HTMLInputElement>(null);
  const id = useId();
  return (
    <div className="drawer bg-base-100 ">
      <input ref={checkboxRef} id={id} type="checkbox" className="drawer-toggle"/>
      <div className="drawer-content overflow-x-hidden">
        <drawlerIdContext.Provider value={id}>
          {children}
        </drawlerIdContext.Provider>
      </div>
      <div className="drawer-side">
        <label
          htmlFor={id}
          className="drawer-overlay bg-secondary"
        ></label>
        <div className="menu bg-base-100 pl-4 pr-1 w-2/3 relative">
          <HStack className="w-full justify-between">
            <h2 className="p-2 text-xl">{t(strs.메뉴)}</h2>
            <IconButtonWithTooltip 
              onClick={() => {
                invariant(checkboxRef.current);
                checkboxRef.current.checked = false;
              }}
              icon={<XMarkIcon />}
              className="tooltip-bottom drawer-button right-0 top-0 p-0 focus:border-2 focus:border-primary"
              aria-label={t(strs.닫기)}
            />
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
