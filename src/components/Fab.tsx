import React from 'react';
import { IonFab, IonFabButton, IonFabList, IonIcon } from '@ionic/react';
import { add } from 'ionicons/icons';

import { Tooltip, TooltipContent, TooltipTrigger } from './Tooltip';
import { cn } from '../utils/cn';

type FabProps = React.ComponentProps<typeof IonFab>;

function Fab({ className, vertical = 'bottom', horizontal = 'end', ...props }: FabProps) {
	return (
		<IonFab
			className={cn('mail-fab flex flex-col gap-2', className)}
			vertical={vertical}
			horizontal={horizontal}
			{...props}
		/>
	);
}

type FabListProps = React.ComponentProps<typeof IonFabList>;

function FabList(props: FabListProps) {
	return <IonFabList {...props} />;
}

type FabToggleButtonProps = {
	ariaLabel: string;
};

function FabToggleButton({ ariaLabel }: FabToggleButtonProps) {
	return (
		<IonFabButton color="primary" aria-label={ariaLabel}>
			<IonIcon icon={add} />
		</IonFabButton>
	);
}

type FabButtonProps = Omit<React.ComponentProps<typeof IonFabButton>, 'children' | 'size'> & {
	ariaLabel: string;
	direction?: 'left' | 'top' | 'bottom' | 'right';
	icon: React.ReactElement;
	size?: 'sm' | 'base';
};

const ICON_SIZES = {
	sm: 'h-5 w-5',
	base: 'h-6 w-6',
} as const;

function FabButton({
	ariaLabel,
	direction = 'left',
	icon,
	size = 'base',
	className,
	onKeyUp,
	onClick,
	...props
}: FabButtonProps) {
	const sizedIcon = React.isValidElement(icon)
		? React.cloneElement(icon as React.ReactElement<{ className?: string }>, {
				className: `${ICON_SIZES[size]} ${(icon as React.ReactElement<{ className?: string }>).props.className ?? ''}`.trim(),
			})
		: icon;

	return (
		<Tooltip>
			<TooltipTrigger
				closeOnClick={false}
				render={
					<IonFabButton
						color="primary"
						aria-label={ariaLabel}
						className={className + " w-12 h-12"}
						onClick={onClick}
						onKeyUp={(e) => {
							if (e.key === 'Space') {
								onClick?.(e as unknown as React.MouseEvent<HTMLIonFabButtonElement>);
								onKeyUp?.(e);
							}
						}}
						{...props}
					/>
				}
			>
				{sizedIcon}
			</TooltipTrigger>
			<TooltipContent side={direction}>{ariaLabel}</TooltipContent>
		</Tooltip>
	);
}

export { Fab, FabList, FabToggleButton, FabButton };
