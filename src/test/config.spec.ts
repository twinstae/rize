import { test } from 'playwright-test-coverage';
import koJson from '../i18n/ko.json';

const ko = koJson.translation;

test('설정 페이지', async ({ page }) => {
  await page.goto('http://127.0.0.1:5173/');
  await page.getByRole('button', { name: ko.메뉴 }).click();
  await page.getByRole('link', { name: ko.설정 }).click();

  // '이름 바꾸기'
  const $toInput = page.getByLabel(ko.으로);
  await $toInput.click();
  await $toInput.fill('위즈');
  await $toInput.fill('위즈원');

  // '언어 바꾸기'
  await page.getByRole('combobox', { name: ko.언어 }).selectOption('en');
  await page.getByRole('combobox', { name: 'Languages' }).selectOption('ko');

  // '프로필 선택'
  await page.getByLabel('la-vie-en-rose').check();
  await page.getByLabel('instagram').check();

  await page.getByText('테스트 페이지 (개발자용)').click();  
  await page.getByRole('button', { name: '에러 일으키기' }).click();
  await page.getByRole('button', { name: '앱 다시 시작하기' }).click();
});
