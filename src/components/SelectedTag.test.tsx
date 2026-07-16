import React from 'react';

import useTag from '../mailList/useTag';
import SelectedTag from './SelectedTag';
import { runSiheom, given, actions, assertions, query } from '../test/siheom';

describe('SelectedTag', () => {
	const Story = ({ tag }: { tag: string }) => {
		const [, selectTag] = useTag();
		return (
			<>
				<button onClick={() => selectTag(() => tag)}>선택</button> <SelectedTag />
			</>
		);
	};

	it('선택된 태그가 없으면 전체가 나온다', async () => {
		await runSiheom(
			given.render(<Story tag="" />),
			actions.click(query.button('선택')),
			assertions.visible(query.text('전체'), true),
		);
	});

	it('일반 태그는 프로필이 없다', async () => {
		await runSiheom(
			given.render(<Story tag="놀이동산" />),
			actions.click(query.button('선택')),
			assertions.visible(query.text('놀이동산'), true),
		);
	});

	it('멤버 태그는 프로필이 있다', async () => {
		await runSiheom(
			given.render(<Story tag="권은비" />),
			actions.click(query.button('선택')),
			assertions.visible(query.img(/권은비/), true),
			assertions.visible(query.text('권은비'), true),
		);
	});
});
