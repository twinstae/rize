import React from 'react';
import i18n, { en, ko } from '../i18n/i18n';
import { RawDarkModeButton } from './DarkModeButton';
import toggleTest from 'src/test/toggleTest';

describe('DarkModeButton', () => {

	toggleTest(<RawDarkModeButton />, {
		async setup(){
			await i18n.changeLanguage('ko');
		},
		role: 'button',
		offOnNames: [new RegExp(ko.밝게), new RegExp(ko.다크)],
		key: 'd',
	});
	
	toggleTest(<RawDarkModeButton />, {
		async setup(){
			await i18n.changeLanguage('en');
		},
		role: 'button',
		offOnNames: [new RegExp(en.밝게), new RegExp(en.다크)],
		key: 'd',
	});
});
