

import React from 'react';

import ko from '../i18n/ko.json';
import MenuButton from './MenuButton';
import LeftDrawler from './LeftDrawer';
import { debug } from 'jest-preview';
import { render } from './testUtil';

describe('LeftDrawler', () => {
  it('LeftDrawler를 열고 닫을 수 있다', async () => {
    const { user, screen } = await render(
      <LeftDrawler>
        <MenuButton />
      </LeftDrawler>
    );

    const openButton = screen.getByLabelText(ko.translation.메뉴);
    await user.click(openButton);
    
    const closeButton = screen.getByLabelText(ko.translation.닫기);
    await user.click(closeButton);
    debug();
  });
});
