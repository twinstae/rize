import React from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import useOrder from '../config/useOrder';
import { Button } from './rize-ui-web';
import { strs, useTranslation } from '../i18n/i18n';
import IconButtonWithTooltip from './IconButtonWithTooltip';
import ArrowDownIcon from './icons/ArrowDownIcon';
import ArrowUpIcon from './icons/ArrowUpIcon';

function OrderToggleButton() {
	const { isReverse, toggle } = useOrder();
	const { t } = useTranslation();

	useHotkeys('o', () => {
		toggle();
	});
	return (
		<IconButtonWithTooltip
			variant="primary"
			circle="circle"
			onClick={() => {
				toggle();
			}}
			direction="left"
			icon={isReverse ? <ArrowUpIcon /> : <ArrowDownIcon />}
			ariaLabel={isReverse ? t(strs.오랜순) : t(strs.최신순)}
		/>
	);
}

export default OrderToggleButton;
