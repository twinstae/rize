import React, { forwardRef } from 'react';
import { Tooltip } from './Tooltip';

type P = React.ComponentProps<'button'> & {
	onClick: React.MouseEventHandler<HTMLButtonElement>;
	icon: React.ReactElement;
	'aria-label': string;
	className?: string;
};

// eslint-disable-next-line react/display-name
const IconButtonWithTooltip = forwardRef<HTMLButtonElement, P>((props, ref) => {
	return (
		<Tooltip tip={props['aria-label']} className={props['className']}>
			<button {...props} type="button" ref={ref} className="btn btn-ghost btn-sm focus:border-2 p-1">
				{props.icon}
			</button>
		</Tooltip>
	);
});

export default IconButtonWithTooltip;
