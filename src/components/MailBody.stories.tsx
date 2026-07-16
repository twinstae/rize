import type { Meta, StoryObj } from '@storybook/react-vite';
import MailBody from './MailBody';
import { YURI_MAIL_M25752 } from '../test/fixtures';

const meta = {
	title: 'Components/MailBody',
	component: MailBody,
} satisfies Meta<typeof MailBody>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		mailBody: {
			body: YURI_MAIL_M25752.body,
			images: YURI_MAIL_M25752.images,
		},
	},
};
