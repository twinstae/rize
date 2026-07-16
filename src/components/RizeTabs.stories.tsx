import type { Meta, StoryObj } from '@storybook/react-vite';
import { RizeTabs } from './RizeTabs';
import { Text } from './rize-ui-web';

const TAB_DATA = ['전체', '즐겨찾기', '안읽음'] as const;

const meta = {
	title: 'Components/RizeTabs',
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Default: Story = {
	render: () => (
		<RizeTabs
			data={TAB_DATA}
			value={(item) => item}
			Label={({ index }) => <span>{TAB_DATA[index]}</span>}
			Content={({ index }) => (
				<Text className="p-4">{TAB_DATA[index]} 탭 내용</Text>
			)}
		/>
	),
};
