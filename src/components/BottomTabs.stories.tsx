import type { Meta, StoryObj } from '@storybook/react-vite';
import { useLayoutEffect } from 'react';

import BottomTabs from './BottomTabs';
import AppBar from './AppBar';
import paths from '../router/paths';
import { useFakeNavigation } from '../router/useFakeNavigation';

function BottomTabsOnPath({ path, children }: { path: string; children: React.ReactNode }) {
	const navigation = useFakeNavigation();
	useLayoutEffect(() => {
		navigation.redirect(path);
	}, [navigation, path]);

	return <BottomTabs>{children}</BottomTabs>;
}

const meta = {
	title: 'Components/BottomTabs',
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const MailTab: Story = {
	render: () => (
		<BottomTabsOnPath path={paths.MAIL_LIST}>
			<AppBar />
			<div className="flex flex-1 items-center justify-center p-4 text-sm text-[var(--rize-muted)]">메일 목록</div>
		</BottomTabsOnPath>
	),
};

export const AlbumTab: Story = {
	render: () => (
		<BottomTabsOnPath path={paths.ALBUM}>
			<AppBar />
			<div className="flex flex-1 items-center justify-center p-4 text-sm text-[var(--rize-muted)]">앨범</div>
		</BottomTabsOnPath>
	),
};
