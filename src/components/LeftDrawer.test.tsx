import React from 'react';

import MenuButton from './MenuButton';
import LeftDrawler from './LeftDrawer';
import { render } from './testUtil';
import toggleTest from '../test/toggleTest';
import { ko } from '../i18n/i18n';

describe('LeftDrawler', () => {
	toggleTest(<LeftDrawler><MenuButton /></LeftDrawler>,
		{
			role: 'button',
			offOnNames: [ko.메뉴, ko.닫기],
			key: '{Space}',
			async expectOff({ screen }){
				expect(screen.getByRole('checkbox')).not.toBeChecked();
			},
			async expectOn({ screen }){
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

		const openButton = await screen.findByLabelText(ko.메뉴);
		openButton.focus();
		await user.keyboard('{Enter}');
		const closeButton = screen.getByLabelText(ko.닫기);
		screen.getByRole('link', { name: ko.설정 }).focus();
		await user.tab();
		expect(closeButton).toHaveFocus();
		openButton.focus();
		await user.tab();
		expect(closeButton).toHaveFocus();
		closeButton.blur();
		expect(closeButton).not.toHaveFocus();
		await user.tab();
		expect(closeButton).toHaveFocus();
		await user.keyboard('{Escape}');
		expect(openButton).toHaveFocus();

		await user.tab();
		await user.tab({ shift: true });
		expect(openButton).toHaveFocus();
	});
});
