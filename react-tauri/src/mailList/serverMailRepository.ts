import { http } from "@tauri-apps/api";
const serverMailRepository: MailRepository = {
  getAllMailList: async () =>
    http
      .fetch("http://localhost:3000/pm_list.json")
      .then((res) => res.data as MailT[]),
  getMailBodyDict: async () =>
    http
      .fetch("http://localhost:3000/mail_body_dict.json")
      .then((res) => res.data as Record<string, MailBodyT>),
};

export default serverMailRepository;
