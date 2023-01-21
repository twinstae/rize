import type { StorageRepository } from '../global';
import { Preferences } from '@capacitor/preferences';

export const createFsStorageRepository = (): StorageRepository<string> => {
	return {
		async getItem(key: string) {
			return Preferences.get({ key }).then(({ value }) => value ?? undefined);
		},
		async setItem(key: string, value: string) {
			return Preferences.set({ key, value });
		},
		async removeItem(key: string) {
			return Preferences.remove({ key });
		},
	};
};

export default createFsStorageRepository();
