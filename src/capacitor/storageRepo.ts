import { Storage } from '@ionic/storage';

import { StorageRepository } from '../global';
import { JsonValue } from '../types/json';

export const createStorageRepository = (key: string): StorageRepository<JsonValue> => {
  const storage = new Storage();
  return {
    getItem: async  () => {
      return storage.get(key).then(result => JSON.parse(result.value ?? '{}'));
    },
    setItem: async (value) => {
      return storage.set(key, JSON.stringify(value));
    },
    async removeItem(){
      return storage.remove(key);
    }
  };
};

export default createStorageRepository('config');
