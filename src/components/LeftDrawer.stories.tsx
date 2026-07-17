import type { Meta, StoryObj } from '@storybook/react-vite';
import { AppShell } from './LeftDrawer';
import MenuButton from './MenuButton';
import AppBar from './AppBar';

const meta = {
	title: 'Components/LeftDrawer',
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Default: Story = {
	render: () => (
		<AppShell>
			<AppBar />
		</AppShell>
	),
};

export const WithMenuButton: Story = {
	render: () => (
		<AppShell>
			<div className="p-4">
				<MenuButton />
				<p className="mt-4">Press m or click the menu button to open the drawer.</p>
			</div>
		</AppShell>
	),
};
