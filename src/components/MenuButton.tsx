import React, { useContext } from 'react';
import { useTranslation } from '../i18n/i18n';

import { strs } from '../i18n/i18n';
import HamBurgerIcon from './icons/HamBurgerIcon';
import IconButtonWithTooltip from './IconButtonWithTooltip';
import { drawlerIdContext } from './LeftDrawer';

function MenuButton() {
  const { t } = useTranslation();
  const drawlerId = useContext(drawlerIdContext);

  return (
    <IconButtonWithTooltip 
      onClick={() => {
        (document.getElementById(drawlerId) as HTMLInputElement).checked = true;
      }}
      icon={<HamBurgerIcon />}
      className="tooltip-bottom drawer-button"
      aria-label={t(strs.메뉴)}
    />
  );
}

export default MenuButton;
