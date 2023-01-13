import React from 'react';
import { render } from './testUtil';

import ko from '../i18n/ko.json';
import AppBar from './AppBar';

describe('AppBar', () => {
  it('검색창을 열고 닫을 수 있다.', async () => {
    const { user, screen } = await render(<AppBar />);

    await user.click(screen.getByRole('button', { name: ko.translation.검색 }));

    await user.click(screen.getByLabelText(ko.translation.닫기));

    await user.click(screen.getByRole('button', { name: ko.translation.검색 }));

    await user.type(screen.getByRole('textbox', { name: ko.translation.검색 }), '마라탕{Escape}');
  });
});
