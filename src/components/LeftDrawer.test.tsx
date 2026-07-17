import React from 'react';

import MenuButton from './MenuButton';
import { AppShell } from './LeftDrawer';
import { ko } from '../i18n/i18n';
import { given, actions, assertions, query, runSiheom } from '../test/siheom';

describe('LeftDrawer', () => {
	it('메뉴 버튼을 누르면 메뉴가 열린다', async () => {
		await runSiheom(
			given.render(
				<AppShell>
					<MenuButton />
				</AppShell>,
			),
			actions.click(query.button(new RegExp(ko.메뉴))),
			assertions.visible(query.button(new RegExp(ko.닫기)), true),
		);
	});
});
