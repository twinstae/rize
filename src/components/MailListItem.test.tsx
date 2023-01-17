import React from 'react';
import { render } from './testUtil';
import { YURI_MAIL_M25752 } from '../test/fixtures';

import { toMailDetail } from '../router/paths';
import { useFakeNavigation } from '../router/useNavigation';
import MailListItem from './MailListItem';

describe('MailListItem', () => {
  it('MailListItem에는 제목, 별명, 미리보기, 시간이 있다', async () => {
    const { screen } = await render(<MailListItem mail={YURI_MAIL_M25752} />);

    screen.getByText(YURI_MAIL_M25752.subject);
    screen.getByText(YURI_MAIL_M25752.member);
    screen.getByText(/오늘은 평소 보내던 메일과는 조금 다른 메일/i);
    screen.getByText('21/04/28');
    await screen.findByText('율리스트'); // tag_to_mail_dict "율리스트":["m25752"]
    expect(screen.getAllByRole('listitem')[0]).toHaveClass('unread');
  });

  it('MailListItem을 클릭하면 id 에 해당하는 메일 상세 페이지로 이동한다', async () => {
    const { screen, user } = await render(<MailListItem mail={YURI_MAIL_M25752} />);
    const navigation = useFakeNavigation();

    await user.click(screen.getByText(YURI_MAIL_M25752.subject));

    expect(navigation.current()).toBe(toMailDetail(YURI_MAIL_M25752.id));
  });

});
