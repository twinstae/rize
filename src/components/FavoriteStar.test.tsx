import React from 'react';
import FavoriteStar from './FavoriteStar';
import { ko } from '../i18n/i18n';
import { runSiheom, actions, assertions, given, query } from '../test/siheom';

describe('FavoriteStar', () => {
	it('중요_표시 버튼을 클릭하면 중요_취소이 되고, Space key를 누르면 돌아온다', async () => {
		await runSiheom(
			given.render(<FavoriteStar mailId="m25731" />),
			actions.click(query.button(new RegExp(ko.중요_표시))),
			assertions.visible(query.button(new RegExp(ko.중요_취소)), true),
			actions.keyboard(query.button(new RegExp(ko.중요_취소)), '{Space}'),
			assertions.visible(query.button(new RegExp(ko.중요_표시)), true),
		);
	});
});
