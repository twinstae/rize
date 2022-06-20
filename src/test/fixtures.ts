import { MailT, RawMailT } from '../mailList/types';

export const TEST_MAIL: MailT = {
  id: 'm340',
  member: '조유리',
  time: '2019/01/22 10:29',
  subject: '위즈원 뭐해율',
  preview:
    '여러분 뭐하고 계셨어요 !? 전 지금 노래 듣구 있답니다. 제가 요즘 푹 빠진',
  isFavorited: false,
  isUnread: false,
  tags: ['율리스트'],
};

export const TEST_MAIL_2: RawMailT = {
  id: 'm345',
  member: '김채원',
  time: '2019/01/22 10:47',
  subject: 'おはよう💕',
  preview:
    '좋은아침😊💕 이침엔 핫초코지👍ㅎ おはよう😊💕 朝ホットチョコレートか👍',
};
