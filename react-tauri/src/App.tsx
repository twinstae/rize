import './i18n/i18n';
import './index.css';
import 'react-virtualized/styles.css';

import { ChakraProvider, useColorMode } from '@chakra-ui/react';
import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';

import { MockImage } from './components/MockImage';
import fakeStorageRepo from './config/fakeStorageRepo';
import { DependenciesWrapper } from './hooks/Dependencies';
import QueryWrapper from './hooks/QueryWrapper';
import { createWrapper, pipeWrapper } from './hooks/util';
import i18n from './i18n/i18n';
import fakeMailRepository from './mailList/fakeMailRepository';
import { createUseMailList } from './mailList/useMailList';
import Config from './pages/Config';
import MailDetailPage from './pages/MailDetailPage';
import MailListPage from './pages/MailListPage';
import paths from './router/paths';
import useRRDNavigation from './router/useRRDNavigation';
import theme from './theme/theme';

const storageRepo = fakeStorageRepo;
const useMailList = createUseMailList(fakeMailRepository);

storageRepo.getItem().then(config => {
  i18n.changeLanguage((config as { lang: string}).lang);
});

const Wrapper = pipeWrapper(
  createWrapper(ChakraProvider, { theme }),
  HashRouter,
  QueryWrapper,
  DependenciesWrapper({
    storageRepo,
    useNavigationImpl: useRRDNavigation,
    Image: MockImage,
    useColorMode,
    useMailList
  }),
);

const App = () => (
  <Wrapper>
    <Routes>
      <Route path={paths.CONFIG} element={<Config />} />
      <Route path={paths.MAIL_LIST} element={<MailListPage />} />
      <Route path={paths.MAIL_DETAIL} element={<MailDetailPage />} />
      <Route path={paths.ROOT} element={<MailListPage />} />
    </Routes>
  </Wrapper>
);

export default App;
