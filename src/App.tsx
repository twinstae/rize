import './i18n/i18n';
import '@ionic/react/css/core.css';
import '@stackflow/plugin-basic-ui/index.css';
import './index.css';

import React from 'react';
import { setupIonicReact } from '@ionic/react';
import { Stack } from './router/useStatckNavigation';
import QueryWrapper, { JotaiQueryWrapper } from './hooks/QueryWrapper';
import ErrorBoundary from './components/ErrorBoundary';
import { TooltipProvider } from './components/Tooltip';
import { Provider, getDefaultStore } from 'jotai';
import { Button } from './components/rize-ui-web';
import { useOpenBrowser } from './hooks/Dependencies';

const KAKAO_OPEN_CHAT_URL = 'https://open.kakao.com/o/gPbArZ4c';

const appStore = getDefaultStore();

setupIonicReact();

function ErrorFallback({ error }: { error: Error }) {
	const openBrowser = useOpenBrowser();

	return (
		<div className="pt-32 p-4 ring-1 ring-error w-screen">
			문제가 있다면{' '}
			<button type="button" className="link text-pink-500" onClick={() => openBrowser(KAKAO_OPEN_CHAT_URL)}>
				AS 오픈카톡방
			</button>
			을 찾아주세요.
			<Button
				circle="circle"
				className="tooltip-top"
				onClick={() => {
					location.reload();
				}}
			>
				앱 다시 시작하기
			</Button>
			<p className="break-words whitespace-pre-wrap">{JSON.stringify(error)}</p>
		</div>
	);
}

function App() {
	return (
		<Provider store={appStore}>
			<TooltipProvider>
				<QueryWrapper>
					<JotaiQueryWrapper>
						<ErrorBoundary fallback={ErrorFallback}>
							<Stack />
						</ErrorBoundary>
					</JotaiQueryWrapper>
				</QueryWrapper>
			</TooltipProvider>
		</Provider>
	);
}

export default App;
