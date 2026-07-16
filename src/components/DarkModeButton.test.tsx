import React from 'react';
import i18n, { en, ko } from '../i18n/i18n';
import { RawDarkModeButton } from './DarkModeButton';
import { runSiheom, actions, assertions, given, query } from '../test/siheom';

describe('DarkModeButton', () => {
	it('다크 버튼을 클릭하면 밝게이 되고, d key를 누르면 돌아온다 (Korean)', async () => {
		await i18n.changeLanguage('ko');
		await runSiheom(
			given.render(<RawDarkModeButton />),
			actions.click(query.button(new RegExp(ko.다크))),
			assertions.visible(query.button(new RegExp(ko.밝게)), true),
			actions.keyboard(query.button(new RegExp(ko.밝게)), 'd'),
			assertions.visible(query.button(new RegExp(ko.다크)), true),
		);
	});

	it('다크 버튼을 클릭하면 밝게이 되고, d key를 누르면 돌아온다 (English)', async () => {
		await i18n.changeLanguage('en');
		await runSiheom(
			given.render(<RawDarkModeButton />),
			actions.click(query.button(new RegExp(en.다크))),
			assertions.visible(query.button(new RegExp(en.밝게)), true),
			actions.keyboard(query.button(new RegExp(en.밝게)), 'd'),
			assertions.visible(query.button(new RegExp(en.다크)), true),
		);
	});
});
