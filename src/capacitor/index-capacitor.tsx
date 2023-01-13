import '../i18n/i18n';
import '../index.css';
// daisyUI assumes Tailwind CSS's Preflight
import '@unocss/reset/tailwind.css';
// Import daisyUI **BEFORE** UnoCSS
import '@kidonng/daisyui/index.css';
import 'uno.css';
import '@stackflow/basic-ui/index.css';
import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';

import AppMain from '../App';
import RizeLogo from '../components/RizeLogo';
import { DependenciesWrapper, useColorMode } from '../hooks/Dependencies';
import i18n from '../i18n/i18n';
import fakeMailRepository from '../mailList/fakeMailRepository';
import { createUseMailList } from '../mailList/useMailList';
import { useStackNavigation } from '../router/useStatckNavigation';
import fsJSON from './fsJSON';
import S3Image from './S3Image';
import storageRepo from './storageRepo';
// import fsMailRepository from './fsMailRepository';
import { App } from '@capacitor/app';
import useFsProfileList from './useFsProfileList';


const mailRepository = fakeMailRepository;
const useMailList = createUseMailList(mailRepository);

storageRepo.getItem().then((config) => {
  i18n.changeLanguage((config as { lang: string }).lang);
});

const Wrapper = DependenciesWrapper({
  usePlatform: () => {
    const navigation = useStackNavigation();
    useEffect(() => {
      App.addListener('backButton', () => {
        navigation.goBack();
      });

      return () => {
        App.removeAllListeners();
      };
    });
  },
  storageRepo,
  useNavigationImpl: useStackNavigation,
  Image: S3Image,
  useColorMode,
  fsJSON,
  useMailList,
  mailRepository,
  useProfileList: useFsProfileList,
  RizeLogo,
});


// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <Wrapper>
      <AppMain />
    </Wrapper>
  </React.StrictMode>
);
