import { MailBodyT, MailT, RawMailT } from '../mailList/types';
import TEST_MAIL_BODY_DICT from '../public/mail_body_dict.json';
import TEST_MAIL_LIST from '../public/pm_list.json';
import { IndexMail } from '../search/types';

const rawYuri: RawMailT = {
  ...TEST_MAIL_LIST[9],
  member: '조유리',
};

const rawYuriBody = TEST_MAIL_BODY_DICT['m25752'];

export const TEST_MAIL: MailT & MailBodyT = {
  ...rawYuri,
  isFavorited: false,
  isUnread: false,
  tags: ['율리스트'],
  ...rawYuriBody,
};

export const TEST_MAIL_2: IndexMail = {
  id: 'm345',
  subject: 'おはよう💕',
  body:
    '좋은아침😊💕 이침엔 핫초코지👍ㅎ おはよう😊💕 朝ホットチョコレートか👍',
};
