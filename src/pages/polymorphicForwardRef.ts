import React, { forwardRef } from 'react';
import { PolymorphicComponentPropsWithRef } from '../global';

function polymorphicForwardRef<D extends React.ElementType, P extends object>(
	render: React.ForwardRefRenderFunction<D, P>,
): <T extends React.ElementType = D>(props: PolymorphicComponentPropsWithRef<T, P>) => React.ReactElement | null {
	return forwardRef(render as React.ForwardRefRenderFunction<D, object>) as <T extends React.ElementType = D>(
		props: PolymorphicComponentPropsWithRef<T, P>,
	) => React.ReactElement | null;
}

export default polymorphicForwardRef;
