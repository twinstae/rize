interface FakeRepository extends StorageRepository {
  _storage: Record<string, string>;
}

const fakeStorageRepo: FakeRepository = {
  _storage: {},
  async getItem(key) {
    return this._storage[key];
  },
  async setItem(key, value: string) {
    this._storage[key] = value;
    return;
  },
};

export default fakeStorageRepo;
