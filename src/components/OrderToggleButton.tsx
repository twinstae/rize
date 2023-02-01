import React from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import useOrder from '../config/useOrder';
import { Button } from './rize-ui-web';
import { strs, useTranslation } from '../i18n/i18n';

function OrderToggleButton() {
	const { isReverse, toggle } = useOrder();
	const { t } = useTranslation();

	useHotkeys('o', () => {
		toggle();
	});
	return (
		<Button
			variant="primary"
			circle="circle"
			className="shadow-lg"
			onClick={() => {
				toggle();
			}}
		>
			{isReverse ? t(strs.오랜순) : t(strs.최신순)}
		</Button>
	);
}

export default OrderToggleButton;
