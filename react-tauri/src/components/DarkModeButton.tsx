import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Button } from '@chakra-ui/react';
import React from 'react';

import { strs, useTranslation } from '../i18n/i18n';
import useDarkMode from '../theme/useDarkMode';

export const RawDarkModeButton = () => {
  const { t } = useTranslation();
  const { isDark, toggleDark } = useDarkMode();

  return (
    <Button onClick={() => toggleDark()} marginLeft="2" variant="ghost">
      {isDark ? <MoonIcon /> : <SunIcon />}
      {t(isDark ? strs.다크 : strs.밝게)}
    </Button>
  );
};

export default RawDarkModeButton;
