import type { Meta, StoryObj } from '@storybook/react-vite';
import VirtualList from './VirtualStack';
import { rem } from '../theme/rem';

const DATA = Array.from({ length: 20 }, (_, i) => `Row ${i}`);

const meta = {
	title: 'Components/VirtualStack',
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Default: Story = {
	render: () => (
		<VirtualList
			result={DATA}
			width={400}
			height={rem(5) * 3}
			estimateSize={() => rem(5)}
			VirtualRowItem={({ virtualItem, style }) => (
				<li style={style} className="border-b p-2">
					{DATA[virtualItem.index]}
				</li>
			)}
			fallback={<span>No items</span>}
		/>
	),
};

export const Empty: Story = {
	render: () => (
		<VirtualList
			result={[]}
			width={400}
			height={rem(5) * 3}
			estimateSize={() => rem(5)}
			VirtualRowItem={() => null}
			fallback={<span>검색결과가 없습니다</span>}
		/>
	),
};
