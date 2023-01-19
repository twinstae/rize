import { useAtom, WritableAtom } from 'jotai';

import { useDependencies } from '../hooks/Dependencies';
import type { JsonValue } from '../types/json';

import { atomWithStorage, createJSONStorage, type RESET } from 'jotai/utils';

type SetStateActionWithReset<Value> = Value | typeof RESET | ((prev: Value) => Value | typeof RESET);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const atomDict: Record<string, WritableAtom<Promise<any>, SetStateActionWithReset<any>, Promise<void>>> = {};

const useConfigAtom = <JsonValue>(key: string, initialValue: JsonValue) => {
	const { storageRepo } = useDependencies();
	if (!(key in atomDict)) {
		atomDict[key] = atomWithStorage(
			key,
			initialValue,
			createJSONStorage(() => ({
				async getItem(key) {
					return storageRepo.getItem(key).then((v) => v ?? null);
				},
				async setItem(key, newValue) {
					return storageRepo.setItem(key, newValue);
				},
				async removeItem(key) {
					return storageRepo.removeItem(key);
				},
			})),
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		) as any;
	}
	return atomDict[key];
};

const useConfig = <T extends JsonValue>(
	key: string,
	initialValue: T,
): [T, (update: SetStateActionWithReset<T>) => Promise<void>] => {
	const atom = useConfigAtom(key, initialValue);
	return useAtom(atom);
};

export default useConfig;
