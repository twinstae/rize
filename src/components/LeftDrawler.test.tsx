import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import ko from '../i18n/ko.json';
import LeftDrawler from './LeftDrawler';

describe('LeftDrawler', () => {
  it('LeftDrawler를 열고 닫을 수 있다', async () => {
    render(<LeftDrawler />);
    
    const openButton = screen.getByLabelText(ko.translation.메뉴);
    userEvent.click(openButton);

    const closeButton = await screen.findByLabelText(ko.translation.닫기);
    userEvent.click(closeButton);
  });
});
