const localStorageRepo: StorageRepository = {
  getItem: async (key: string) => {
    return localStorage.getItem(key);
  },
  setItem: async (key: string, value: string) => {
    return localStorage.setItem(key, value);
  },
};

export default localStorageRepo;
