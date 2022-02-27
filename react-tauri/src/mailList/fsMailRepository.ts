import { fs } from "@tauri-apps/api";

const readJSONfile = (path: string) =>
  fs
    .readTextFile(path, {
      dir: fs.BaseDirectory.Download,
    })
    .then(JSON.parse);

const writeJSONfile =
  (path: string) => async (dict: Record<string, string[]>) =>
    fs.writeFile(
      {
        path: path,
        contents: JSON.stringify(dict),
      },
      {
        dir: fs.BaseDirectory.Download,
      }
    );

const fsMailRepository: MailRepository = {
  getAllMailList: async () => readJSONfile("pm_list.json"),
  getMailBodyDict: async () => readJSONfile("mail_body_dict.json"),
  getTagToMailDict: async () => readJSONfile("tag_to_mail_dict.json"),
  getMailToTagDict: async () => readJSONfile("mail_to_tag_dict.json"),
  saveMailToTagDict: writeJSONfile("mail_to_tag_dict.json"),
  saveTagToMailDict: writeJSONfile("tag_to_mail_dict.json"),
};

export default fsMailRepository;
