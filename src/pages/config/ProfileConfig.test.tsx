import React from 'react';
import { runSiheom, actions, assertions, given, query } from '../../test/siheom';
import ProfileConfig from './ProfileConfig';
import { ko } from '../../i18n/i18n';

describe('ProfileConfig', () => {
	it('ProfileConfig 원하는 프로필을 선택하면 프로필이 바뀐다', async () => {
		await runSiheom(
			given.render(<ProfileConfig />),
			assertions.visible(query.heading(ko.프로필_바꾸기), true),
			actions.click(query.radio(/violeta/)),
			assertions.visible(query.radio(/violeta/), true),
		);
	});
});
