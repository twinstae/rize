import '../i18n/i18n';
import '../index.css';

import { ChakraProvider, useColorMode } from '@chakra-ui/react';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';

import App from '../App';
import { DependenciesWrapper } from '../hooks/Dependencies';
import QueryWrapper from '../hooks/QueryWrapper';
import { createWrapper, pipeWrapper } from '../hooks/util';
import i18n from '../i18n/i18n';
import { createUseMailList } from '../mailList/useMailList';
import useRRDNavigation from '../router/useRRDNavigation';
import theme from '../theme/theme';
import fsJSON from './fsJSON';
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
    fsJSON,
    useMailList
  }),
);

const rootDiv = document.getElementById('root');
if(rootDiv){
  const root = createRoot(rootDiv);

  root.render(
    <React.StrictMode>
      <Wrapper>
        <App />
      </Wrapper>
    </React.StrictMode>
  );  
}
