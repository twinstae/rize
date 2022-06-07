import TEST_MAIL_BODY_DICT from '../public/mail_body_dict.json';
import MEMBER_NAME from '../public/member_name.json';
import TEST_MAIL_LIST from '../public/pm_list.json';
import TAG_TO_MAIL_DICT from '../public/tag_to_mail_dict.json';
import { MailBodyT,MailRepository, RawMailT } from './types';

let tag_to_mail_dict: Record<string, string[]> = TAG_TO_MAIL_DICT;

const fakeMailRepository: MailRepository = {
  getAllMailList: async () => TEST_MAIL_LIST as RawMailT[],
  getMailBodyDict: async () => TEST_MAIL_BODY_DICT as Record<string, MailBodyT>,
  getTagToMailDict: async () => tag_to_mail_dict,
  getMemberNameDict: async () => MEMBER_NAME as Record<string, number>,
  saveTagToMailDict: async (dict: Record<string, string[]>) => {
    tag_to_mail_dict = dict;
  },
};

export default fakeMailRepository;
