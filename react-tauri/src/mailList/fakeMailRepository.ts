import TEST_MAIL_LIST from "../test/test_pm_list.json";
import TEST_MAIL_BODY_DICT from "../test/test_mail_body_dict.json";
import TAG_TO_MAIL_DICT from "../test/tag_to_mail_dict.json";
import MAIL_TO_TAG_DICT from "../test/mail_to_tag_dict.json";
import { MailRepository, RawMailT, MailBodyT } from "./types";

let tag_to_mail_dict: Record<string, string[]> = TAG_TO_MAIL_DICT;
let mail_to_tag_dict: Record<string, string[]> = MAIL_TO_TAG_DICT;

const fakeMailRepository: MailRepository = {
  getAllMailList: async () => TEST_MAIL_LIST as RawMailT[],
  getMailBodyDict: async () => TEST_MAIL_BODY_DICT as Record<string, MailBodyT>,
  getTagToMailDict: async () => tag_to_mail_dict,
  getMailToTagDict: async () => mail_to_tag_dict,
  saveMailToTagDict: async (dict: Record<string, string[]>) => {
    mail_to_tag_dict = dict;
  },
  saveTagToMailDict: async (dict: Record<string, string[]>) => {
    tag_to_mail_dict = dict;
  },
};

export default fakeMailRepository;
