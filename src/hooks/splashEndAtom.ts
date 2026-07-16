import { atom, getDefaultStore } from 'jotai';

export function createSuspender() {
	let _resolve = () => undefined;
	_resolve();
	const suspender = new Promise<void>((resolve) => {
		_resolve = () => {
			resolve();
			return undefined;
		};
	});
	return [suspender, _resolve] as const;
}

export const isSplashEndAtom = atom(false);

export const splashEnd = () => {
	getDefaultStore().set(isSplashEndAtom, true);
};
