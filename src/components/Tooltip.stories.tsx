import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tooltip } from './Tooltip';
import { Button } from './rize-ui-web';

const meta = {
	title: 'Components/Tooltip',
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Bottom: Story = {
	render: () => (
		<Tooltip tip="도움말" className="tooltip-bottom">
			<Button>Hover me</Button>
		</Tooltip>
	),
};

export const Left: Story = {
	render: () => (
		<Tooltip tip="왼쪽 툴팁" className="tooltip-left">
			<Button variant="ghost">Left</Button>
		</Tooltip>
	),
};
