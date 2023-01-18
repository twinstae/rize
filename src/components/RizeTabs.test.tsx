import React from 'react';
import { render } from './testUtil';
import { RizeTabs } from './RizeTabs';
import { waitFor } from '@testing-library/react';
describe('RizeTabs', () => {
	it('RizeTabs를 클릭하면 전환할 수 있다', async () => {
		const MODES = ['all', 'filter'];
		const { user, screen } = await render(
			<RizeTabs
				data={MODES}
				value={(item) => item}
				Label={({ index }) => <span>{MODES[index]} 탭</span>}
				Content={({ index }) => <span>{MODES[index]} 내용</span>}
			/>,
		);

		const allTab = screen.getByRole('tab', { name: 'all 탭' });
		expect(allTab).toHaveAttribute('aria-selected', 'true');

		const filterTab = screen.getByRole('tab', { name: 'filter 탭' });
		await user.click(filterTab);

		expect(filterTab).toHaveAttribute('aria-selected', 'true');
		expect(allTab).toHaveAttribute('aria-selected', 'false');

		await user.keyboard('{ArrowLeft}');
		await waitFor(() => {
			expect(filterTab).toHaveAttribute('aria-selected', 'false');
			expect(allTab).toHaveAttribute('aria-selected', 'true');
		});
	});
});
