import type { Meta, StoryObj } from '@storybook/react-vite';
import OrderToggleButton from './OrderToggleButton';

const meta = {
	title: 'Components/OrderToggleButton',
	component: OrderToggleButton,
} satisfies Meta<typeof OrderToggleButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
