import { fs } from "@tauri-apps/api";
import { StorageRepository } from "../global";
import { JsonValue } from "../types/json";

const createFsStorageRepository = (key: string): StorageRepository => {
  return {
    getItem: async () => {
      return fs.readTextFile(`local_${key}.txt`, {
        dir: fs.BaseDirectory.Download,
      }).then(JSON.parse)
        .catch(e => undefined) as Promise<JsonValue | undefined>;
    },
    setItem: async (value: JsonValue) => {
      return fs.writeFile(
        {
          path: `local_${key}.txt`,
          contents: JSON.stringify(value),
        },
        {
          dir: fs.BaseDirectory.Download,
        }
      );
    },
  }
}

export default createFsStorageRepository;
