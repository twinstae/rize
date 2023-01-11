import { StorageRepository } from '../global';
import { JsonValue } from '../types/json';

export const createLocalStorageRepository = (key: string): StorageRepository<JsonValue> => {
  return {
    getItem: async () => {
      const saved = localStorage.getItem(key);
      if (saved) return JSON.parse(saved) as JsonValue;
      return undefined;
    },
    setItem: async (value: JsonValue) => {
      localStorage.setItem(key, JSON.stringify(value));
    },
    async removeItem(){
      return localStorage.removeItem(key);
    }
  };
};

export default createLocalStorageRepository('config');
