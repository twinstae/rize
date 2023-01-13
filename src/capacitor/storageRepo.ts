import { Storage } from '@ionic/storage';

import { StorageRepository } from '../global';

export const createStorageRepository = (): StorageRepository<string> => {
  const storage = new Storage();
  return {
    getItem: storage.get,
    setItem: storage.set,
    removeItem: storage.remove,
  };
};

export default createStorageRepository();
