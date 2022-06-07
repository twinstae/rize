import { MailRepository } from '../mailList/types';
import { readJSONfile, writeJSONfile } from './fsJSON';

const fsMailRepository: MailRepository = {
  getAllMailList: async () => readJSONfile('pm_list.json'),
  getMailBodyDict: async () => readJSONfile('mail_body_dict.json'),
  getTagToMailDict: async () => readJSONfile('tag_to_mail_dict.json'),
  getMemberNameDict: async () => readJSONfile('member_name.json'),
  saveTagToMailDict: writeJSONfile('tag_to_mail_dict.json'),
};

export default fsMailRepository;