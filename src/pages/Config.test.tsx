import React from 'react';
import Config from './Config';
import { runSiheom, assertions, given, query } from '../test/siheom';
import { ko } from '../i18n/i18n';

describe('Config', () => {
	it('Config 닉네임_바꾸기, 언어_선택하기, 프로필_바꾸기 이 있다', async () => {
		await runSiheom(
			given.render(<Config />),
			assertions.visible(query.heading(ko.닉네임_바꾸기), true),
			assertions.visible(query.heading(new RegExp(ko.언어_선택하기)), true),
			assertions.visible(query.heading(ko.프로필_바꾸기), true),
		);
	});
});
