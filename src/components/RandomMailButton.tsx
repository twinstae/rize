import React from 'react';
import { useHotkeys } from 'react-hotkeys-hook';

import { choice } from '../utils';
import IconButtonWithTooltip from './IconButtonWithTooltip';
import ShuffleIcon from './icons/ShuffleIcon';
import { toMailDetail } from '../router/paths';
import useNavigation from '../router/useNavigation';
import { useMailList } from '../hooks/Dependencies';

function RandomMailButton({ isRedirect=false }: { isRedirect?: boolean }) {
	const { Link, redirect, navigate } = useNavigation();
	const result = useMailList().useCurrentMailList();

	const to = toMailDetail(choice(result)?.id);

	useHotkeys('r', () => {
		if (isRedirect){
			redirect(to);
		} else {
			navigate(to);
		}
	});
	return (
		<IconButtonWithTooltip
			as={Link}
			to={to}
			isRedirect={isRedirect}
			variant="primary"
			circle="circle"
			direction="left"
			ariaLabel="무작위 메일 보기"
			icon={<ShuffleIcon />}
		/>
	);
}

export default RandomMailButton;