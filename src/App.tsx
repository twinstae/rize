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

const appStore = getDefaultStore();

setupIonicReact();

function ErrorFallback({ error }: { error: Error }) {
	return (
		<div className="p-4 ring-1 ring-error w-screen">
			<h2 className="text-xl">
				{error.name}: {error.message}
			</h2>
			<p className="text-xs" style={{ wordWrap: 'break-word' }}>
				{error.stack}
			</p>
			문제가 있다면{' '}
			<a href="https://open.kakao.com/o/gPbArZ4c" target="_blank" rel="noreferrer" className="link text-pink-500">
				AS 오픈카톡방
			</a>
			을 찾아주세요.
			<Button
				variant="ghost"
				circle="circle"
				className="tooltip-top"
				onClick={() => {
					location.reload();
				}}
			>
				앱 다시 시작하기
			</Button>
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
