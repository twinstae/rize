import React from 'react';
import VirtualList from './VirtualStack';
import { render } from './testUtil';
import { rem } from '../theme/rem';
import { act, fireEvent, waitFor } from '@testing-library/react';
import ResizeObserver from 'resize-observer-polyfill';

global.ResizeObserver = ResizeObserver;

describe('VirtualList', () => {
	test('should render given dynamic size after scroll', async () => {
		const DATA = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
		const { screen } = await render(
			<VirtualList
				result={DATA}
				width={window.innerWidth}
				height={rem(5) * 1}
				estimateSize={() => rem(5)}
				VirtualRowItem={({ virtualItem }) => <li>Row {DATA[virtualItem.index]}</li>}
				fallback={undefined}
			/>,
		);

		expect(screen.queryByText('Row 0')).toBeInTheDocument();
		expect(screen.queryByText('Row 1')).toBeInTheDocument();
		expect(screen.queryByText('Row 2')).toBeInTheDocument();
		expect(screen.queryByText('Row 3')).not.toBeInTheDocument();

		const container = screen.getByRole('list').parentElement as HTMLDivElement;
		act(() => {
			fireEvent.scroll(container, {
				target: { scrollTop: rem(6) * 5 },
			});
		});

		await waitFor(() => {
			expect(screen.queryByText('Row 3')).not.toBeInTheDocument();
			expect(screen.queryByText('Row 4')).toBeInTheDocument();
			expect(screen.queryByText('Row 8')).toBeInTheDocument();
			expect(screen.queryByText('Row 9')).not.toBeInTheDocument();
		});
	});
});
