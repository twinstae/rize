import type { Meta, StoryObj } from '@storybook/react-vite';
import MemberList from './MemberList';

const meta = {
	title: 'Components/MemberList',
	component: MemberList,
} satisfies Meta<typeof MemberList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
