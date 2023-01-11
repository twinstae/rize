import { AppScreen } from '@stackflow/basic-ui';
import React, { Suspense } from 'react';
import InitPage from '../pages/InitPage';
import { useMailList } from '../hooks/Dependencies';

function Wait({ children }: { children: React.ReactNode }){
  useMailList().waitForAll();

  return <>{children}</>;
}

export function wrapLayout(Page: React.FC): React.FC {
  // eslint-disable-next-line react/display-name
  return () => (
    <AppScreen backgroundColor="#ffffff">
      <Suspense fallback={<InitPage />}>
        <Wait>
          <Page />
        </Wait>
      </Suspense>
    </AppScreen>
  );
}
