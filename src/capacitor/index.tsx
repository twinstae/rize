import '../i18n/i18n';
import '../index.css';
// daisyUI assumes Tailwind CSS's Preflight
import '@unocss/reset/tailwind.css';
// Import daisyUI **BEFORE** UnoCSS
import '@kidonng/daisyui/index.css';
import 'uno.css';
import '@stackflow/basic-ui/index.css';
import React, { useEffect } from 'react';

import AppMain from '../App';
import RizeLogo from '../components/RizeLogo';
import { DependenciesWrapper, useColorMode } from '../hooks/Dependencies';
import i18n from '../i18n/i18n';
import { createUseMailList } from '../mailList/useMailList';
import fsJSON from './fsJSON';
import S3Image from './S3Image';
import storageRepo from './storageRepo';
import fsMailRepository from './fsMailRepository';
import { App } from '@capacitor/app';
import useFsProfileList from './useFsProfileList';
import useNavigation from '../router/useNavigation';
import { useStackNavigation } from '../router/useStatckNavigation';
import { useAtom } from 'jotai';
import { isSplashEndAtom } from '../hooks/splashEndAtom';


const mailRepository = fsMailRepository;
const useMailList = createUseMailList(mailRepository);

storageRepo.getItem('lang').then((lang) => {
  i18n.changeLanguage(lang);
});
let initiated = false;

const Wrapper = DependenciesWrapper({
  usePlatform: () => {
    useAtom(isSplashEndAtom);
    const navigation = useNavigation();
    useEffect(() => {
      if (initiated === false){
        App.addListener('backButton', () => {
          navigation.goBack();
        });
        initiated = true;
        console.log('here');
      }
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

const CapacitorApp = (
  <React.StrictMode>
    <Wrapper>
      <AppMain />
    </Wrapper>
  </React.StrictMode>
);

export default CapacitorApp;