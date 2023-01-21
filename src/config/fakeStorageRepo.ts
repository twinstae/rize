import type { StorageRepository } from '../global';

interface FakeRepository extends StorageRepository<string> {
	_storage: Record<string, string>;
}

export const createFakeStorageRepo = () => {
	return {
		_storage: {
			config: JSON.stringify({
				lang: 'ko',
			}),
		} as Record<string, string>,
		async getItem(key: string) {
			return this._storage[key];
		},
		async setItem(key: string, value: string) {
			this._storage[key] = value;
		},
		async removeItem(key: string) {
			delete this._storage[key];
		},
	};
};

const fakeStorageRepo: FakeRepository = createFakeStorageRepo();

export default fakeStorageRepo;
