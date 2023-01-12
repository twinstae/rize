import React, { Suspense } from 'react';
import { Stack } from './router/useStatckNavigation';
import QueryWrapper, { JotaiQueryWrapper } from './hooks/QueryWrapper';
import InitPage from './pages/InitPage';

const App = () => {
  return (
    <QueryWrapper>
      <JotaiQueryWrapper>
        <Suspense fallback={ <InitPage />}>
          <Stack />
        </Suspense>
      </JotaiQueryWrapper>
    </QueryWrapper>
  );
};

export default App;
