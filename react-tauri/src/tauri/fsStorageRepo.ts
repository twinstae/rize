import { fs } from '@tauri-apps/api';

import { StorageRepository } from '../global';
import { JsonValue } from '../types/json';

export const createFsStorageRepository = (key: string): StorageRepository<JsonValue> => {
  const path = `output/local_${key}.txt`;
  return {
    getItem: async () => {
      return fs.readTextFile(path, {
        dir: fs.BaseDirectory.Download,
      }).then(JSON.parse)
        .catch(() => undefined) as Promise<JsonValue | undefined>;
    },
    setItem: async (value: JsonValue) => {
      return fs.writeFile(
        {
          path: path,
          contents: JSON.stringify(value),
        },
        {
          dir: fs.BaseDirectory.Download,
        }
      );
    },
  };
};

export default createFsStorageRepository('config');
