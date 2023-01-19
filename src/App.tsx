import React from 'react';
import { Stack } from './router/useStatckNavigation';
import QueryWrapper, { JotaiQueryWrapper } from './hooks/QueryWrapper';
import ErrorBoundary from './components/ErrorBoundary';

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
			<button
				className="btn btn-primary"
				onClick={() => {
					location.reload();
				}}
			>
				앱 다시 시작하기
			</button>
		</div>
	);
}

function App() {
	return (
		<QueryWrapper>
			<JotaiQueryWrapper>
				<ErrorBoundary fallback={ErrorFallback}>
					<Stack />
				</ErrorBoundary>
			</JotaiQueryWrapper>
		</QueryWrapper>
	);
}

export default App;
