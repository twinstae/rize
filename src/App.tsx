import React, { Suspense } from 'react';
import { Stack } from './router/useStatckNavigation';
import QueryWrapper, { JotaiQueryWrapper } from './hooks/QueryWrapper';
import InitPage from './pages/InitPage';
import ErrorBoundary from './components/ErrorBoundary';

const App = () => {
  return (
    <QueryWrapper>
      <JotaiQueryWrapper>
        <Suspense fallback={<InitPage />}>
          <ErrorBoundary fallback={({ error }) => (
            <div className="p-4 ring-1 ring-error w-screen">
              <h2 className="text-xl">{error.name}: {error.message}</h2>
              <p className="text-xs" style={{ wordWrap: 'break-word' }}>{error.stack}</p>
            </div>
          )}>
            <Stack />
          </ErrorBoundary>
        </Suspense>
      </JotaiQueryWrapper>
    </QueryWrapper>
  );
};

export default App;
