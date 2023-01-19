/* eslint-disable @typescript-eslint/ban-types */
import type React from 'react';
type UsernameT = {
	before: string;
	after: string;
	setBefore: (newBefore: string) => void;
	setAfter: (newAfter: string) => void;
	replaceUsername: (text: string) => string;
};

export interface StorageRepository<T> {
	getItem: (key: string) => Promise<T | undefined>;
	setItem: (key: string, value: T) => Promise<void>;
	removeItem: (key: string) => Promise<void>;
}

export type PropsOf<
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	C extends keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>,
> = JSX.LibraryManagedAttributes<C, React.ComponentPropsWithoutRef<C>>;

type AsProp<C extends React.ElementType> = {
	/**
	 * An override of the default HTML tag.
	 * Can also be another React component.
	 */
	as?: C;
};

export type ExtendableProps<ExtendedProps = {}, OverrideProps = {}> = OverrideProps &
	Omit<ExtendedProps, keyof OverrideProps>;

export type InheritableElementProps<C extends React.ElementType, Props = {}> = ExtendableProps<PropsOf<C>, Props>;

export type PolymorphicComponentProps<C extends React.ElementType, Props = {}> = InheritableElementProps<
	C,
	Props & AsProp<C>
>;

export type PolymorphicRef<C extends React.ElementType> = React.ComponentPropsWithRef<C>['ref'];

export type PolymorphicComponentPropsWithRef<
	T extends React.ElementType,
	// eslint-disable-next-line @typescript-eslint/ban-types
	Props = {},
> = PolymorphicComponentProps<T, Props> & { ref?: PolymorphicRef<T> };

declare global {
	interface Window {
		__coverage__: unknown | undefined;
	}
}
