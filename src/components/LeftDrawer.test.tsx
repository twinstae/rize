import React from 'react';

import MenuButton from './MenuButton';
import LeftDrawler from './LeftDrawer';
import { render } from './testUtil';
import openCloseTest from '../test/openCloseTest';
import { ko } from '../i18n/i18n';

describe('LeftDrawler', () => {
	openCloseTest(<LeftDrawler><MenuButton /></LeftDrawler>,
		{
			role: 'button',
			closeOpenNames: [new RegExp(ko.메뉴), new RegExp(ko.닫기)],
			keys: ['m', '{Escape}'],
			async expectClose({ screen }){
				expect(screen.getByRole('checkbox')).not.toBeChecked();
			},
			async expectOpen({ screen }){
				expect(screen.getByRole('checkbox')).toBeChecked();
			}
		}
	);

	it('LeftDrawler가 열리면 focus lock이 걸린다', async () => {
		const { user, screen } = await render(
			<LeftDrawler>
				<MenuButton />
			</LeftDrawler>,
		);

		const openButton = await screen.findByRole('button', { name: new RegExp(ko.메뉴) });
		await user.click(openButton);
		const settingLink = screen.getByRole('link', { name: ko.설정 });
		settingLink.focus();
		expect(settingLink).toHaveFocus();
		await user.tab();
		const closeButton = screen.getByRole('button', { name: new RegExp(ko.닫기) });
		expect(closeButton).toHaveFocus();
		await user.tab({ shift: true });
		expect(settingLink).toHaveFocus();
		await user.keyboard('{Escape}');
		expect(openButton).toHaveFocus();
	});
});
