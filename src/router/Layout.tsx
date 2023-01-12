import { AppScreen } from '@stackflow/basic-ui';
import React, { Suspense } from 'react';
import InitPage from '../pages/InitPage';
import { useDependencies, useMailList } from '../hooks/Dependencies';

function Wait({ children }: { children: React.ReactNode }){
  useMailList().waitForAll();

  return <>{children}</>;
}

export function wrapLayout(OriginalPage: React.FC): React.FC {
  return function Page() {
    useDependencies().usePlatform();
    return (
      <AppScreen backgroundColor="bg-base-100">
        <Suspense fallback={<InitPage />}>
          <Wait>
            <OriginalPage />
          </Wait>
        </Suspense>
      </AppScreen>
    );
  };
}
