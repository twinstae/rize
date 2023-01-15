import { MailBodyT, RawMailT } from '../mailList/types';
import { IndexMail } from '../search/types';

const rawYuri: RawMailT = { 'id': 'm25752', 'member': '조유리', 'subject': '위즈원에게', 'preview': '위즈원!!!안녕하세요 유리입니다아오늘은 평소 보내던 메일과는 조금 다른 메일이 될', 'time': '2021/04/28 23:00' };

const rawYuriBody = {
  body: '<p>위즈원!!!안녕하세요&nbsp;유리입니다아</p><p>오늘은&nbsp;평소&nbsp;보내던&nbsp;메일과는&nbsp;조금&nbsp;다른&nbsp;메일이&nbsp;될&nbsp;것&nbsp;같아요</p><p>프라이빗&nbsp;메일&nbsp;하면서&nbsp;그리고&nbsp;아이즈원을&nbsp;하면서&nbsp;여러분&nbsp;덕에&nbsp;참&nbsp;행복하고&nbsp;즐거웠습니다</p><p>재밌는&nbsp;일&nbsp;생기면&nbsp;프라이빗&nbsp;메일&nbsp;보내줘야겠다~~생각하면서&nbsp;사진&nbsp;찍는 게&nbsp;일상이었는데&nbsp;이제&nbsp;못한다니&nbsp;좀&nbsp;아쉽구..서럽구..&nbsp;그러네요&nbsp;ㅜㅠ</p><p>별&nbsp;볼일&nbsp;없는&nbsp;제&nbsp;일상들이&nbsp;위즈원덕에&nbsp;더&nbsp;특별해진&nbsp;것&nbsp;같아요.&nbsp;프라이빗&nbsp;메일로&nbsp;제&nbsp;일상을&nbsp;함께해 주신&nbsp;여러분들&nbsp;!&nbsp;정말&nbsp;감사합니다</p><p>앞으로도&nbsp;밝고&nbsp;예쁜모습&nbsp;많이&nbsp;보여드릴게요(약속)</p><p>그때까지 아프지말고 건강하게 있기!</p><p>사랑해 위즈원❤️❤️</p><p></p> {이미지} <br><p></p>',
  images: ['img/mail/3/20210428/6d5c96191d428d6c236160aa04bbb4d4.jpeg'],
};

export const YURI_MAIL_M25752: RawMailT & MailBodyT & { bodyText: string } = {
  ...rawYuri,
  ...rawYuriBody,
  bodyText: rawYuriBody.body.replace(/<[^>]+>/g, ' ').replaceAll('&nbsp;', ' ').replaceAll('{이미지}', ''),
};

export const TEST_MAIL_2: IndexMail & { bodyText: string } = {
  id: 'm345',
  subject: 'おはよう💕',
  body: '<p>좋은아침😊💕 이침엔 핫초코지👍ㅎ</p> <p>おはよう😊💕 朝ホットチョコレートか👍</p> {이미지}',
  bodyText: '좋은아침😊💕 이침엔 핫초코지👍ㅎ おはよう😊💕 朝ホットチョコレートか👍',
};
