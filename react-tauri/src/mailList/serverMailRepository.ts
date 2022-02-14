import { http } from "@tauri-apps/api";
const serverMailRepository: MailRepository = {
  getAllMailList: async () =>
    http
      .fetch("http://localhost:3000/pm_list.json")
      .then((res) => res.data as MailT[]),
};

export default serverMailRepository;
