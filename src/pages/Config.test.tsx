import React from 'react';

import Config from './Config';
import { render } from '../components/testUtil';
import { ko } from '../i18n/i18n';

describe('Config', () => {
	it('Config 닉네임_바꾸기, 언어_선택하기, 프로필_바꾸기 이 있다', async () => {
		const { screen } = await render(<Config />);
		screen.getByText(ko.닉네임_바꾸기);
		screen.getByText(new RegExp(ko.언어_선택하기));
		screen.getByText(ko.프로필_바꾸기);
	});
});
