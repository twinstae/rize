export const toMailDetail = (mailId: string) =>
  'MailDetailPage?mailId=' + mailId;

export default {
  ROOT: 'InitPage',
  MAIL_LIST: 'MailListPage',
  MAIL_DETAIL: 'MailDetailPage',
  CONFIG: 'Config',
  TEST: 'Test',
};
