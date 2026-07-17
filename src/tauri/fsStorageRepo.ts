import { readTextFile, writeTextFile, BaseDirectory } from '@tauri-apps/plugin-fs';
import { atom, onMount } from 'nanostores';
import { debugLogger, summarizeValue, withDebugLog } from '../debug/debugLog';
import type { StorageRepository } from '../global';
import { createSuspender } from '../hooks/splashEndAtom';
import withDefault from '../withDefault';

const logger = debugLogger.storage();

const path = 'output/local_config.json';
const [suspender, resolve] = createSuspender();
const storageAtom = atom({} as Record<string, string>);

onMount(storageAtom, () => {
	withDebugLog(logger, 'readStorageFile', { path, direction: 'in' }, () =>
		readTextFile(path, {
			baseDir: BaseDirectory.Download,
		})
			.catch(withDefault('{}'))
			.then((jsonText) => {
				storageAtom.set(JSON.parse(jsonText));
				return jsonText;
			}),
	).finally(() => {
		resolve();
	});
});

storageAtom.subscribe((value) => {
	void withDebugLog(
		logger,
		'writeStorageFile',
		{ path, direction: 'out', payload: summarizeValue(value) },
		() =>
			writeTextFile(path, JSON.stringify(value), {
				baseDir: BaseDirectory.Download,
			}),
	);
});

export const createFsStorageRepository = (): StorageRepository<string> => {
	return {
		async getItem(key: string) {
			await suspender;
			return withDebugLog(logger, 'getItem', { key, direction: 'in' }, () => storageAtom.get()[key]);
		},
		async setItem(key: string, value: string) {
			await suspender;
			return withDebugLog(logger, 'setItem', { key, direction: 'out', value: summarizeValue(value) }, () => {
				const old = storageAtom.get();
				return storageAtom.set({ ...old, [key]: value });
			});
		},
		async removeItem(key: string) {
			await suspender;
			return withDebugLog(logger, 'removeItem', { key, direction: 'out' }, () => {
				const old = storageAtom.get();
				delete old[key];
				return storageAtom.set({ ...old });
			});
		},
	};
};

export default createFsStorageRepository();
