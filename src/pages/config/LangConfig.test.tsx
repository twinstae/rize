import React from 'react';

import LangConfig from './LangConfig';
import { render } from '../../components/testUtil';
import { ko, en } from '../../i18n/i18n';

describe('LangConfig', () => {
	it('LangConfig에서 원하는 언어를 선택하면 언어 설정이 바뀐다', async () => {
		const { user, screen } = await render(<LangConfig />);

		const langSelect = screen.getByRole('combobox', {
			name: new RegExp(ko.언어),
		}) as HTMLSelectElement;

		await user.selectOptions(langSelect, 'en');

		expect(await screen.findByLabelText(new RegExp(en.언어))).toBe(langSelect);

		await user.selectOptions(langSelect, 'ko');

		expect(await screen.findByLabelText(new RegExp(ko.언어))).toBe(langSelect);
	});
});
