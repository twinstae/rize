import React from 'react';
import AppBar from './AppBar';
import { ko } from '../i18n/i18n';
import openCloseTest from '../test/openCloseTest';
describe('AppBar', () => {
	openCloseTest(<AppBar />,
		{
			role: 'button',
			closeOpenNames: [new RegExp(ko.검색), new RegExp(ko.검색창_닫기)],
			keys: ['/', '{Escape}']
		}
	);
});
