import type { JSXElementConstructor } from 'react';
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type RizeReactElement =keyof JSX.IntrinsicElements | JSXElementConstructor<any>;

declare global {
	interface Window {
		__coverage__: unknown | undefined;
	}
}
