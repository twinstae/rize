import type { Meta, StoryObj } from '@storybook/react-vite';
import MailListItem from './MailListItem';
import { YURI_MAIL_M25752 } from '../test/fixtures';

const meta = {
	title: 'Components/MailListItem',
	component: MailListItem,
} satisfies Meta<typeof MailListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		mail: YURI_MAIL_M25752,
		index: 0,
	},
};
