import { atomWithStorage, createJSONStorage } from 'jotai/utils';
import { StorageRepository } from '../global';


const atomWithPersit = <T>(fallback: T, repo: StorageRepository<T>) => {
  const storage = createJSONStorage<T>(() => ({
    async getItem(){
      const saved = repo.getItem();
      if (saved){
        return JSON.stringify(saved);
      }
      return null;
    },
    async setItem(_, value){
      return repo.setItem(JSON.parse(value));
    },
    async removeItem(){
      return repo.removeItem();
    }
  }));
  return atomWithStorage<T>('config', fallback, storage);
};

export default atomWithPersit;