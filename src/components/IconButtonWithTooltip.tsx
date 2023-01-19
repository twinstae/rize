import React, { type ForwardedRef, forwardRef } from 'react';
import { Tooltip } from './Tooltip';
import { Button, ButtonProps } from './rize-ui';
import type { RizeReactElement } from '../global';

type P<T extends RizeReactElement = 'button'> = React.ComponentProps<T> &
	ButtonProps<T> & {
		as?: T;
		onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
		icon: React.ReactElement;
		'aria-label': string;
		className?: string;
		direction?: 'left' | 'top' | 'bottom';
	};

// eslint-disable-next-line react/display-name
const IconButtonWithTooltip: React.FC<P<'button' | 'a'> & React.RefAttributes<HTMLElement>> = forwardRef(
	<T extends RizeReactElement, E extends HTMLElement = HTMLButtonElement>(
		{ as = 'button', variant = 'ghost', direction='bottom', ...props }: P<T>,
		ref: ForwardedRef<E>,
	) => {
		return (
			<Tooltip tip={props['aria-label']} className={props['className'] + ` tooltip-${direction}`}>
				<Button as={as} type="button" ref={ref} variant={variant} {...props} className="focus:border-2 p-1">
					{props.icon}
				</Button>
			</Tooltip>
		);
		
	},
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
) as any;

export default IconButtonWithTooltip;
