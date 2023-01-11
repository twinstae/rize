import { HamburgerIcon } from '@chakra-ui/icons';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { strs } from '../i18n/i18n';
import { Tooltip } from './Tooltip';

function MenuButton() {
  const { t } = useTranslation();

  return (
    <Tooltip tip={t(strs.메뉴)} className="tooltip-bottom">
      <label
        htmlFor="my-drawer"
        className="btn btn-sm btn-ghost drawer-button"
        aria-label={t(strs.메뉴) ?? ''}
      >
        <HamburgerIcon />
      </label>
    </Tooltip>
  );
}

export default MenuButton;
