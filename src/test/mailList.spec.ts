import { test } from 'playwright-test-coverage';
import koJson from '../i18n/ko.json';

const ko = koJson.translation;

test('메일 목록', async ({ page }) => {
	await page.goto('http://127.0.0.1:5173/');
	// 다크모드
	await page.getByRole('button', { name: new RegExp(ko.다크) }).click();
	await page.getByRole('button', { name: new RegExp(ko.밝게) }).click();
	// '멤버 필터'
	await page.getByRole('button', { name: new RegExp(ko.메뉴) }).click();
	await page.getByRole('radio').first().press('Tab');
	await page.getByRole('radio').first().press('Shift+Tab');
	await page.getByRole('button', { name: new RegExp(ko.닫기) }).click();

	// '검색하기'
	await page.getByRole('button', { name: new RegExp(ko.검색) }).click();
	const $searchInput = page.getByRole('searchbox', { name: ko.검색 });
	await $searchInput.click();
	await $searchInput.fill('마ㅈ');
	await $searchInput.fill('마지막이라니');
	await $searchInput.press('Escape');
});
