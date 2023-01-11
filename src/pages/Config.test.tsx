import React from 'react';

import ko from '../i18n/ko.json';
import Config from './Config';
import { render } from '../components/testUtil';


describe('Config', () => {
  it('Config 닉네임_바꾸기, 언어_선택하기, 프로필_바꾸기 이 있다', async () => {
    const { screen } = await render(<Config />);
    screen.getByText(ko.translation.닉네임_바꾸기);
    screen.getByText(new RegExp(ko.translation.언어_선택하기));
    screen.getByText(ko.translation.프로필_바꾸기);
  });
});
