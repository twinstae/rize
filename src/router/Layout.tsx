import { AppScreen } from '@stackflow/basic-ui';
import React, { Suspense } from 'react';
import InitPage from '../pages/InitPage';
import { useDependencies, useMailList } from '../hooks/Dependencies';
import useConfig from '../config/useConfig';
import { useStore } from '@nanostores/react';
import { testResultAtom } from '../test/initTest';

function Wait({ children, name }: { children: React.ReactNode, name: string }){
  useConfig('lang', 'ko');
  useConfig('profile', 'one-the-story');
  useConfig('username', ['{_nickname_}', '위즈원']);
  useMailList().waitForAll();
  useDependencies().usePlatform();

  return (
    <div className={name}>
      {children}
    </div>
  );
}

function TestResult(){
  const testResult = useStore(testResultAtom);

  if (testResult.length === 0) {
    return <></>;
  }
  return (
    <ul className="absolute right-2 top-2 bg-base-100 shadow-lg ring-2 h-16 overflow-y-scroll">
      {testResult.map(result => (
        <li key={result.message}>
          {result.pass
            ? <>PASS: {result.message}</>
            : (
              <div tabIndex={0} className="collapse"> 
                <div className="collapse-title text-xl font-medium">
                FAIL: {result.message}
                </div>
                <div className="collapse-content"> 
                  <p>{result.stack}</p>
                </div>
              </div>
            )}
        </li>
      ))}
    </ul>
  );
}

export function wrapLayout(OriginalPage: React.FC): React.FC {
  return function Page() {
    return (
      <AppScreen backgroundColor="bg-base-100">
        <TestResult />
        <Suspense fallback={<InitPage />}>
          <Wait name={OriginalPage.name}>
            <OriginalPage />
          </Wait>
        </Suspense>
      </AppScreen>
    );
  };
}
