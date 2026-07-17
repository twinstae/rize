import type { Meta, StoryObj } from '@storybook/react-vite';
import AppBar from './AppBar';
import { AppShell } from './LeftDrawer';
import paths from '../router/paths';
import { useFakeNavigation } from '../router/useFakeNavigation';
import { useLayoutEffect } from 'react';

function AppBarOnPath({ path }: { path: string }) {
	const navigation = useFakeNavigation();
	useLayoutEffect(() => {
		navigation.redirect(path);
	}, [navigation, path]);
	return (
		<AppShell>
			<AppBar />
		</AppShell>
	);
}

const meta = {
	title: 'Components/AppBar',
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const MailListPage: Story = {
	render: () => <AppBarOnPath path={paths.MAIL_LIST} />,
};

export const AlbumPage: Story = {
	render: () => <AppBarOnPath path={paths.ALBUM} />,
};
