import { atom } from 'jotai';
import withDefault from '../withDefault';

const atomWithLoaded = <T>(initialValue: T, load: () => Promise<T>) => {
	const valueAtom = atom(initialValue);
	valueAtom.onMount = (setValue) => {
		void load().catch(withDefault(initialValue)).then(setValue);
	};
	return valueAtom;
};

export default atomWithLoaded;
