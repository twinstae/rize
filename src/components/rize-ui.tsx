import React from 'react';
import VirtualList from './VirtualStack';
import type { PolymorphicRef } from '../global';
import polymorphicForwardRef from '../pages/polymorphicForwardRef';

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

export type ButtonProps<T extends React.ElementType> = {
	as?: T;
	variant?: 'primary' | 'ghost';
	size?: 'sm' | 'base';
	circle?: '' | 'circle';
	className?: string;
	children?: React.ReactNode | React.ReactNode[];
} & React.ComponentProps<T>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Button = polymorphicForwardRef(function Button<T extends React.ElementType>(
	{ as, className, variant = 'primary', size = 'base', circle = '', children, ...props }: ButtonProps<T>,
	ref?: PolymorphicRef<T>,
) {
	const Element = as || 'button';
	return (
		<Element ref={ref} {...props} className={`btn btn-${variant} btn-${size} btn-${circle} ` + className}>
			{children}
		</Element>
	);
});

export { FormLabel, Input, Radio, VStack, HStack, VirtualList, Button };
