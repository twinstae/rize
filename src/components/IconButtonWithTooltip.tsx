import React from 'react';
import { Tooltip } from './Tooltip';
import { Button, type ButtonProps } from './rize-ui-web';
import type { PolymorphicComponentPropsWithRef } from '../global';

type IconButtonWithTooltipComponentProps = ButtonProps & {
	onClick?: React.MouseEventHandler<HTMLElement>;
	onKeyUp?: React.KeyboardEventHandler<HTMLElement>;
	icon: React.ReactElement;
	ariaLabel: string;
	direction?: 'left' | 'top' | 'bottom';
	size?: 'sm' | 'base';
};

const ICON_SIZES = {
	sm: 'h-5 w-5',
	base: 'h-6 w-6',
} as const;

const IconButtonWithTooltip = React.forwardRef(function IconButtonWithTooltip(
	{
		as,
		variant = 'ghost',
		direction = 'bottom',
		circle = 'circle',
		size = 'sm',
		className,
		onKeyUp,
		ariaLabel,
		icon,
		...props
	}: IconButtonWithTooltipComponentProps & { as?: React.ElementType },
	ref: React.Ref<HTMLButtonElement>,
) {
	const sizedIcon = React.isValidElement(icon)
		? React.cloneElement(icon as React.ReactElement<{ className?: string }>, {
				className: `${ICON_SIZES[size]} ${(icon as React.ReactElement<{ className?: string }>).props.className ?? ''}`.trim(),
				'aria-hidden': true,
			})
		: icon;

	return (
		<Tooltip tip={ariaLabel} className={`tooltip-${direction} ${className ?? ''}`}>
			<Button
				as={(as || 'button') as 'button'}
				type="button"
				ref={ref}
				variant={variant}
				circle={circle}
				size={size}
				onKeyUp={(e: React.KeyboardEvent<HTMLElement>) => {
					if (e.key === 'Space') {
						props.onClick?.(e as unknown as React.MouseEvent<HTMLElement>);
						onKeyUp?.(e);
					}
				}}
				aria-label={ariaLabel}
				{...props}
				className="shrink-0"
			>
				{sizedIcon}
			</Button>
		</Tooltip>
	);
}) as <T extends React.ElementType = 'button'>(
	props: PolymorphicComponentPropsWithRef<T, IconButtonWithTooltipComponentProps>,
) => React.ReactElement | null;

export default IconButtonWithTooltip;
