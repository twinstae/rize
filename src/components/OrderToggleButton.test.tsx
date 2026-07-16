import React from 'react';
import { ko } from '../i18n/i18n';
import OrderToggleButton from './OrderToggleButton';
import { runSiheom, actions, assertions, given, query } from '../test/siheom';

describe('OrderToggleButton', () => {
	it('최신순 버튼을 클릭하면 오랜순이 되고, o key를 누르면 돌아온다', async () => {
		await runSiheom(
			given.render(<OrderToggleButton />),
			actions.click(query.button(ko.최신순)),
			assertions.visible(query.button(ko.오랜순), true),
			actions.keyboard(query.button(ko.오랜순), 'o'),
			assertions.visible(query.button(ko.최신순), true),
		);
	});
});
