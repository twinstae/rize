import '../i18n/i18n';
import '../index.css';

import { App } from '@capacitor/app';
import { ChakraProvider, useColorMode } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import * as ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';

import AppMain from '../App';
import { DependenciesWrapper } from '../hooks/Dependencies';
import QueryWrapper from '../hooks/QueryWrapper';
import { createWrapper, pipeWrapper, WrapperT } from '../hooks/util';
import i18n from '../i18n/i18n';
import { createUseMailList } from '../mailList/useMailList';
import useNavigation from '../router/useNavigation';
import useRRDNavigation from '../router/useRRDNavigation';
import theme from '../theme/theme';
import fsJSON from './fsJSON';
import fsMailRepository from './fsMailRepository';
import S3Image from './S3Image';
import storageRepo from './storageRepo';


const mailRepository = fsMailRepository;
const useMailList = createUseMailList(mailRepository);

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
    Image: S3Image,
    useColorMode,
    useMailList,
    fsJSON,
    mailRepository,
  }),
);

const CapacitorWrpper: WrapperT = ({children}) => {
  const navigation = useNavigation();
  useEffect(() => {
    App.addListener('backButton', () =>{
      navigation.goBack();
    });

    return () => {
      App.removeAllListeners();
    };
  });
  return children;
};

const rootEl = document.getElementById('root');

if(rootEl){
  const root = ReactDOM.createRoot(rootEl);

  root.render(
    <React.StrictMode>
      <Wrapper>
        <CapacitorWrpper>
          <AppMain />
        </CapacitorWrpper>
      </Wrapper>
    </React.StrictMode>
  );
}

