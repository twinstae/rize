import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import ko from '../i18n/ko.json';
import AppBar from './AppBar';

describe('AppBar', () => {
  it('검색하면 메일 목록이 변한다', async () => {
    render(<AppBar />);

    const searchButton = screen.getByLabelText(ko.translation.검색);
    userEvent.click(searchButton);

    const closeSearchButton = await screen.findByLabelText(ko.translation.검색창_닫기);
    userEvent.click(closeSearchButton);
  });
});
