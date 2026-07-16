import type { Meta, StoryObj } from '@storybook/react-vite';
import TagList from './TagList';

const meta = {
	title: 'Components/TagList',
	component: TagList,
	args: {
		mailId: 'm25752',
	},
} satisfies Meta<typeof TagList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
