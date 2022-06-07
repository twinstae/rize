import { Directory, Encoding,Filesystem } from '@capacitor/filesystem';

import { JsonValue } from '../types/json';

export const readJSONfile = (path: string) =>
  Filesystem
    .readFile({
      path: 'output/' + path,
      directory: Directory.Data,
      encoding: Encoding.UTF8,
    })
    .then(result => JSON.parse(result.data));

Filesystem.mkdir({
  path: 'output',
  directory: Directory.Data,
}).catch(error => {
  if(error.message === 'Current directory does already exist.') return;
  throw error;
});

export const writeJSONfile = (path: string) => async (dict: JsonValue) => {
  return Filesystem
    .writeFile({
      path: 'output/'+path,
      data: JSON.stringify(dict),
      directory: Directory.Data,
      encoding: Encoding.UTF8,
    })
    .then(() => undefined);
};