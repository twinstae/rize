import type { Meta, StoryObj } from '@storybook/react-vite';
import MenuButton from './MenuButton';
import { AppShell } from './LeftDrawer';

const meta = {
	title: 'Components/MenuButton',
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Default: Story = {
	render: () => (
		<AppShell>
			<div className="p-4">
				<MenuButton />
			</div>
		</AppShell>
	),
};
