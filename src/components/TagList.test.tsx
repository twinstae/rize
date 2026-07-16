import React from 'react';
import TagList from './TagList';
import { FAVORITE } from '../mailList/mailListModel';
import { runSiheom, assertions, given, query } from '../test/siheom';

describe('TagList', () => {
	it('FAVORITE 태그는 렌더링되지 않는다', async () => {
		await runSiheom(
			given.render(<TagList mailId="m21828" />),
			assertions.visible(query.listitem('놀이동산'), true),
			assertions.visible(query.listitem(FAVORITE), false),
		);
	});
});
