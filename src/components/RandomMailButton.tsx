import React from 'react';
import { useHotkeys } from 'react-hotkeys-hook';

import { choice } from '../utils';
import IconButtonWithTooltip from './IconButtonWithTooltip';
import { FabButton } from './Fab';
import ShuffleIcon from './icons/ShuffleIcon';
import { toMailDetail } from '../router/paths';
import useNavigation from '../router/useNavigation';
import { useMailList } from '../hooks/Dependencies';

function RandomMailButton({
	isRedirect = false,
	fab = false,
	direction = 'left',
}: {
	isRedirect?: boolean;
	fab?: boolean;
	direction?: 'left' | 'top' | 'bottom';
}) {
	const { Link, redirect, navigate } = useNavigation();
	const result = useMailList().useCurrentMailList();

	const to = toMailDetail(choice(result)?.id);

	useHotkeys('r', () => {
		if (isRedirect) {
			redirect(to);
		} else {
			navigate(to);
		}
	});
	if (fab) {
		return (
			<FabButton
				direction={direction}
				size="base"
				ariaLabel="무작위 메일 보기"
				icon={<ShuffleIcon />}
				onClick={() => {
					if (isRedirect) {
						redirect(to);
					} else {
						navigate(to);
					}
				}}
			/>
		);
	}

	return (
		<IconButtonWithTooltip
			as={Link}
			to={to}
			isRedirect={isRedirect}
			variant="primary"
			circle="circle"
			size="base"
			direction={direction}
			ariaLabel="무작위 메일 보기"
			icon={<ShuffleIcon />}
		/>
	);
}

export default RandomMailButton;
