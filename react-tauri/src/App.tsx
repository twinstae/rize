import './i18n/i18n';
import './index.css';
import 'react-virtualized/styles.css';

import { ChakraProvider, useColorMode } from '@chakra-ui/react';
import { atom, useAtom } from 'jotai';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { HashRouter } from 'react-router-dom';

import TauriImage from './components/Image';
import fakeStorageRepo from './config/fakeStorageRepo';
import fsStorageRepo from './config/fsStorageRepo';
import { Dependencies } from './hooks/Dependencies';
import QueryWrapper from './hooks/QueryWrapper';
import { WrapperT } from './hooks/util';
import Config from './pages/Config';
import MailDetailPage from './pages/MailDetailPage';
import MailListPage from './pages/MailListPage';
import paths from './router/paths';
import useRRDNavigation from './router/useRRDNavigation';
import theme from './theme/theme';

const currentTagAtom = atom('');

const DependencyWrapper: WrapperT = ({ children }) => {
  const navigation = useRRDNavigation();
  const [tag, setTag] = useAtom(currentTagAtom);
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Dependencies.Provider
      value={{
        storageRepo: fsStorageRepo,
        navigation,
        isDark: colorMode === 'dark',
        toggleDark: toggleColorMode,
        Image: TauriImage,
        tag,
        setTag,
      }}
    >
      {children}
    </Dependencies.Provider>
  );
};

const App = () => (
  <ChakraProvider theme={theme}>
    <HashRouter>
      <QueryWrapper>
        <DependencyWrapper>
          <Routes>
            <Route path={paths.CONFIG} element={<Config />} />
            <Route path={paths.MAIL_LIST} element={<MailListPage />} />
            <Route path={paths.MAIL_DETAIL} element={<MailDetailPage />} />
            <Route path={paths.ROOT} element={<MailListPage />} />
          </Routes>
        </DependencyWrapper>
      </QueryWrapper>
    </HashRouter>
  </ChakraProvider>
);

export default App;
