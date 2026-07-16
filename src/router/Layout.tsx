import { AppScreen } from '@stackflow/plugin-basic-ui';
import React from 'react';
import { useAtom } from 'jotai';
import InitPage from '../pages/InitPage';
import { useDependencies, useMailList } from '../hooks/Dependencies';
import useConfig from '../config/useConfig';
import { isSplashEndAtom, splashEnd } from '../hooks/splashEndAtom';

function SplashOverlay() {
	const { RizeLogo } = useDependencies();
	const [splashEnded] = useAtom(isSplashEndAtom);

	if (splashEnded) {
		return null;
	}

	return (
		<div className="fixed inset-0 z-50 flex flex-col justify-center align-middle bg-base-100">
			<div className="mx-auto text-red-400 text-9xl">
				<RizeLogo onAnimationEnd={splashEnd} />
			</div>
		</div>
	);
}

function Wait({ children, name }: { children: React.ReactNode; name: string }) {
	useConfig('lang', 'ko');
	useConfig('profile', 'one-the-story');
	useConfig('username', ['{_nickname_}', '위즈원']);
	useConfig('colorMode', true);
	useConfig('order', false);

	const status = useMailList().useStatus();
	if (Object.values(status).some((value) => value === false)) {
		return <InitPage />;
	}

	return <div className={name}>{children}</div>;
}

export function wrapLayout(OriginalPage: React.FC): React.FC {
	return function WrappedPage() {
		return (
			<AppScreen backgroundColor="bg-base-100">
				<SplashOverlay />
				<Wait name={OriginalPage.name}>
					<OriginalPage />
				</Wait>
			</AppScreen>
		);
	};
}
