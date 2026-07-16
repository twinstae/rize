import type { Meta, StoryObj } from '@storybook/react-vite';
import FavoriteStar from './FavoriteStar';

const meta = {
	title: 'Components/FavoriteStar',
	component: FavoriteStar,
	args: {
		mailId: 'm25752',
	},
} satisfies Meta<typeof FavoriteStar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
