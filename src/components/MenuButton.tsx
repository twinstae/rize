import React, { useContext, useRef } from 'react';
import { useTranslation } from '../i18n/i18n';

import { strs } from '../i18n/i18n';
import HamBurgerIcon from './icons/HamBurgerIcon';
import IconButtonWithTooltip from './IconButtonWithTooltip';
import { drawlerContext } from './LeftDrawer';
import { useHotkeys } from 'react-hotkeys-hook';

function MenuButton() {
	const { t } = useTranslation();
	const { handleOpen } = useContext(drawlerContext);
	const ref = useRef<HTMLButtonElement>(null);

	useHotkeys('m', () => {
		ref.current?.focus();
		handleOpen();
	});
	return (
		<IconButtonWithTooltip
			ref={ref}
			onClick={() => {
				handleOpen();
			}}
			icon={<HamBurgerIcon />}
			direction="bottom"
			className="drawer-button"
			size="sm"
			ariaLabel={t(strs.메뉴)+'(m)'}
		/>
	);
}

export default MenuButton;
