import { render, screen } from '@testing-library/react';
import React from 'react';

import ko from '../i18n/ko.json';
import MailDetailPage from './MailDetailPage';


describe('MailDetailPage', () => {
  it('MailDetailPage 제목, 별명, 미리보기, 시간이 있다', async () => {
    // params { mailId: 'm25669' } from useFakeNavigation
    // {
    //   "id": "m25669",
    //   "member": "장원영",
    //   "subject": "우리 위즈원💛",
    //   "preview": "위즈원!! 그리고 {_nickname_}!! 그동안 정말 정말 고마웠어ㅎㅎ 2년 반이라는 시간동안 {_nickname_}한테 배운것도, 느낀것도, 고마운것도 너무 많아서 {_nic",
    //   "time": "2021-04-28 23:00"
    // }
    // "images": ["img/mail/1/20210428/5e8a460718a30b23fdefe53dab01309f.jpeg"]

    render(<MailDetailPage />);
    screen.getByText(/로딩중/);

    await screen.findAllByLabelText(ko.translation.돌아가기);
    screen.getByLabelText('중요 표시하기');

    screen.getByText('장원영');

    screen.getByText(/그동안 정말 정말 고마웠어ㅎㅎ/);

    // mail image
    screen.getByAltText('img/mail/1/20210428/5e8a460718a30b23fdefe53dab01309f.jpeg');
  });
});
