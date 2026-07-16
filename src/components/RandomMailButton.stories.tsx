import type { Meta, StoryObj } from '@storybook/react-vite';
import RandomMailButton from './RandomMailButton';

const meta = {
	title: 'Components/RandomMailButton',
	component: RandomMailButton,
} satisfies Meta<typeof RandomMailButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Redirect: Story = {
	args: {
		isRedirect: true,
	},
};
