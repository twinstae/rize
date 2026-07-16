import type { Meta, StoryObj } from '@storybook/react-vite';
import SelectedTag from './SelectedTag';

const meta = {
	title: 'Components/SelectedTag',
	component: SelectedTag,
} satisfies Meta<typeof SelectedTag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
