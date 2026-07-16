import { useAtom, WritableAtom } from 'jotai';

import { useDependencies } from '../hooks/Dependencies';
import type { JsonValue } from '../types/json';

import { atomWithStorage, createJSONStorage, type RESET } from 'jotai/utils';

type SetStateActionWithReset<Value> = Value | typeof RESET | ((prev: Value) => Value | typeof RESET);

type SyncStorageRepo = {
	_storage?: Record<string, string>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const atomDict: Record<string, WritableAtom<any, SetStateActionWithReset<any>, any>> = {};

const useConfigAtom = <JsonValue>(key: string, initialValue: JsonValue) => {
	const { storageRepo } = useDependencies();
	if (!(key in atomDict)) {
		atomDict[key] = atomWithStorage(
			key,
			initialValue,
			createJSONStorage(() => ({
				getItem(storageKey) {
					const syncStorage = storageRepo as SyncStorageRepo;
					if (syncStorage._storage) {
						return syncStorage._storage[storageKey] ?? null;
					}
					return storageRepo.getItem(storageKey).then((value) => value ?? null) as unknown as string | null;
				},
				setItem(storageKey, newValue) {
					return storageRepo.setItem(storageKey, newValue);
				},
				removeItem(storageKey) {
					return storageRepo.removeItem(storageKey);
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
