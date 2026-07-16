import { test } from 'vitest';
import type { ByRoleMatcher } from '@testing-library/dom';
import React from 'react';
import { runSiheom, given, actions, assertions, query } from './siheom';

type AccessibleName = string | RegExp;

function openCloseTest(
	element: React.ReactElement,
	{
		setup,
		role: _role,
		closeOpenNames: [closeName, openName],
		keys: [openKey, closeKey],
		expectClose,
		expectOpen,
		teardown,
	}: {
		setup?: () => Promise<void>;
		role: ByRoleMatcher;
		closeOpenNames: [AccessibleName, AccessibleName];
		keys: [string, string];
		expectClose?: () => Promise<void>;
		expectOpen?: () => Promise<void>;
		teardown?: () => Promise<void>;
	},
) {
	test(`${closeName}을 클릭하면 열리고, ${closeKey}을 누르면 닫히고, ${openKey}을 누르면 열리고 ${openName}을 클릭하면 닫힌다`, async () => {
		setup && (await setup());

		await runSiheom(
			given.render(element),
			actions.click(query.button(closeName)),
			assertions.visible(query.button(openName), true),
		);
		expectOpen && (await expectOpen());

		await runSiheom(
			actions.keyboard(query.button(openName), closeKey),
			assertions.visible(query.button(closeName), true),
		);
		expectClose && (await expectClose());

		await runSiheom(actions.click(query.button(closeName)), assertions.visible(query.button(openName), true));
		expectOpen && (await expectOpen());

		await runSiheom(actions.click(query.button(openName)), assertions.visible(query.button(closeName), true));
		expectClose && (await expectClose());

		teardown && (await teardown());
	});
}

export default openCloseTest;
