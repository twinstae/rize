import React from 'react';
import { render } from './testUtil';
import en from '../i18n/en.json';
import i18n from '../i18n/i18n';
import { RawDarkModeButton } from './DarkModeButton';

describe('DarkModeButton', () => {
	it('DarkModeButton을 클릭하면 밝게에서 다크로 변한다', async () => {
		await i18n.changeLanguage('ko');
		const { user, screen } = await render(<RawDarkModeButton />);

		await user.click(screen.getByRole('button', { name: /밝게/ }));

		await user.click(screen.getByRole('button', { name: /\(d\)/ }));

		await user.keyboard('d');

		await user.click(screen.getByRole('button', { name: /다크/ }));
	});

	it('DarkModeButton을 영어로 번역할 수 있다', async () => {
		await i18n.changeLanguage('en');
		const { user, screen } = await render(<RawDarkModeButton />);

		await user.click(screen.getByRole('button', { name: new RegExp(en.translation.밝게) }));
		await user.click(screen.getByRole('button', { name: new RegExp(en.translation.다크) }));

		screen.getByRole('button', { name: new RegExp(en.translation.밝게) });
	});
});
