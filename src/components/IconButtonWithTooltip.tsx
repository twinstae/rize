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

const IconButtonWithTooltip: <T extends React.ElementType = 'button'>(
  props: PolymorphicComponentPropsWithRef<T, IconButtonWithTooltipComponentProps>
) => React.ReactElement | null = React.forwardRef(
	function IconButtonWithTooltip<T extends React.ElementType = 'button'>(
		{
			as,
			variant = 'ghost',
			direction = 'bottom',
			circle = 'circle',
			className,
			onKeyUp,
			ariaLabel,
			...props
		}: PolymorphicComponentProps<T, IconButtonWithTooltipComponentProps>,
		ref?: PolymorphicRef<T>
	) {
		const As = (as || 'button') as 'button';
		return (
			<Tooltip tip={ariaLabel} className={className + ` tooltip-${direction}`}>
				<Button
					as={As}
					type="button"
					ref={ref}
					variant={variant}
					circle={circle}
					onKeyUp={(e: React.KeyboardEvent<HTMLElement>) => {
						if (e.key === 'Space') {
							props.onClick?.(e);
							onKeyUp?.(e);
						}
					}}
					aria-label={ariaLabel}
					{...props}
					className="focus:border-2 p-1"
				>
					{props.icon}
				</Button>
			</Tooltip>
		);
	}
);

export default IconButtonWithTooltip;
