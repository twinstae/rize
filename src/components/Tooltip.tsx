import { Tooltip as TooltipPrimitive } from '@base-ui/react/tooltip';

import { cn } from '../utils/cn';

function TooltipProvider({ delay = 0, timeout = 0, ...props }: TooltipPrimitive.Provider.Props) {
	return <TooltipPrimitive.Provider data-slot="tooltip-provider" delay={delay} timeout={timeout} {...props} />;
}

function Tooltip({ ...props }: TooltipPrimitive.Root.Props) {
	return <TooltipPrimitive.Root data-slot="tooltip" {...props} />;
}

function TooltipTrigger({ onFocus, ...props }: TooltipPrimitive.Trigger.Props) {
	return (
		<TooltipPrimitive.Trigger
			data-slot="tooltip-trigger"
			onFocus={(event) => {
				event.preventBaseUIHandler();
				onFocus?.(event);
			}}
			{...props}
		/>
	);
}

function TooltipContent({
	className,
	side = 'top',
	sideOffset = 4,
	align = 'center',
	alignOffset = 0,
	children,
	...props
}: TooltipPrimitive.Popup.Props &
	Pick<TooltipPrimitive.Positioner.Props, 'align' | 'alignOffset' | 'side' | 'sideOffset'>) {
	const contentClassName =
		'z-50 w-fit max-w-xs origin-(--transform-origin) rounded-lg bg-slate-900 px-2 py-1 text-[11px] font-medium whitespace-nowrap text-white shadow-lg';

	return (
		<TooltipPrimitive.Portal>
			<TooltipPrimitive.Positioner
				align={align}
				alignOffset={alignOffset}
				side={side}
				sideOffset={sideOffset}
				className="isolate z-50"
			>
				<TooltipPrimitive.Popup
					data-slot="tooltip-content"
					className={
						typeof className === 'function'
							? (state) => cn(contentClassName, className(state))
							: cn(contentClassName, className)
					}
					{...props}
				>
					{children}
					<TooltipPrimitive.Arrow className="z-50 fill-slate-900 data-[side=bottom]:top-1 data-[side=left]:top-1/2! data-[side=left]:-right-1 data-[side=left]:-translate-y-1/2 data-[side=right]:top-1/2! data-[side=right]:-left-1 data-[side=right]:-translate-y-1/2 data-[side=top]:-bottom-2.5" />
				</TooltipPrimitive.Popup>
			</TooltipPrimitive.Positioner>
		</TooltipPrimitive.Portal>
	);
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
