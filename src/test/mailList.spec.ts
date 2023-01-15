import { test } from 'playwright-test-coverage';
import koJson from '../i18n/ko.json';

const ko = koJson.translation;

test('메일 목록', async ({ page }) => {
  await page.goto('http://127.0.0.1:5173/');
  // 다크모드
  await page.getByRole('button', { name: ko.밝게 + '(ctrl+d)' }).click();
  await page.screenshot({ path: 'playwright/screenshot'+'/dark.png' });
  await page.getByRole('button', { name: ko.다크 + '(ctrl+d)' }).click();
  await page.screenshot({ path: 'playwright/screenshot'+'/light.png' });
  // '멤버 필터'
  await page.getByRole('button', { name: ko.메뉴 }).click();
  await page.getByRole('button', { name: '장원영' }).click();
  await page.screenshot({ path: 'playwright/screenshot'+'/filter.png' });
  await page.getByRole('button', { name: ko.전체 }).click();
  await page.getByRole('button', { name: ko.닫기 }).click();

  // '검색하기'
  await page.getByRole('button', { name: ko.검색 }).click();
  const $searchInput = page.getByPlaceholder(ko.검색하기);
  await $searchInput.click();
  await $searchInput.fill('마ㅈ');
  await page.screenshot({ path: 'playwright/screenshot'+'/search-partial.png' });
  await $searchInput.fill('마지막이라니');
  await $searchInput.press('Escape');
  await page.getByRole('button', { name: ko.검색 }).click();
  await page.getByRole('button', { name: ko.검색창_닫기 }).click();
});