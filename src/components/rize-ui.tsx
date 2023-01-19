import React from 'react';
import VirtualList from './VirtualStack';
import type { RizeReactElement } from '../global';

function FormLabel({ className, children, ...props }: React.ComponentProps<'label'>) {
	return (
		<label {...props} className={'label ' + className}>
			{children}
		</label>
	);
}

function Input({ className, ...props }: React.ComponentProps<'input'>) {
	return <input {...props} className={'input input-bordered ' + className} />;
}

function Radio({ className, ...props }: React.ComponentProps<'input'>) {
	return <input {...props} type="radio" className={'radio ' + className} />;
}

function VStack({ className, children, ...props }: React.ComponentProps<'div'>) {
	return (
		<div {...props} className={'flex flex-col ' + className}>
			{children}
		</div>
	);
}

function HStack({ className, children, ...props }: React.ComponentProps<'div'>) {
	return (
		<div {...props} className={'flex flex-row ' + className}>
			{children}
		</div>
	);
}

export type ButtonProps<T> = { as?: T; variant?: 'primary' | 'ghost'; size?: 'sm' | 'base'; circle?: '' | 'circle' };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Button = React.forwardRef(function Button<T extends RizeReactElement>({
	as = 'button',
	className,
	variant = 'primary',
	size = 'base',
	circle = '',
	children,
	...props
}: React.ComponentProps<T> & ButtonProps<T>, ref: React.Ref<HTMLElement>) {
	const Element = as;
	return (
		<Element ref={ref} {...props} className={`btn btn-${variant} btn-${size} btn-${circle} ` + className}>
			{children}
		</Element>
	);
});

export { FormLabel, Input, Radio, VStack, HStack, VirtualList, Button };
