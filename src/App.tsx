import React, { Suspense } from 'react';
import { Stack } from './router/useStatckNavigation';
import QueryWrapper, { JotaiQueryWrapper } from './hooks/QueryWrapper';
import InitPage from './pages/InitPage';
import ErrorBoundary from './components/ErrorBoundary';

function ErrorFallback({ error }: { error: Error}){
  return (
    <div className="p-4 ring-1 ring-error w-screen">
      <h2 className="text-xl">{error.name}: {error.message}</h2>
      <p className="text-xs" style={{ wordWrap: 'break-word' }}>{error.stack}</p>
      <button className="btn btn-primary" onClick={() => {
        location.reload();
      }}>앱 다시 시작하기</button>
    </div>
  );
}

function App(){
  return (
    <QueryWrapper>
      <JotaiQueryWrapper>
        <Suspense fallback={<InitPage />}>
          <ErrorBoundary fallback={ErrorFallback}>
            <Stack />
          </ErrorBoundary>
        </Suspense>
      </JotaiQueryWrapper>
    </QueryWrapper>
  );
}

export default App;
