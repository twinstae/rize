import { AppScreen } from '@stackflow/basic-ui';
import React, { Suspense } from 'react';
import InitPage from '../pages/InitPage';
import { useDependencies, useMailList } from '../hooks/Dependencies';
import useConfig from '../config/useConfig';

function Wait({ children }: { children: React.ReactNode }){
  useConfig('lang', 'ko');
  useConfig('profile', 'one-the-story');
  useConfig('username', ['{_nickname_}', '위즈원']);
  useMailList().waitForAll();
  useDependencies().usePlatform();
  throw new Error('test');
  return <>{children}</>;
}

export function wrapLayout(OriginalPage: React.FC): React.FC {
  return function Page() {
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
