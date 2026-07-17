import React, { useRef } from 'react';
import { useTranslation } from '../i18n/i18n';

import { strs } from '../i18n/i18n';
import HamBurgerIcon from './icons/HamBurgerIcon';
import IconButtonWithTooltip from './IconButtonWithTooltip';
import { openLeftMenu } from './LeftDrawer';
import { useHotkeys } from 'react-hotkeys-hook';

function MenuButton() {
	const { t } = useTranslation();
	const ref = useRef<HTMLButtonElement>(null);

	function openMenu() {
		void openLeftMenu();
	}

	useHotkeys('m', () => {
		ref.current?.focus();
		openMenu();
	});

	return (
		<IconButtonWithTooltip
			ref={ref}
			onClick={openMenu}
			icon={<HamBurgerIcon />}
			direction="bottom"
			className="drawer-button"
			size="sm"
			ariaLabel={t(strs.메뉴) + '(m)'}
		/>
	);
}

export default MenuButton;
