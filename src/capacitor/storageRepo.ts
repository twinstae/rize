import { Storage } from '@capacitor/storage';

import { StorageRepository } from '../global';
import { JsonValue } from '../types/json';

export const createStorageRepository = (key: string): StorageRepository<JsonValue> => {

  return {
    getItem: async  () => {
      return Storage.get({ key }).then(result => JSON.parse(result.value ?? '{}'));
    },
    setItem: async (value) => {
      return Storage.set({ key, value: JSON.stringify(value)});
    },
  };
};

export default createStorageRepository('config');
