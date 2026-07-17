import React from 'react';
import { waitFor, screen } from '@testing-library/dom';

import MenuButton from './MenuButton';
import { AppShell } from './LeftDrawer';
import openCloseTest from '../test/openCloseTest';
import { ko } from '../i18n/i18n';

describe('LeftDrawer', () => {
	openCloseTest(
		<AppShell>
			<MenuButton />
		</AppShell>,
		{
			role: 'button',
			closeOpenNames: [new RegExp(ko.메뉴), new RegExp(ko.닫기)],
			keys: ['m', '{Escape}'],
			expectClose: async () => {
				await waitFor(() => {
					expect(screen.getByRole('button', { name: new RegExp(ko.메뉴) })).toBeVisible();
				});
			},
		},
	);
});
