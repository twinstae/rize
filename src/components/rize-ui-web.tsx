import React, { useRef } from 'react';
import VirtualList from './VirtualStack';
import type {
	PolymorphicComponentProps,
	PolymorphicComponentPropsWithRef,
	PolymorphicRef,
} from '../global';
import { useTouchRipple } from './useTouchRipple';
import { useDependencies } from '../hooks/Dependencies';

function FormLabel({
	className,
	children,
	...props
}: React.ComponentProps<'label'>) {
	return (
		<label {...props} className={'label ' + className}>
			{children}
		</label>
	);
}

function Text({
	className,
	children,
	...props
}: {
  children: React.ReactNode;
  className?: string;
} & React.ComponentProps<'span'>) {
	return (
		<span {...props} className={className}>
			{children}
		</span>
	);
}

function KBD({
	className,
	children,
	...props
}: {
  children: React.ReactNode;
  className?: string;
}) {
	return (
		<kbd {...props} className={'kbd text-sm ' + className}>
			{children}
		</kbd>
	);
}

const TextInput = React.forwardRef(function TextInput({
	className,
	type = 'text',
	size = 'base',
	width = 'base',
	autofocus,
	value,
	onChange,
	...props
}: {
	type?: 'text' | 'password' | 'search',
	autofocus?: boolean
	name: string,
  value: string;
  className?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  size?: 'sm' | 'base';
	width?: 'base' | 'full';
}, ref) {
	const isComposingRef = useRef(false);
	return (
		<input
			{...props}
			ref={ref as React.Ref<HTMLInputElement>}
			type={type}
			autoFocus={autofocus}
			className={`input input-bordered ${size === 'base' ? 'input-base' : 'input-sm'} ${width === 'full' ? 'w-full' : ''} ` + className}
			onCompositionStart={() => {
				isComposingRef.current = true;
			}}
			onCompositionEnd={() => {
				isComposingRef.current = false;
			}}
			value={value}
			onChange={(e) => {
				if (
					isComposingRef.current ||
          e.currentTarget.value.length < value.length ||
          e.currentTarget.value.at(-1) !== e.currentTarget.value.at(-2) ||
          /[가-힇ㄱ-ㅎㅏ-ㅣぁ-ゔァ-ヴー々〆〤一-龥]/.test(e.currentTarget.value.at(-1) ?? '') === false
				) {
					onChange && onChange(e);
				}
			}}
		/>
	);
});

function Checkbox({ className, ...props }: React.ComponentProps<'input'>) {
	return (
		<input
			{...props}
			type="checkbox"
			className={'input input-bordered ' + className}
		/>
	);
}

function Radio({ className, ...props }: React.ComponentProps<'input'>) {
	return <input {...props} type="radio" className={'radio ' + className} />;
}

function VStack({
	className,
	children,
	...props
}: React.ComponentProps<'div'>) {
	return (
		<div {...props} className={'flex flex-col ' + className}>
			{children}
		</div>
	);
}

const HStack = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'> & { children: React.ReactNode }
>(function HStack({ className, children, ...props }, ref) {
	return (
		<div {...props} className={'flex flex-row ' + className} ref={ref}>
			{children}
		</div>
	);
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ButtonProps = {
  variant?: 'primary' | 'ghost';
  size?: 'sm' | 'base';
  circle?: '' | 'circle';
  children?: React.ReactNode;
  className?: string;
};

const Button = React.forwardRef(function Button(
	{
		as,
		className,
		variant = 'primary',
		size = 'base',
		circle = '',
		children,
		...props
	}: PolymorphicComponentProps<'button', ButtonProps>,
	ref: PolymorphicRef<'button'>,
) {
	const Element = as || 'button';

	const defaultRef = useRef<HTMLButtonElement>(null);
	const actualRef = (ref ?? defaultRef) as React.RefObject<HTMLButtonElement>;
	
	const { platform } = useDependencies().usePlatform();
	useTouchRipple(actualRef as React.RefObject<HTMLElement>, platform !== 'darwin' && platform !== 'ios');

	return (
		<Element
			ref={actualRef as React.RefObject<HTMLButtonElement>}
			{...props}
			className={
				`btn ${variant === 'primary' ? 'btn-primary' : 'btn-ghost'} ${size === 'base' ? 'btn-base' : 'btn-sm'} ${circle === 'circle' ? 'btn-circle' : ''} relative ` + (className ??
					'')
			}
		>
			{children}
		</Element>
	);
}) as <T extends React.ElementType = 'button'>(
	props: PolymorphicComponentPropsWithRef<T, ButtonProps>,
) => React.ReactElement | null;

const FloatingArea = ({
	children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) => <VStack className="absolute bottom-2 right-2 gap-2">{children}</VStack>;

export {
	Button,
	TextInput,
	FormLabel,
	Radio,
	VStack,
	HStack,
	VirtualList,
	KBD,
	Text,
	FloatingArea,
	Checkbox,
};
