import { AppScreen } from '@stackflow/plugin-basic-ui';
import React, { Suspense } from 'react';
import InitPage from '../pages/InitPage';
import { useDependencies, useMailList } from '../hooks/Dependencies';
import useConfig from '../config/useConfig';

function Wait({ children, name }: { children: React.ReactNode; name: string }) {
	useConfig('lang', 'ko');
	useConfig('profile', 'one-the-story');
	useConfig('username', ['{_nickname_}', '위즈원']);
	useConfig('colorMode', true);
	useConfig('order', false);
	useMailList().waitForAll();
	useDependencies().usePlatform();
	return <div className={name}>{children}</div>;
}

export function wrapLayout(OriginalPage: React.FC): React.FC {
	return function WrappedPage() {
		return (
			<AppScreen backgroundColor="bg-base-100">
				<Suspense fallback={<InitPage />}>
					<Wait name={OriginalPage.name}>
						<OriginalPage />
					</Wait>
				</Suspense>
			</AppScreen>
		);
	};
}
