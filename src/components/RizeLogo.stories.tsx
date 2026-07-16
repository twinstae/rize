import type { Meta, StoryObj } from '@storybook/react-vite';
import RizeLogo from './RizeLogo';

const meta = {
	title: 'Components/RizeLogo',
	component: RizeLogo,
} satisfies Meta<typeof RizeLogo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
