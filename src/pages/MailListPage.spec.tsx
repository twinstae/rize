import { expect, test } from '@playwright/experimental-ct-react';
import React from 'react';

import MailListPage from './MailListPage';

test.use({ viewport: { width: 449, height: 700 } });
test('탭을 누르면 해당하는 아이템이 필터링된다', async ({ mount, browserName }) => {
  const component = await mount(<MailListPage />);


  expect(await component.locator('li').count()).toBe(6);
  const tabFavorite = component.locator('text=중요 2').first();
  await tabFavorite.click();
  expect(await component.locator('li').count()).toBe(8);

  expect(await component.first().screenshot()).toMatchSnapshot(`mail-list-page:favorite:${browserName}.png`);

  const tabUnread = component.locator('text=전체 12').first();
  await tabUnread.click();

  expect(await component.first().screenshot()).toMatchSnapshot(`mail-list-page:all:${browserName}.png`);
});