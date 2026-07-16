import React from 'react';
import LangConfig from './LangConfig';
import { runSiheom, actions, assertions, given, query } from '../../test/siheom';
import { ko, en } from '../../i18n/i18n';

describe('LangConfig', () => {
	it('LangConfig에서 원하는 언어를 선택하면 언어 설정이 바뀐다', async () => {
		await runSiheom(
			given.render(<LangConfig />),
			assertions.visible(query.combobox(new RegExp(ko.언어)), true),
			actions.select(query.combobox(new RegExp(ko.언어)), 'en'),
			assertions.visible(query.combobox(new RegExp(en.언어)), true),
			actions.select(query.combobox(new RegExp(en.언어)), 'ko'),
			assertions.visible(query.combobox(new RegExp(ko.언어)), true),
		);
	});
});
