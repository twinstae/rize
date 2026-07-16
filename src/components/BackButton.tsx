import React from 'react';

import useNavigation from '../router/useNavigation';
import IconButtonWithTooltip from './IconButtonWithTooltip';
import { FabButton } from './Fab';
import ArrowLeftIcon from './icons/ArrowLeftIcon';
import { useHotkeys } from 'react-hotkeys-hook';
import { strs, useTranslation } from '../i18n/i18n';

function BackButton({
	direction = 'bottom',
	width = 'fit',
	className = '',
	variant = 'ghost',
	circle = '',
	size = 'sm',
	fab = false,
}: {
	direction?: 'bottom' | 'top' | 'left';
	width?: 'full' | 'fit';
	className?: string;
	variant?: 'ghost' | 'primary';
	circle?: '' | 'circle';
	size?: 'sm' | 'base';
	fab?: boolean;
}) {
	const navigation = useNavigation();
	const { t } = useTranslation();

	function backHandler(event?: React.MouseEvent | KeyboardEvent) {
		event?.preventDefault();
		navigation.goBack();
	}
	useHotkeys(
		'backspace',
		backHandler,
		{
			enableOnFormTags: false,
		},
		[navigation],
	);
	if (fab) {
		return (
			<FabButton
				direction={direction}
				size={size}
				className={className}
				icon={<ArrowLeftIcon />}
				onClick={backHandler}
				ariaLabel={t(strs.돌아가기)}
			/>
		);
	}

	return (
		<IconButtonWithTooltip
			as="a"
			href=""
			type={undefined}
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
