
import { fs } from '@tauri-apps/api';

import { JsonValue } from '../types/json';

const cache = new Map();

const readJSONfile = async (path: string) => {
  console.log(cache);
  if (cache.has(path)){
    return cache.get(path);
  }
  return fs
    .readTextFile('output/'+path, {
      dir: fs.BaseDirectory.Download,
    })
    .then(JSON.parse)
    .then((data) => {
      cache.set(path, data);
      return data;
    })
    .finally(() => console.log('loaded', path));
};

const writeJSONfile =
  (path: string) => async (dict: JsonValue): Promise<void> => {
    return fs.writeFile(
      {
        path: 'output/'+path,
        contents: JSON.stringify(dict),
      },
      {
        dir: fs.BaseDirectory.Download,
      }
    ).then(() => {
      cache.set(path, dict);
    });
  };

const fsJSON = {
  readJSONfile,
  writeJSONfile,
};

export default fsJSON;