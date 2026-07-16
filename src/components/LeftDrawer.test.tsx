import React from 'react';

import MenuButton from './MenuButton';
import LeftDrawler from './LeftDrawer';
import openCloseTest from '../test/openCloseTest';
import { ko } from '../i18n/i18n';

describe('LeftDrawler', () => {
	openCloseTest(
		<LeftDrawler>
			<MenuButton />
		</LeftDrawler>,
		{
			role: 'button',
			closeOpenNames: [new RegExp(ko.메뉴), new RegExp(ko.닫기)],
			keys: ['m', '{Escape}'],
		},
	);
});
