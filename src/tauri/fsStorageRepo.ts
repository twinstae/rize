import { fs } from '@tauri-apps/api';
import { atom, onMount } from 'nanostores';
import { StorageRepository } from '../global';
import { createSuspender } from '../hooks/splashEndAtom';

const path = 'output/local_config.json';
const [suspender, resolve] = createSuspender();
const storageAtom = atom({} as Record<string, string>);

onMount(storageAtom, () => {
  fs.readTextFile(path, {
    dir: fs.BaseDirectory.Download,
  })
    .catch(() => '{}')
    .then(jsonText => {
      storageAtom.set(JSON.parse(jsonText));
    }).finally(() => {
      resolve();
    });

  return () => undefined;
});

storageAtom.subscribe(value => {
  fs.writeFile(
    {
      path: path,
      contents: JSON.stringify(value),
    },
    {
      dir: fs.BaseDirectory.Download,
    }
  );
});

export const createFsStorageRepository = (): StorageRepository<string> => {
  return {
    getItem: async (key: string) => {
      await suspender;
      return storageAtom.get()[key];
    },
    setItem: async (key: string, value: string) => {
      await suspender;
      const old = storageAtom.get();
      return storageAtom.set({...old, [key]: value});
    },
    async removeItem(key: string){
      await suspender;
      const old = storageAtom.get();
      delete old[key];
      return storageAtom.set({...old});
    }
  };
};

export default createFsStorageRepository();
