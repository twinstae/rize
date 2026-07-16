import type { Meta, StoryObj } from '@storybook/react-vite';
import ProfileImage from './ProfileImage';

const meta = {
	title: 'Components/ProfileImage',
	component: ProfileImage,
} satisfies Meta<typeof ProfileImage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllMembers: Story = {
	args: {
		member: '',
		size: 'md',
	},
};

export const Member: Story = {
	args: {
		member: '조유리',
		size: 'base',
	},
};

export const Small: Story = {
	args: {
		member: '김민주',
		size: 'sm',
	},
};
