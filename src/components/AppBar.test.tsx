import React from 'react';
import { render } from './testUtil';

import ko from '../i18n/ko.json';
import AppBar from './AppBar';

describe('AppBar', () => {
  it('검색창을 열고 닫을 수 있다.', async () => {
    const { user, screen } = await render(<AppBar />);

    await user.click(screen.getByLabelText(ko.translation.검색));

    await user.type(screen.getByPlaceholderText(ko.translation.검색하기), ' {Backspace}{Escape}');

    await user.click(screen.getByLabelText(ko.translation.검색));
    await user.click(screen.getByLabelText(ko.translation.검색창_닫기));
  });
});
