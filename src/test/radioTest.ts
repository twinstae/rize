import React from 'react';
import { render } from '../components/testUtil';
import invariant from '../invariant';
import type { Screen } from '@testing-library/react';
type Matcher = | RegExp
| string
| ((accessibleName: string, element: Element) => boolean);

function radioTest<M extends Matcher>(
	element: React.ReactElement,
	{ setup, names, expectChecked, teardown }: {
		setup?: () => Promise<void>,
		names: Array<M>,
		init: M,
		expectChecked?: (params: {name: M, screen: Screen }) => void,
		teardown?: () => Promise<void>,
	},
) {
	test(`${names} radio를 각각 클릭하면 하나만 선택된다`, async () => {
		invariant(names.length >= 3, '테스트할 이름을 3개 이상 넣어주세요.');

		setup && await setup();
		const { user, screen } = await render(element);
		
		for (const name of names) {
			const target = screen.getByRole('radio', { name });
			await user.click(target);

			expect(target).toBeChecked();
			expectChecked && expectChecked({ name, screen });
		}

		// tip: 위쪽 방향키를 눌러도 이전 요소가 체크
		await user.keyboard('{ArrowUp}');
		expect(screen.getByRole('radio', { name: names.at(-2) })).toBeChecked();
		// tip: 아래 방향키를 눌러도 다음 요소가 체크
		await user.keyboard('{ArrowDown}');
		expect(screen.getByRole('radio', { name: names.at(-1) })).toBeChecked();
		// tip: 마지막에서는 처음 요소로 이동
		await user.keyboard('{ArrowRight}');
		expect(screen.getByRole('radio', { name: names.at(0) })).toBeChecked();
		// tip: 처음이면 마지막 요소로 이동
		await user.keyboard('{ArrowLeft}');
		expect(screen.getByRole('radio', { name: names.at(-1) })).toBeChecked();

		teardown && await teardown();
	});
}

export default radioTest;