import type { Meta, StoryObj } from '@storybook/react-vite';
import { MockImage } from './MockImage';

const meta = {
	title: 'Components/MockImage',
	component: MockImage,
} satisfies Meta<typeof MockImage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Profile: Story = {
	args: {
		path: 'img/izone-logo.png',
		width: 16,
	},
};

export const MailImage: Story = {
	args: {
		path: 'img/mail/3/20210428/6d5c96191d428d6c236160aa04bbb4d4.jpeg',
		width: 104,
		className: 'rounded-lg',
	},
};
