import React from 'react';

import { strs, useTranslation } from '../i18n/i18n';
import useDarkMode from '../theme/useDarkMode';
import IconButtonWithTooltip from './IconButtonWithTooltip';
import SunIcon from './icons/SunIcon';
import MoonIcon from './icons/MoonIcon';
import { useHotkeys } from 'react-hotkeys-hook';

export const RawDarkModeButton = () => {
	const { t } = useTranslation();
	const { isDark, toggleDark } = useDarkMode();

	const key = 'ctrl+d';
	useHotkeys(key, toggleDark, {}, [toggleDark]);
	return (
		<IconButtonWithTooltip
			onClick={() => toggleDark()}
			icon={isDark ? <MoonIcon /> : <SunIcon />}
			className="ml-3 tooltip-bottom"
			aria-label={`${t(isDark ? strs.다크 : strs.밝게)} (${key})`}
		/>
	);
};

export default RawDarkModeButton;
