import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { toMailDetail } from '../router/paths';
import { useFakeNavigation } from '../router/useNavigation';
import { TEST_MAIL } from '../test/fixtures';
import MailListItem from './MailListItem';

describe('MailListItem', () => {
  it('MailListItem에는 제목, 별명, 미리보기, 시간이 있다', () => {
    render(<MailListItem mail={TEST_MAIL} />);

    screen.getByText(TEST_MAIL.subject);
    screen.getByText('조유리');
    screen.getByText(/오늘은 평소 보내던 메일과는 조금 다른 메일/i);
    screen.getByText(TEST_MAIL.time);
    screen.getByText('율리스트'); // tags
  });

  it('MailListItem을 클릭하면 id 에 해당하는 메일 상세 페이지로 이동한다', async () => {
    render(<MailListItem mail={TEST_MAIL} />);
    const navigation = useFakeNavigation();

    await userEvent.click(screen.getByText(TEST_MAIL.subject));

    expect(navigation.current()).toBe(toMailDetail(TEST_MAIL.id));
    const [searchParams] = navigation.useSearchParams();
    expect(searchParams.get('mailId')).toEqual(TEST_MAIL.id);
    // cleanup
    navigation.goBack();
  });

  it('읽지 않은 메일은 classname에 unread가 달린다', () => {
    render(<MailListItem mail={{ ...TEST_MAIL }} />);

    const mailItem = document.getElementById('mail-' + TEST_MAIL.id);
    expect(mailItem?.classList.contains('unread')).toBe(true);
  });
});
