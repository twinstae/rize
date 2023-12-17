import React from 'react';
import { render } from '../components/testUtil';
import invariant from '../invariant';
import { test, expect } from 'vitest';
import type { Screen } from '@testing-library/react';
type Matcher = | RegExp
| string
| ((accessibleName: string, element: Element) => boolean);

function radioTest<M extends Matcher>(
	element: React.ReactElement,
	{ setup, names, expectChecked, teardown }: {
		setup?: () => Promise<void>,
		names: Array<M>,
		expectChecked?: (params: { name: M, screen: Screen }) => void,
		teardown?: () => Promise<void>,
	},
) {
	test(`${names} tab을 각각 클릭하면 tabContent가 보인다`, async () => {
		invariant(names.length >= 3, '테스트할 이름을 3개 이상 넣어주세요.');

		setup && await setup();
		const { user, screen } = await render(element);
		
		for (const name of names) {
			const target = screen.getByRole('tab', { name });
			expect(target).not.toBeChecked();

			await user.click(target);

			expect(target).toBeChecked();
			expectChecked && expectChecked({ name, screen });
		}

		// tip: 마지막에서 우측 방향키를 누르면 다음 탭이 체크
		await user.keyboard('{ArrowRight}');
		expect(screen.getByRole('tab', { name: names.at(-2) })).toBeChecked();
		// tip: 아래 방향키를 눌러도 다음 요소가 체크
		await user.keyboard('{arrowdown}');
		expect(screen.getByRole('tab', { name: names.at(-1) })).toBeChecked();

		teardown && await teardown();
	});
}

export default radioTest;