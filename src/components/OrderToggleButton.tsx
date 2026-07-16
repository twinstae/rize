import React from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import useOrder from '../config/useOrder';
import { strs, useTranslation } from '../i18n/i18n';
import IconButtonWithTooltip from './IconButtonWithTooltip';
import { FabButton } from './Fab';
import ArrowDownIcon from './icons/ArrowDownIcon';
import ArrowUpIcon from './icons/ArrowUpIcon';

function OrderToggleButton({
	fab = false,
	direction = 'left',
}: {
	fab?: boolean;
	direction?: 'left' | 'top' | 'bottom';
}) {
	const { isReverse, toggle } = useOrder();
	const { t } = useTranslation();

	useHotkeys('o', () => {
		toggle();
	});
	const ariaLabel = isReverse ? t(strs.오랜순) : t(strs.최신순);
	const icon = isReverse ? <ArrowUpIcon /> : <ArrowDownIcon />;

	if (fab) {
		return (
			<FabButton
				direction={direction}
				size="base"
				onClick={() => {
					toggle();
				}}
				icon={icon}
				ariaLabel={ariaLabel}
			/>
		);
	}

	return (
		<IconButtonWithTooltip
			variant="primary"
			circle="circle"
			size="base"
			onClick={() => {
				toggle();
			}}
			direction={direction}
			icon={icon}
			ariaLabel={ariaLabel}
		/>
	);
}

export default OrderToggleButton;
