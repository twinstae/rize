import React from 'react';

import ko from '../i18n/ko.json';
import MenuButton from './MenuButton';
import LeftDrawler from './LeftDrawer';
import { render } from './testUtil';

describe('LeftDrawler', () => {
	it('LeftDrawler를 열고 닫을 수 있다', async () => {
		const { user, screen } = await render(
			<LeftDrawler>
				<MenuButton />
			</LeftDrawler>,
		);

		const openButton = screen.getByLabelText(ko.translation.메뉴);
		await user.click(openButton);
		openButton.focus();
		await user.keyboard('{Enter}');
		const closeButton = screen.getByLabelText(ko.translation.닫기);
		await user.click(closeButton);
		const checkbox = screen.getByLabelText('close drawer') as HTMLInputElement;
		expect(checkbox.checked).toBe(false);
		await user.click(checkbox);
		expect(checkbox.checked).toBe(true);
		await user.click(checkbox);
		expect(checkbox.checked).toBe(false);
	});

	it('LeftDrawler가 열리면 focus lock이 걸린다', async () => {
		const { user, screen } = await render(
			<LeftDrawler>
				<MenuButton />
			</LeftDrawler>,
		);

		const openButton = await screen.findByLabelText(ko.translation.메뉴);
		openButton.focus();
		await user.keyboard('{Enter}');
		const closeButton = screen.getByLabelText(ko.translation.닫기);
		screen.getByRole('link', { name: ko.translation.설정 }).focus();
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
