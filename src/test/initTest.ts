import koJson from '../i18n/ko.json';
import paths from '../router/paths';
import type { JsonValue } from '../types/json';
import type { Navigation } from '../router/useNavigation';
import invariant from '../invariant';
import { atom } from 'nanostores';
import scopedUser from './scopedUser';

const ko = koJson.translation;

const oldError = console.error;
type RunT = (dep: { navigation: Navigation }) => Promise<void>;
type SuiteT = [string, RunT];
const tests: SuiteT[] = [];
export type ResultT =
	| {
			pass: true;
			message: string;
		}
	| {
			pass: false;
			message: string;
			stack: string;
		};

async function wait(delay: number) {
	return new Promise((resolve) => setTimeout(resolve, delay));
}

const rize: {
	test: (message: string, run: RunT) => void;
} = {
	test(message, run) {
		tests.push([message, run]);
	},
};

function getPageByPath(path: string) {
	const pageElement = document.getElementsByClassName(path)[0];
	invariant(pageElement instanceof HTMLElement);
	return scopedUser(pageElement);
}

rize.test('별명을 바꿀 수 있다', async () => {
	await getPageByPath(paths.TEST)('button', ko.돌아가기).click();
	await wait(1000);
	const page2 = getPageByPath(paths.CONFIG);
	const $toInput = page2('textbox', ko.으로);
	await $toInput.clear();
	await $toInput.type('위즈');
	await $toInput.clear();
	await $toInput.type('위즈원');
});

// '언어 바꾸기'
rize.test('프로필을 바꿀 수 있다', async () => {
	const page = getPageByPath(paths.CONFIG);
	await page('radio', 'latest').click();
	await page('radio', 'violeta').click();
	await page('radio', 'instagram').click();

	await page('button', ko.돌아가기).click();
	await wait(1000);
});

rize.test('멤버로 필터할 수 있다', async () => {
	const page = getPageByPath(paths.MAIL_LIST);
	await page('button', ko.메뉴).click();
	await page('button', '장원영').click();
	await page('button', ko.전체).click();
	await page('button', ko.닫기).click();
	await wait(1000);
});

rize.test('테마를 바꿀 수 있다', async () => {
	const page = getPageByPath(paths.MAIL_LIST);
	await page('button', ko.밝게 + ' (ctrl+d)').click();
	await page('button', ko.다크 + ' (ctrl+d)').click();
});

rize.test('메일을 검색할 수 있다.', async () => {
	const page = getPageByPath(paths.MAIL_LIST);
	await page('button', ko.검색).click();
	const $searchInput = page('textbox', ko.검색);
	await $searchInput.click();
	await $searchInput.type('tw');
	await $searchInput.type('itter');
	await $searchInput.clear();
	await $searchInput.type('{Escape}');
	await page('button', ko.검색).click();
	await page('button', ko.검색창_닫기).click();
});

rize.test('메일을 좋아요 할 수 있다.', async () => {
	const page = getPageByPath(paths.MAIL_LIST);
	await page('listitem', /사랑하는 위즈원에게/).to('button', '중요 표시').click();
	await page('listitem', /사랑하는 위즈원에게/).to('button', '중요 취소').click();
});

rize.test('메일을 볼 수 있다', async () => {
	const page = getPageByPath(paths.MAIL_LIST);
	await page('heading', /사랑하는 위즈원에게/).click();
	await wait(1000);
	const page2 = getPageByPath(paths.MAIL_DETAIL);
	const nextMailButton = page2('link', '다음 메일 보기');
	await nextMailButton.scrollIntoView();
	await nextMailButton.click();
	await wait(1000);
	const page3 = getPageByPath(paths.MAIL_DETAIL);
	await page3('button', ko.돌아가기).click();
});

rize.test('앨범을 볼 수 있다', async () => {
	const page2 = getPageByPath(paths.MAIL_LIST);
	await page2('link', ko.앨범).click();
	await wait(1000);
	const page3 = getPageByPath(paths.ALBUM);
	await page3('button', ko.돌아가기).click();
	await wait(1000);
});

rize.test('탭을 바꿀 수 있다.', async () => {
	const page2 = getPageByPath(paths.MAIL_LIST);
	await page2('tab', /읽지 않음/).click();
	await page2('tab', /중요/).click();
	await page2('tab', /전체/).click();
});

export const testResultAtom = atom<ResultT[]>([]);

async function initTest({
	navigation,
	writeJSONfile,
}: {
	navigation: Navigation;
	writeJSONfile: (path: string) => (dict: JsonValue) => Promise<void>;
}) {
	invariant(navigation.current() === paths.TEST);
	invariant(JSON.stringify(navigation.params()) === '{}');
	console.error = (...args) => {
		if (args[0].includes('Warning: ReactDOM.render is no longer supported in React 18')) {
			return;
		}
		if (args[0].includes('should be wrapped into act')) {
			return;
		}

		oldError(args[0]);
	};

	testResultAtom.set([]);

	try {
		for (const [message, test] of tests) {
			await test({ navigation })
				.then(() => {
					testResultAtom.set([
						...testResultAtom.get(),
						{
							pass: true,
							message,
						},
					]);
					console.log('pass', message);
				})
				.catch((error) => {
					console.error(error.stack);
					testResultAtom.set([
						...testResultAtom.get(),
						{
							pass: false,
							message,
							stack: error.message + error.stack,
						},
					]);
				});
		}
	} finally {
		navigation.navigate(paths.TEST);
		const result = testResultAtom.get();
		writeJSONfile('test_result.json')(result);
		console.log('collect test result!');
		console.log('result', result);
		if (window.__coverage__) {
			writeJSONfile('coverage.json')(window.__coverage__);
			console.log('collect coverage!');
		}
	}
}

export default initTest;
