import React from 'react';

import ko from '../../i18n/ko.json';
import { render } from '../../components/testUtil';
import NickNameConfig from './NickNameConfig';


describe('NickNameConfig', () => {

  it('닉네임을 바꿀 수 있다', async () => {
    const { user, screen } = await render(<NickNameConfig />);

    const beforeInput = screen.getByLabelText(ko.translation.에서);

    await user.clear(beforeInput);
    await user.type(beforeInput, '위 즈 원');
    await screen.findByText(/안녕 위 즈 원, 오늘도 화이팅!/);

    const afterInput = screen.getByLabelText(ko.translation.으로);
    await user.clear(afterInput);
    await user.type(afterInput, 'wiz*one');
    await screen.findByText(/안녕 wiz\*one, 오늘도 화이팅!/);
  });
});
