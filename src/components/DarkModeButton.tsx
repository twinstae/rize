import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import React from 'react';

import { strs, useTranslation } from '../i18n/i18n';
import useDarkMode from '../theme/useDarkMode';
import IconButtonWithTooltip from './IconButtonWithTooltip';

export const RawDarkModeButton = () => {
  const { t } = useTranslation();
  const { isDark, toggleDark } = useDarkMode();

  return (
    <IconButtonWithTooltip
      onClick={() => toggleDark()}
      icon={isDark ? <MoonIcon /> : <SunIcon />}
      className="ml-3 tooltip-bottom"
      aria-label={t(isDark ? strs.다크 : strs.밝게)}
    />
  );
};

export default RawDarkModeButton;
