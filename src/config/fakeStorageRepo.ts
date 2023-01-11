import { StorageRepository } from '../global';
import { JsonObject, JsonValue } from '../types/json';

interface FakeRepository extends StorageRepository<JsonValue> {
  _storage: JsonObject;
}

export const createFakeStorageRepo = (key: string) => {
  return {
    _storage: {
      config: {
        lang: 'ko'
      }
    } as JsonObject,
    async getItem() {
      return this._storage[key];
    },
    async setItem(value: JsonValue) {
      this._storage[key] = value;
    },
    async removeItem() {
      delete this._storage[key];
    },
  };
};

const fakeStorageRepo: FakeRepository = createFakeStorageRepo('config');

export default fakeStorageRepo;
