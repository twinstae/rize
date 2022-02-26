import TEST_MAIL_LIST from "../test/test_pm_list.json";
import TEST_MAIL_BODY_DICT from "../test/test_mail_body_dict.json";
import TAG_TO_MAIL_DICT from "../test/tag_to_mail_dict.json";
import MAIL_TO_TAG_DICT from "../test/mail_to_tag_dict.json";

const fakeMailRepository: MailRepository = {
  getAllMailList: async () => TEST_MAIL_LIST as MailT[],
  getMailBodyDict: async () => TEST_MAIL_BODY_DICT as Record<string, MailBodyT>,
  getTagToMailDict: async () => TAG_TO_MAIL_DICT as Record<string, string[]>,
  getMailToTagDict: async () => MAIL_TO_TAG_DICT as Record<string, string[]>,
};

export default fakeMailRepository;
