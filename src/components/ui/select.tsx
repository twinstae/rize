import React from 'react';
import { Select as SelectPrimitive } from '@base-ui/react/select';

import { cn } from '../../utils/cn';

function mergeClassName<T>(
	base: string,
	className?: string | ((state: T) => string | undefined),
	state?: T,
) {
	if (typeof className === 'function' && state) {
		return cn(base, className(state));
	}
	return cn(base, typeof className === 'string' ? className : undefined);
}

const Select = SelectPrimitive.Root;

function SelectGroup({ className, ...props }: SelectPrimitive.Group.Props) {
	return (
		<SelectPrimitive.Group
			data-slot="select-group"
			className={(state) => mergeClassName('scroll-my-1 p-1', className, state)}
			{...props}
		/>
	);
}

function SelectLabel({ className, ...props }: SelectPrimitive.Label.Props) {
	return (
		<SelectPrimitive.Label
			data-slot="select-label"
			className={(state) =>
				mergeClassName('text-sm font-medium text-[var(--rize-text)]', className, state)
			}
			{...props}
		/>
	);
}

function SelectValue({ className, ...props }: SelectPrimitive.Value.Props) {
	return (
		<SelectPrimitive.Value
			data-slot="select-value"
			className={(state) => mergeClassName('flex flex-1 text-left', className, state)}
			{...props}
		/>
	);
}

function SelectTrigger({
	className,
	size = 'default',
	children,
	...props
}: SelectPrimitive.Trigger.Props & {
	size?: 'sm' | 'default';
}) {
	return (
		<SelectPrimitive.Trigger
			data-slot="select-trigger"
			data-size={size}
			className={(state) =>
				mergeClassName(
					'flex w-full items-center justify-between gap-2 rounded-xl border border-[var(--rize-border)] bg-[var(--rize-base-100)] px-3 py-2 text-sm text-[var(--rize-text)] transition-colors outline-none select-none focus-visible:border-[var(--rize-primary)] focus-visible:ring-[3px] focus-visible:ring-[rgb(239_83_157/12%)] disabled:cursor-not-allowed disabled:opacity-50 data-placeholder:text-[var(--rize-muted)] data-[size=default]:h-11 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1',
					className,
					state,
				)
			}
			{...props}
		>
			{children}
			<SelectPrimitive.Icon
				render={
					<ChevronDownIcon className="pointer-events-none size-4 shrink-0 text-[var(--rize-muted)]" />
				}
			/>
		</SelectPrimitive.Trigger>
	);
}

function SelectContent({
	className,
	children,
	side = 'bottom',
	sideOffset = 4,
	align = 'start',
	alignOffset = 0,
	alignItemWithTrigger = true,
	...props
}: SelectPrimitive.Popup.Props &
	Pick<
		SelectPrimitive.Positioner.Props,
		'align' | 'alignOffset' | 'side' | 'sideOffset' | 'alignItemWithTrigger'
	>) {
	return (
		<SelectPrimitive.Portal>
			<SelectPrimitive.Positioner
				side={side}
				sideOffset={sideOffset}
				align={align}
				alignOffset={alignOffset}
				alignItemWithTrigger={alignItemWithTrigger}
				className="isolate z-50"
			>
				<SelectPrimitive.Popup
					data-slot="select-content"
					data-align-trigger={alignItemWithTrigger}
					className={(state) =>
						mergeClassName(
							'relative isolate z-50 max-h-(--available-height) w-(--anchor-width) min-w-36 origin-(--transform-origin) overflow-x-hidden overflow-y-auto rounded-xl border border-[var(--rize-border)] bg-[var(--rize-base-100)] text-[var(--rize-text)] shadow-[var(--rize-shadow)] ring-1 ring-[var(--rize-border)] data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95',
							className,
							state,
						)
					}
					{...props}
				>
					<SelectPrimitive.List>{children}</SelectPrimitive.List>
				</SelectPrimitive.Popup>
			</SelectPrimitive.Positioner>
		</SelectPrimitive.Portal>
	);
}

function SelectGroupLabel({ className, ...props }: SelectPrimitive.GroupLabel.Props) {
	return (
		<SelectPrimitive.GroupLabel
			data-slot="select-group-label"
			className={(state) =>
				mergeClassName('px-2 py-1.5 text-xs text-[var(--rize-muted)]', className, state)
			}
			{...props}
		/>
	);
}

function SelectItem({ className, children, ...props }: SelectPrimitive.Item.Props) {
	return (
		<SelectPrimitive.Item
			data-slot="select-item"
			className={(state) =>
				mergeClassName(
					'relative flex w-full cursor-default items-center rounded-lg py-2 pr-8 pl-2 text-sm outline-none select-none focus:bg-[var(--rize-hover)] data-highlighted:bg-[var(--rize-hover)] data-disabled:pointer-events-none data-disabled:opacity-50',
					className,
					state,
				)
			}
			{...props}
		>
			<SelectPrimitive.ItemText className="flex flex-1 shrink-0 whitespace-nowrap">
				{children}
			</SelectPrimitive.ItemText>
			<SelectPrimitive.ItemIndicator className="absolute right-2 flex size-4 items-center justify-center text-[var(--rize-primary)]">
				<CheckIcon />
			</SelectPrimitive.ItemIndicator>
		</SelectPrimitive.Item>
	);
}

function SelectSeparator({ className, ...props }: SelectPrimitive.Separator.Props) {
	return (
		<SelectPrimitive.Separator
			data-slot="select-separator"
			className={(state) =>
				mergeClassName('pointer-events-none -mx-1 my-1 h-px bg-[var(--rize-border)]', className, state)
			}
			{...props}
		/>
	);
}

function ChevronDownIcon({ className, ...props }: React.ComponentProps<'svg'>) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth={2}
			strokeLinecap="round"
			strokeLinejoin="round"
			className={className}
			aria-hidden="true"
			{...props}
		>
			<path d="m6 9 6 6 6-6" />
		</svg>
	);
}

function CheckIcon({ className, ...props }: React.ComponentProps<'svg'>) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth={2}
			strokeLinecap="round"
			strokeLinejoin="round"
			className={className}
			aria-hidden="true"
			{...props}
		>
			<path d="M20 6 9 17l-5-5" />
		</svg>
	);
}

export {
	Select,
	SelectContent,
	SelectGroup,
	SelectGroupLabel,
	SelectItem,
	SelectLabel,
	SelectSeparator,
	SelectTrigger,
	SelectValue,
};
