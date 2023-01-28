import React from 'react';

import useNavigation from '../router/useNavigation';
import IconButtonWithTooltip from './IconButtonWithTooltip';
import ArrowLeftIcon from './icons/ArrowLeftIcon';
import { useHotkeys } from 'react-hotkeys-hook';
import { strs, useTranslation } from '../i18n/i18n';

function BackButton({
	direction = 'bottom',
	width = 'fit',
	className = '',
	variant = 'ghost',
	circle = '',
	size = 'sm'
}: {
	direction?: 'bottom' | 'top' | 'left';
	width?: 'full' | 'fit';
	className?: string;
	variant?: 'ghost' | 'primary';
	circle?: '' | 'circle';
	size?: 'sm' | 'base'
}) {
	const navigation = useNavigation();
	const { t } = useTranslation();

	function backHandler() {
		navigation.goBack();
	}
	useHotkeys('backspace', backHandler, {
		enableOnFormTags: false
	}, [navigation]);
	return (
		<IconButtonWithTooltip
			size={size}
			variant={variant}
			circle={circle}
			direction={direction}
			className={`w-${width} ${className}`}
			icon={<ArrowLeftIcon />}
			onClick={backHandler}
			ariaLabel={t(strs.돌아가기)}
		/>
	);
}

export default BackButton;
