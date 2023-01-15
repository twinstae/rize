import TEST_MAIL_BODY_DICT from '../test/mail_body_dict.json';
import MEMBER_NAME from '../test/member_name.json';
import TEST_MAIL_LIST from '../test/pm_list.json';
import TAG_TO_MAIL_DICT from '../test/tag_to_mail_dict.json';
import { MailRepository } from './types';
import { JsonValue } from '../types/json';
export const fileList = [
  'pm_list.json',
  'mail_body_dict.json',
  'member_name.json',
];

const fakeFs: Record<string, unknown> = {
  'pm_list.json': TEST_MAIL_LIST.slice(0, 100),
  'mail_body_dict.json': TEST_MAIL_BODY_DICT,
  'member_name.json': MEMBER_NAME,
  'tag_to_mail_dict.json': TAG_TO_MAIL_DICT,
};
export const fakeFsJSON = {
  writeJSONfile: (path: string) => async (dict: JsonValue) => {
    fakeFs[path] = dict;
  },
  readJSONfile: async <T extends JsonValue>(path: string): Promise<T> =>
    fakeFs[path] as T,
};

const fakeMailRepository: MailRepository = {
  getAllMailList: async () => fakeFsJSON.readJSONfile('pm_list.json'),
  getMailBodyDict: async () => fakeFsJSON.readJSONfile('mail_body_dict.json'),
  getTagToMailDict: async () =>  fakeFsJSON.readJSONfile('tag_to_mail_dict.json'),
  getMemberNameDict: async () => fakeFsJSON.readJSONfile('member_name.json'),
  saveTagToMailDict: fakeFsJSON.writeJSONfile('tag_to_mail_dict.json'),
  status: async () =>
    Promise.all(
      [
        'pm_list.json',
        'mail_body_dict.json',
        'member_name.json',
      ].map((path) => fakeFsJSON.readJSONfile(path).then(v => [path, !!v]))
    ).then(entries => Object.fromEntries(entries)),
};

export const updateFakeStatus = (status: Record<string, boolean>) => {
  Object.keys(status)
    .filter(key => status[key] === false)
    .forEach(key => {
      fakeFs[key] = null;
    });
};

export default fakeMailRepository;
