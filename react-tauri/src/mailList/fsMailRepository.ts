import { fs } from "@tauri-apps/api";
import TEST_MAIL_LIST from "../test/test_pm_list.json";

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
