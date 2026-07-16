import React, { useState } from 'react';
import { runSiheom, actions, assertions, given, query } from '../test/siheom';
import IconButtonWithTooltip from './IconButtonWithTooltip';
import XMarkIcon from './icons/XMarkIcon';

function Story() {
	const [label, setLabel] = useState('테스트 버튼');
	return (
		<IconButtonWithTooltip
			onClick={() => {
				setLabel('클릭됨');
			}}
			icon={<XMarkIcon />}
			ariaLabel={label}
		/>
	);
}

describe('IconButtonWithTooltip', () => {
	it('라벨로 버튼을 찾아서 클릭할 수 있다', async () => {
		await runSiheom(
			given.render(<Story />),
			actions.click(query.button('테스트 버튼')),
			assertions.visible(query.button('클릭됨'), true),
		);
	});
});
