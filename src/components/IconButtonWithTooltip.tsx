import React from 'react';
import { Tooltip } from './Tooltip';
import { Button, type ButtonProps } from './rize-ui-web';
import type { PolymorphicComponentProps, PolymorphicComponentPropsWithRef, PolymorphicRef } from '../global';

type IconButtonWithTooltipComponentProps = ButtonProps & {
  onClick?: React.MouseEventHandler<HTMLElement>;
  onKeyUp?: React.KeyboardEventHandler<HTMLElement>;
  icon: React.ReactElement;
  ariaLabel: string;
  direction?: 'left' | 'top' | 'bottom';
};

const IconButtonWithTooltip = React.forwardRef(function IconButtonWithTooltip(
	{
		as,
		variant = 'ghost',
		direction = 'bottom',
		circle = 'circle',
		className,
		onKeyUp,
		ariaLabel,
		icon,
		...props
	}: any,
	ref: any,
) {
	return (
		<Tooltip tip={ariaLabel} className={className + ` tooltip-${direction}`}>
			<Button
				as={(as || 'button') as 'button'}
				type="button"
				ref={ref}
				variant={variant}
				circle={circle}
				onKeyUp={(e: React.KeyboardEvent<HTMLElement>) => {
					if (e.key === 'Space') {
						props.onClick?.(e as unknown as React.MouseEvent<HTMLElement>);
						onKeyUp?.(e);
					}
				}}
				aria-label={ariaLabel}
				{...props}
				className="focus:border-2 p-1"
			>
				{icon}
			</Button>
		</Tooltip>
	);
}) as <T extends React.ElementType = 'button'>(
	props: PolymorphicComponentPropsWithRef<T, IconButtonWithTooltipComponentProps>,
) => React.ReactElement | null;

export default IconButtonWithTooltip;
