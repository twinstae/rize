import '../i18n/i18n';
import '../index.css';
// daisyUI assumes Tailwind CSS's Preflight
import '@unocss/reset/tailwind.css';
// Import daisyUI **BEFORE** UnoCSS
import '@kidonng/daisyui/index.css';
import 'uno.css';
import '@stackflow/basic-ui/index.css';

import React from 'react';

import App from '../App';
import RizeLogo from '../components/RizeLogo';
import { useColorMode, DependenciesWrapper } from '../hooks/Dependencies';
import i18n from '../i18n/i18n';
import { createUseMailList } from '../mailList/useMailList';
import { useStackNavigation } from '../router/useStatckNavigation';
import fsJSON from './fsJSON';
import fsMailRepository from './fsMailRepository';
import fsStorageRepo from './fsStorageRepo';
import TauriImage from './TauriImage';
import { useAtom } from 'jotai';
import { isSplashEndAtom } from '../hooks/splashEndAtom';
import useFsProfileList from './useFsProfileList';
const storageRepo = fsStorageRepo;
const useMailList = createUseMailList(fsMailRepository);
const Image = TauriImage;

storageRepo.getItem('lang').then((lang) => {
  i18n.changeLanguage(lang);
});

const Wrapper = DependenciesWrapper({
  usePlatform: () => {
    useAtom(isSplashEndAtom);
  },
  storageRepo,
  useNavigationImpl: useStackNavigation,
  Image,
  useColorMode,
  fsJSON,
  mailRepository: fsMailRepository,
  useMailList,
  useProfileList: useFsProfileList,
  RizeLogo,
});

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const TauriApp = (
  <React.StrictMode>
    <Wrapper>
      <App />
    </Wrapper>
  </React.StrictMode>
);

export default TauriApp;