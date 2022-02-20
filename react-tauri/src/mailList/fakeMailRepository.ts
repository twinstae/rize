import TEST_MAIL_LIST from "../test/test_pm_list.json";
import TEST_MAIL_BODY_DICT from "../test/test_mail_body_dict.json";

const fakeMailRepository: MailRepository = {
  getAllMailList: async () => TEST_MAIL_LIST as MailT[],
  getMailBodyDict: async () => TEST_MAIL_BODY_DICT as Record<string, MailBodyT>,
};

export default fakeMailRepository;
