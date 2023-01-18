import { atom, onMount } from 'nanostores';
import { StorageRepository } from '../global';
import { createSuspender } from '../hooks/splashEndAtom';
import fsJSON from './fsJSON';

const path = 'local_config.json';
const [suspender, resolve] = createSuspender();
const storageAtom = atom({} as Record<string, string>);

onMount(storageAtom, () => {
	fsJSON
		.readJSONfile(path)
		.then((data) => {
			storageAtom.set(data);
		})
		.catch(console.error)
		.finally(() => {
			resolve();
		});
});

storageAtom.subscribe((value) => {
	fsJSON.writeJSONfile(path)(value);
});

export const createFsStorageRepository = (): StorageRepository<string> => {
	return {
		async getItem(key: string) {
			await suspender;
			return storageAtom.get()[key];
		},
		async setItem(key: string, value: string) {
			await suspender;
			const old = storageAtom.get();
			return storageAtom.set({ ...old, [key]: value });
		},
		async removeItem(key: string) {
			await suspender;
			const old = storageAtom.get();
			delete old[key];
			return storageAtom.set({ ...old });
		},
	};
};

export default createFsStorageRepository();
