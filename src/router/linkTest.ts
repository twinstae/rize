import { render } from '../components/testUtil';
import { useFakeNavigation } from './useNavigation';

function linkTest(
	element: React.ReactElement,
	{ setup, name, given, expected, key, teardown }: {
		setup?: () => Promise<void>,
		name: string | RegExp,
		given: string,
		expected: string,
		key: string,
		teardown?: () => Promise<void>,
	},
) {
	test(`${given}에서 ${name} link 클릭하면 ${expected}로 이동한다`, async () => {
		setup && await setup();
		const navigation = useFakeNavigation();
		navigation.navigate(given);
		expect(navigation.current()).toBe(given);

		const { user, screen } = await render(element);

		// tip: link가 맞는지, 접근 가능한 이름이 있는지 확인합니다.
		await user.click(screen.getByRole('link', { name: name }));
		// tip: 링크 컴포넌트가 올바른지 확인합니다.
		expect(navigation.current()).toBe(expected);
		
		navigation.navigate(given);

		const link = screen.getByRole('link', { name: name });
		expect(link).toHaveFocus();
		await user.keyboard(key);
		// tip: keyboard로 이동할 수 있는지 확인합니다.
		expect(navigation.current()).toBe(expected);

		teardown && await teardown();
	});
}

export default linkTest;