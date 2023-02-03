import React from 'react';

function ShuffleIcon({ className, ...props }: React.ComponentProps<'svg'>) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth={1.5}
			stroke="currentColor"
			className={'w-6 h-6 ' + className ?? ''}
			{...props}
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M 3 3 L 21 21 H 16 21V 16"
			/>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M 3 21 L 21 3 H 16 21V 8"
			/>
		</svg>
	);
}
export default ShuffleIcon;
