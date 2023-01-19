import React, { forwardRef } from 'react';
import { PolymorphicComponentPropsWithRef } from '../global';

// eslint-disable-next-line @typescript-eslint/ban-types
function polymorphicForwardRef<D extends React.ElementType, P extends {}>(
	render: React.ForwardRefRenderFunction<unknown, P>,
): <T extends React.ElementType = D>(props: PolymorphicComponentPropsWithRef<T, P>) => React.ReactElement | null {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	return forwardRef(render) as any;
}

export default polymorphicForwardRef;
