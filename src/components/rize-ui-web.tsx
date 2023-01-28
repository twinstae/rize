import React, { useRef } from 'react';
import VirtualList from './VirtualStack';
import type { PolymorphicComponentProps, PolymorphicComponentPropsWithRef, PolymorphicRef } from '../global';
import { useTouchRipple } from './useTouchRipple';

function FormLabel({ className, children, ...props }: React.ComponentProps<'label'>) {
	return (
		<label {...props} className={'label ' + className}>
			{children}
		</label>
	);
}

function Text({ className, children, ...props }: { children: React.ReactNode, className?: string } & React.ComponentProps<'span'>){
	return <span {...props} className={className}>{children}</span>;
}

function KBD({ className, children, ...props }: { children: React.ReactNode, className?: string }){
	return <kbd {...props} className={'kbd text-sm '+className}>{children}</kbd>;
}

function TextInput({ className, size='base', ...props }: Omit<React.ComponentProps<'input'>, 'size'> & { size?: 'sm' | 'base' }) {
	return <input {...props} className={`input input-bordered input-${size} ` + className} />;
}

function Checkbox({ className, ...props }: React.ComponentProps<'input'>) {
	return <input {...props} type="checkbox" className={'input input-bordered ' + className} />;
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
export type ButtonProps= { variant?: 'primary' | 'ghost'; size?: 'sm' | 'base'; circle?: '' | 'circle', children?: React.ReactNode, className?: string, };

const Button: <T extends React.ElementType = 'button'>(
  props: PolymorphicComponentPropsWithRef<T, ButtonProps>,
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

	const defaultRef: PolymorphicRef<T> = useRef<HTMLElement>(null);
	const actualRef = ref ?? defaultRef;
	const platform = 'android';
	useTouchRipple(actualRef, platform === 'android');

	return (
		<Element ref={actualRef} {...props} className={`btn btn-${variant} btn-${size} btn-${circle} relative ` + className ?? ''}>
			{children}
		</Element>
	);
});

const FloatingArea = ({ children }: { children: React.ReactNode | React.ReactNode[] }) => (
	<VStack className="absolute bottom-2 right-2 gap-2">{children}</VStack>
);

export { Button, TextInput, FormLabel, Radio, VStack, HStack, VirtualList, KBD, Text, FloatingArea, Checkbox };
