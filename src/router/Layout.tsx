import { AppScreen } from '@stackflow/basic-ui';
import React from 'react';

export function wrapLayout(Page: React.FC): React.FC {
  // eslint-disable-next-line react/display-name
  return () => (
    <AppScreen theme="cupertino" backgroundColor="#ffffff">
      <Page />
    </AppScreen>
  );
}
