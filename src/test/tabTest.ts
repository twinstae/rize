import React from 'react';
import invariant from '../invariant';
import { test } from 'vitest';
import { runSiheom, given, actions, assertions, query } from './siheom';

type AccessibleName = string | RegExp;

function tabTest(
	element: React.ReactElement,
	{
		setup,
		names,
		expectChecked,
		teardown,
	}: {
		setup?: () => Promise<void>;
		names: AccessibleName[];
		expectChecked?: (params: { name: AccessibleName }) => Promise<void>;
		teardown?: () => Promise<void>;
	},
) {
	test(`${names} tab을 각각 클릭하면 tabContent가 보인다`, async () => {
		invariant(names.length >= 3, '테스트할 이름을 3개 이상 넣어주세요.');

		if (setup) await setup();

		for (const name of names) {
			await runSiheom(
				given.render(element),
				assertions.selected(query.tab(name), false),
				actions.click(query.tab(name)),
				assertions.selected(query.tab(name), true),
			);
			if (expectChecked) await expectChecked({ name });
		}

		const prevTab = names.at(-2)!;
		const lastTab = names.at(-1)!;

		await runSiheom(
			given.render(element),
			actions.click(query.tab(lastTab)),
			actions.keyboard(query.tab(lastTab), '{ArrowRight}'),
			assertions.selected(query.tab(prevTab), true),
		);

		await runSiheom(
			given.render(element),
			actions.click(query.tab(lastTab)),
			actions.keyboard(query.tab(lastTab), '{arrowdown}'),
			assertions.selected(query.tab(lastTab), true),
		);

		if (teardown) await teardown();
	});
}

export default tabTest;
