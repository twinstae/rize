import { fs } from "@tauri-apps/api";
const fsStorageRepo: StorageRepository = {
  getItem: async (key: string) => {
    return fs.readTextFile(`local_${key}.txt`, {
      dir: fs.BaseDirectory.Download,
    });
  },
  setItem: async (key: string, value: string) => {
    return fs.writeFile(
      {
        path: `local_${key}.txt`,
        contents: value,
      },
      {
        dir: fs.BaseDirectory.Download,
      }
    );
  },
};

export default fsStorageRepo;
