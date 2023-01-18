import paths from './paths';
import { useFakeNavigation } from './useNavigation';

describe('useNavigation 계약', () => {
	const navigation = useFakeNavigation();
	it('navigate하면 이동한다.', () => {
		navigation.navigate(paths.MAIL_LIST);
		expect(navigation.current()).toBe(paths.MAIL_LIST);
		expect(navigation.params()).toEqual({});
	});

	it('redirect하면 현재 history를 변경한다', () => {
		navigation.redirect(paths.CONFIG);
		expect(navigation.current()).toBe(paths.CONFIG);
	});

	it('goBack을 하면 한 번 뒤로 돌아간다', () => {
		navigation.navigate(paths.MAIL_LIST);
		navigation.goBack();
		navigation.goBack();
		// ["/"]
		expect(navigation.current()).toBe(paths.ROOT);
	});
});
