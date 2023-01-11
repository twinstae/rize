import { AppScreen } from '@stackflow/basic-ui';
import React, { Suspense } from 'react';
import InitPage from '../pages/InitPage';

export function wrapLayout(Page: React.FC): React.FC {
  // eslint-disable-next-line react/display-name
  return () => (
    <AppScreen backgroundColor="#ffffff">
      <Suspense fallback={<InitPage />}>
        <Page />
      </Suspense>
    </AppScreen>
  );
}
