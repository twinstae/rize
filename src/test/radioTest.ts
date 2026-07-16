import React from 'react';
import invariant from '../invariant';
import { test } from 'vitest';
import { runSiheom, given, actions, assertions, query } from './siheom';

function toRadioName(name: string): RegExp {
	return new RegExp(name);
}

function radioTest(
	element: React.ReactElement,
	{
		setup,
		names,
		init: _init,
		expectChecked,
		teardown,
	}: {
		setup?: () => Promise<void>;
		names: string[];
		init: string;
		expectChecked?: (params: { name: string }) => Promise<void>;
		teardown?: () => Promise<void>;
	},
) {
	test(`${names} radio를 각각 클릭하면 하나만 선택된다`, async () => {
		invariant(names.length >= 3, '테스트할 이름을 3개 이상 넣어주세요.');

		setup && (await setup());

		await runSiheom(given.render(element));

		for (const name of names) {
			const radioName = toRadioName(name);
			await runSiheom(
				actions.click(query.radio(radioName)),
				assertions.checked(query.radio(radioName), true),
			);
			expectChecked && (await expectChecked({ name }));
		}

		teardown && (await teardown());
	});
}

export default radioTest;
