import React, { useContext } from 'react';
import { useTranslation } from '../i18n/i18n';

import { strs } from '../i18n/i18n';
import HamBurgerIcon from './icons/HamBurgerIcon';
import IconButtonWithTooltip from './IconButtonWithTooltip';
import { drawlerContext } from './LeftDrawer';

function MenuButton() {
	const { t } = useTranslation();
	const { handleOpen } = useContext(drawlerContext);

	return (
		<IconButtonWithTooltip
			onClick={() => {
				handleOpen();
			}}
			icon={<HamBurgerIcon />}
			direction="bottom"
			className="drawer-button"
			size="sm"
			aria-label={t(strs.메뉴)}
		/>
	);
}

export default MenuButton;
