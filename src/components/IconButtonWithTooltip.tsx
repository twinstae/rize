import React from 'react';
import { Tooltip } from './Tooltip';
import { Button } from './rize-ui';
import type { PolymorphicRef } from '../global';
import polymorphicForwardRef from '../pages/polymorphicForwardRef';

type IconButtonWithTooltipComponentProps<T extends React.ElementType> = { as?: T; variant?: 'primary' | 'ghost'; size?: 'sm' | 'base'; circle?: '' | 'circle' } & {
	onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
	icon: React.ReactElement;
	'aria-label': string;
	className?: string;
	direction?: 'left' | 'top' | 'bottom';
}

const IconButtonWithTooltip = polymorphicForwardRef(function IconButtonWithTooltip<T extends React.ElementType>(
	{ as, variant = 'ghost', direction='bottom', ...props }: IconButtonWithTooltipComponentProps<T>,
	ref: PolymorphicRef<T>,
){
	const As = (as || 'button') as 'button';

	return (
		<Tooltip tip={props['aria-label']} className={props['className'] + ` tooltip-${direction}`}>
			<Button as={As} type="button" ref={ref} variant={variant} {...props} className="focus:border-2 p-1">
				{props.icon}
			</Button>
		</Tooltip>
	);
});

export default IconButtonWithTooltip;
