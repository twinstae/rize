
import { fs } from '@tauri-apps/api';

import { JsonValue } from '../types/json';


const readJSONfile = (path: string) =>
  fs
    .readTextFile('output/'+path, {
      dir: fs.BaseDirectory.Download,
    })
    .then(JSON.parse)
    .catch(e => {
      console.error(path, e.message);
    });

const writeJSONfile =
  (path: string) => async (dict: JsonValue): Promise<void> =>
    fs.writeFile(
      {
        path: 'output/'+path,
        contents: JSON.stringify(dict),
      },
      {
        dir: fs.BaseDirectory.Download,
      }
    );

const fsJSON = {
  readJSONfile,
  writeJSONfile,
};

export default fsJSON;