import '../i18n/i18n';
import '../index.css';
import 'react-virtualized/styles.css';

import { ChakraProvider, useColorMode } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';

import App from '../App';
import { DependenciesWrapper } from '../hooks/Dependencies';
import QueryWrapper from '../hooks/QueryWrapper';
import { createWrapper, pipeWrapper } from '../hooks/util';
import i18n from '../i18n/i18n';
import { createUseMailList } from '../mailList/useMailList';
import useRRDNavigation from '../router/useRRDNavigation';
import theme from '../theme/theme';
import fsMailRepository from './fsMailRepository';
import fsStorageRepo from './fsStorageRepo';
import TauriImage from './TauriImage';

const storageRepo = fsStorageRepo;
const useMailList = createUseMailList(fsMailRepository);

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
    Image: TauriImage,
    useColorMode,
    useMailList
  }),
);

ReactDOM.render(
  <React.StrictMode>
    <Wrapper>
      <App />
    </Wrapper>
  </React.StrictMode>,
  document.getElementById('root')
);
