import { http } from '@tauri-apps/api';

import { MailBodyT,MailRepository, RawMailT } from './types';

const readJSONfile: (path: string) => Promise<unknown> = (path) =>
  http.fetch('http://localhost:3000/' + path).then((res) => res.data);

const writeJSONfile =
  (path: string) => async (dict: Record<string, string[]>) => {
    await http.fetch('http://localhost:3000/' + path, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: http.Body.json(dict),
    });
  };

const serverMailRepository: MailRepository = {
  getAllMailList: async () =>
    readJSONfile('pm_list.json') as Promise<RawMailT[]>,
  getMailBodyDict: async () =>
    readJSONfile('mail_body_dict.json') as Promise<Record<string, MailBodyT>>,
  getMailToTagDict: async () =>
    readJSONfile('mail_to_tag_dict.json') as Promise<Record<string, string[]>>,
  saveMailToTagDict: writeJSONfile('mail_to_tag_dict.json'),
  getTagToMailDict: async () =>
    readJSONfile('tag_to_mail_dict.json') as Promise<Record<string, string[]>>,
  saveTagToMailDict: writeJSONfile('tag_to_mail_dict.json'),
};

export default serverMailRepository;
