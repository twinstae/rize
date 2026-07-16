import React from 'react';
import { runSiheom, actions, assertions, given, query } from '../../test/siheom';
import NickNameConfig from './NickNameConfig';
import { ko } from '../../i18n/i18n';

describe('NickNameConfig', () => {
	it('닉네임을 바꿀 수 있다', async () => {
		await runSiheom(
			given.render(<NickNameConfig />),
			actions.fill(query.textbox(new RegExp(ko.에서)), '위 즈 원'),
			assertions.value(query.textbox(new RegExp(ko.에서)), '위 즈 원'),
			actions.fill(query.textbox(new RegExp(ko.으로)), 'wiz*one'),
			assertions.value(query.textbox(new RegExp(ko.으로)), 'wiz*one'),
		);
	});
});
