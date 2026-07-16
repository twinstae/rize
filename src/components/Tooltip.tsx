import React from 'react';

interface TooltipProps {
	tip: string;
	className?: string;
	children: React.ReactNode;
}

export function Tooltip(props: TooltipProps) {
	const direction = props.className?.includes('tooltip-left')
		? 'right-full top-1/2 mr-2 -translate-y-1/2'
		: props.className?.includes('tooltip-top')
			? 'bottom-full left-1/2 mb-2 -translate-x-1/2'
			: 'left-1/2 top-full mt-2 -translate-x-1/2';
	const position = props.className?.includes('absolute') ? '' : 'relative';

	return (
		<span className={`group ${position} z-10 inline-flex ${props.className ?? ''}`}>
			{props.children}
			<span
				role="tooltip"
				className={`pointer-events-none absolute ${direction} whitespace-nowrap rounded-lg bg-slate-900 px-2 py-1 text-[11px] font-medium text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 group-focus-within:opacity-100`}
			>
				{props.tip}
			</span>
		</span>
	);
}
