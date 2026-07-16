import type { Meta, StoryObj } from '@storybook/react-vite';
import MailList from './MailList';

const meta = {
	title: 'Components/MailList',
	component: MailList,
} satisfies Meta<typeof MailList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllMails: Story = {
	args: { index: 0 },
};

export const Unread: Story = {
	args: { index: 1 },
};

export const Favorites: Story = {
	args: { index: 2 },
};
