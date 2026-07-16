import type { Meta, StoryObj } from '@storybook/react-vite';
import DarkModeButton from './DarkModeButton';

const meta = {
	title: 'Components/DarkModeButton',
	component: DarkModeButton,
} satisfies Meta<typeof DarkModeButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
