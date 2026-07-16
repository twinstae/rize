import { test, expect } from 'vitest';
import { runSiheom, given, actions, query } from '../test/siheom';
import type { Locator } from '@siheom/core';
import { useFakeNavigation } from './useFakeNavigation';
import React from 'react';

function linkTarget(name: string | RegExp, role: 'link' | 'button' | 'label'): Locator {
	if (role === 'label') {
		return query.label(name);
	}
	return role === 'link' ? query.link(name) : query.button(name);
}

function linkTest(
	element: React.ReactElement,
	{
		setup,
		name,
		role = 'link',
		given: givenPath,
		expected,
		key,
		teardown,
	}: {
		setup?: () => Promise<void>;
		name: string | RegExp;
		role?: 'link' | 'button' | 'label';
		given: string;
		expected: string;
		key: string;
		teardown?: () => Promise<void>;
	},
) {
	const target = linkTarget(name, role);

	test(`${givenPath}에서 ${name} ${role} 클릭하면 ${expected}로 이동한다`, async () => {
		if (setup) await setup();
		const navigation = useFakeNavigation();
		navigation.clear();
		navigation.navigate(givenPath);
		expect(navigation.current()).toBe(givenPath);

		await runSiheom(given.render(element), actions.click(target));

		expect(navigation.current()).toBe(expected);

		navigation.navigate(givenPath);

		await runSiheom(actions.click(target), actions.keyboard(target, key));

		expect(navigation.current()).toBe(expected);

		if (teardown) await teardown();
	});
}

export default linkTest;
