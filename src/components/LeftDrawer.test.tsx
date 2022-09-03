import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import React from 'react';

import ko from '../i18n/ko.json';
import MenuButton from './MenuButton';
import LeftDrawler from './LeftDrawer';
import { debug } from 'jest-preview';

describe('LeftDrawler', () => {
  it('LeftDrawler를 열고 닫을 수 있다', async () => {
    render(
      <LeftDrawler>
        <MenuButton />
      </LeftDrawler>
    );

    const myDrawer = document.getElementById('my-drawer');
    expect(myDrawer).not.toBeChecked();

    const openButton = screen.getByLabelText(ko.translation.메뉴);
    await userEvent.click(openButton);
    expect(myDrawer).toBeChecked();
    
    const closeButton = screen.getByLabelText(ko.translation.닫기);
    await userEvent.click(closeButton);
    expect(myDrawer).not.toBeChecked();
    debug();
  });
});
