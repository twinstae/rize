import React from 'react';
import { runSiheom, given, actions, assertions, query } from '../test/siheom';
import { RizeTabs } from './RizeTabs';

describe('RizeTabs', () => {
	it('RizeTabs를 클릭하면 전환할 수 있다', async () => {
		const MODES = ['all', 'filter'];
		await runSiheom(
			given.render(
				<RizeTabs
					data={MODES}
					value={(item) => item}
					Label={({ index }) => <span>{MODES[index]} 탭</span>}
					Content={({ index }) => <span>{MODES[index]} 내용</span>}
				/>,
			),
			assertions.selected(query.tab(/all 탭/), true),
			actions.click(query.tab(/filter 탭/)),
			assertions.selected(query.tab(/filter 탭/), true),
			assertions.selected(query.tab(/all 탭/), false),
			actions.keyboard(query.tab(/filter 탭/), '{ArrowLeft}'),
			assertions.selected(query.tab(/all 탭/), true),
			assertions.selected(query.tab(/filter 탭/), false),
		);
	});
});
