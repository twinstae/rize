import React from 'react';
import { render } from './testUtil';

import ko from '../i18n/ko.json';
import AppBar from './AppBar';

describe('AppBar', () => {
  it('검색하면 메일 목록이 변한다', async () => {
    const { user, screen } = await render(<AppBar />);

    const searchButton = screen.getByLabelText(ko.translation.검색);
    user.click(searchButton);

    const closeSearchButton = await screen.findByLabelText(ko.translation.닫기);
    user.click(closeSearchButton);
  });
});
