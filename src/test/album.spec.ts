import { test } from '@playwright/test';
import koJson from '../i18n/ko.json';

const ko = koJson.translation;

test('앨범', async ({ page }) => {
  await page.goto('http://127.0.0.1:5173/');
  // '앨범 보기'
  await page.getByRole('link', { name: ko.앨범 }).click();
  await page.screenshot({ path: 'playwright/screenshot'+'/album.png' });
  await page.getByRole('button', { name: ko.돌아가기 }).click();
});
