import React from 'react';
import { render } from './testUtil';
import IconButtonWithTooltip from './IconButtonWithTooltip';
import XMarkIcon from './icons/XMarkIcon';

describe('IconButtonWithTooltip', () => {
	it('라벨로 버튼을 찾아서 클릭할 수 있다', async () => {
		let done = false;
		const { screen, user } = await render(
			<IconButtonWithTooltip
				onClick={() => {
					done = true;
				}}
				icon={<XMarkIcon />}
				ariaLabel="테스트 버튼"
			/>,
		);

		await user.click(screen.getByRole('button', { name: '테스트 버튼' }));

		expect(done).toBe(true);
	});
});
