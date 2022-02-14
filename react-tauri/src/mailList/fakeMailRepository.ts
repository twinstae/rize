import TEST_MAIL_LIST from "../test/test_pm_list.json";

const fakeMailRepository: MailRepository = {
  getAllMailList: async () => TEST_MAIL_LIST as MailT[],
};

export default fakeMailRepository;
