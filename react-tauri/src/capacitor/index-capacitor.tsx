import '../i18n/i18n';
import '../index.css';
import 'react-virtualized/styles.css';

import { ChakraProvider, useColorMode } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';

import App from '../App';
import CapacitorImage from '../components/CapacitorImage';
import fakeStorageRepo from '../config/fakeStorageRepo';
import { DependenciesWrapper } from '../hooks/Dependencies';
import QueryWrapper from '../hooks/QueryWrapper';
import { createWrapper, pipeWrapper } from '../hooks/util';
import i18n from '../i18n/i18n';
import fakeMailRepository from '../mailList/fakeMailRepository';
import { createUseMailList } from '../mailList/useMailList';
import useRRDNavigation from '../router/useRRDNavigation';
import theme from '../theme/theme';

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
    Image: CapacitorImage,
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
