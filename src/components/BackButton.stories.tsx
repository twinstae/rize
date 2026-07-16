import type { Meta, StoryObj } from '@storybook/react-vite';
import BackButton from './BackButton';

const meta = {
	title: 'Components/BackButton',
	component: BackButton,
} satisfies Meta<typeof BackButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Primary: Story = {
	args: {
		variant: 'primary',
		circle: 'circle',
	},
};
