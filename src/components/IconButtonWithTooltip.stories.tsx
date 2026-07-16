import type { Meta, StoryObj } from '@storybook/react-vite';
import IconButtonWithTooltip from './IconButtonWithTooltip';
import MagnifyingGlassIcon from './icons/MagnifyingGlassIcon';

const meta = {
	title: 'Components/IconButtonWithTooltip',
	component: IconButtonWithTooltip,
	args: {
		ariaLabel: '검색',
		icon: <MagnifyingGlassIcon />,
		onClick: () => {},
	},
} satisfies Meta<typeof IconButtonWithTooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Primary: Story = {
	args: {
		variant: 'primary',
		direction: 'left',
	},
};
