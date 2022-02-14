import { fs } from "@tauri-apps/api";

const fsMailRepository: MailRepository = {
  getAllMailList: async () => {
    return fs
      .readTextFile("./pm_list.json", {
        dir: fs.BaseDirectory.Download,
      })
      .then(JSON.parse);
  },
};

export default fsMailRepository;
