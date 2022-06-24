import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import ko from '../../i18n/ko.json';
import NickNameConfig from './NickNameConfig';
const renderComponent = () => {
  return render(<NickNameConfig />);
};

describe('NickNameConfig', () => {

  it('닉네임을 바꿀 수 있다', async () => {
    renderComponent();

    const beforeInput = screen.getByLabelText(ko.translation.에서);

    userEvent.clear(beforeInput);
    userEvent.type(beforeInput, '위 즈 원');
    await screen.findByText(/안녕 위 즈 원, 오늘도 화이팅!/);

    const afterInput = screen.getByLabelText(ko.translation.으로);
    userEvent.clear(afterInput);
    userEvent.type(afterInput, 'wiz*one');
    await screen.findByText(/안녕 wiz\*one, 오늘도 화이팅!/);
  });
});
