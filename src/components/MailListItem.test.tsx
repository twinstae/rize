import { fireEvent, render, screen } from '@testing-library/react';
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
    screen.getByText(TEST_MAIL.preview);
    screen.getByText(TEST_MAIL.time);
  });

  it('MailListItem을 클릭하면 id 에 해당하는 메일 상세 페이지로 이동한다', () => {
    render(<MailListItem mail={TEST_MAIL}/>);
    const navigation = useFakeNavigation();
    fireEvent.click(screen.getByText(TEST_MAIL.subject));

    expect(navigation.current()).toBe(toMailDetail(TEST_MAIL.id));

    // cleanup
    navigation.goBack();
  });
});
