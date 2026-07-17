import type { StorageRepository } from '../global';
import { Preferences } from '@capacitor/preferences';
import { debugLogger, summarizeValue, withDebugLog } from '../debug/debugLog';

const logger = debugLogger.storage();

export const createPreferenceStorageRepository = (): StorageRepository<string> => {
	return {
		async getItem(key: string) {
			return withDebugLog(logger, 'getItem', { key, direction: 'in' }, () =>
				Preferences.get({ key }).then(({ value }) => value ?? undefined),
			);
		},
		async setItem(key: string, value: string) {
			return withDebugLog(logger, 'setItem', { key, direction: 'out', value: summarizeValue(value) }, () =>
				Preferences.set({ key, value }),
			);
		},
		async removeItem(key: string) {
			return withDebugLog(logger, 'removeItem', { key, direction: 'out' }, () => Preferences.remove({ key }));
		},
	};
};

export default createPreferenceStorageRepository();
