import React from 'react';
import VirtualList from './VirtualStack';
import type { PolymorphicComponentProps, PolymorphicRef } from '../global';

function FormLabel({ className, children, ...props }: React.ComponentProps<'label'>) {
	return (
		<label {...props} className={'label ' + className}>
			{children}
		</label>
	);
}

function Text({ className, children, ...props }: { children: React.ReactNode, className?: string }){
	return <span {...props} className={className}>{children}</span>;
}

function KBD({ className, children, ...props }: { children: React.ReactNode, className?: string }){
	return <kbd {...props} className={'kbd text-sm '+className}>{children}</kbd>;
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

const HStack = React.forwardRef<HTMLDivElement, React.ComponentProps<'div'> & { children: React.ReactNode }>(function HStack({ className, children, ...props }, ref) {
	return (
		<div {...props} className={'flex flex-row ' + className} ref={ref}>
			{children}
		</div>
	);
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ButtonProps= { variant?: 'primary' | 'ghost'; size?: 'sm' | 'base'; circle?: '' | 'circle', children: React.ReactNode, className?: string, };

const Button: <T extends React.ElementType = 'span'>(
  props: PolymorphicComponentProps<T, ButtonProps>,
) => React.ReactElement | null = React.forwardRef(function Button<T extends React.ElementType = 'button'>({
	as,
	className,
	variant = 'primary',
	size = 'base',
	circle = '',
	children,
	...props
}: PolymorphicComponentProps<T, ButtonProps>, ref?: PolymorphicRef<T>) {
	const Element = as || 'button';
	return (
		<Element ref={ref} {...props} className={`btn btn-${variant} btn-${size} btn-${circle} ` + className ?? ''}>
			{children}
		</Element>
	);
});

const FloatingArea = ({ children }: { children: React.ReactNode | React.ReactNode[] }) => (
	<VStack className="absolute bottom-2 right-2 gap-2">{children}</VStack>
);

export { FormLabel, Input, Radio, VStack, HStack, VirtualList, Button, KBD, Text, FloatingArea };
