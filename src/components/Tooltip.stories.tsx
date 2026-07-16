import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tooltip, TooltipContent, TooltipTrigger } from './Tooltip';
import { Button } from './rize-ui-web';

const meta = {
	title: 'Components/Tooltip',
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Bottom: Story = {
	render: () => (
		<Tooltip>
			<TooltipTrigger>
				<Button>Hover me</Button>
			</TooltipTrigger>
			<TooltipContent side="bottom">도움말</TooltipContent>
		</Tooltip>
	),
};

export const Left: Story = {
	render: () => (
		<Tooltip>
			<TooltipTrigger>
				<Button variant="ghost">Left</Button>
			</TooltipTrigger>
			<TooltipContent side="left">왼쪽 툴팁</TooltipContent>
		</Tooltip>
	),
};
