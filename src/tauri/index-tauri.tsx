import '../i18n/i18n';
import '../index.css';
// daisyUI assumes Tailwind CSS's Preflight
import '@unocss/reset/tailwind.css';
// Import daisyUI **BEFORE** UnoCSS
import '@kidonng/daisyui/index.css';
import 'uno.css';
import '@stackflow/basic-ui/index.css';

import React from 'react';
import { createRoot } from 'react-dom/client';

import App from '../App';
import RizeLogo from '../components/RizeLogo';
import { useColorMode, DependenciesWrapper } from '../hooks/Dependencies';
import i18n from '../i18n/i18n';
import { createUseMailList } from '../mailList/useMailList';
import { useStackNavigation } from '../router/useStatckNavigation';
import fsJSON from './fsJSON';
// import fakeStorageRepo from '../config/fakeStorageRepo';
// import fakeMailRepository from '../mailList/fakeMailRepository';
// import { MockImage } from '../components/MockImage';
// const storageRepo = fakeStorageRepo;
// const useMailList = createUseMailList(fakeMailRepository);
// const Image = MockImage;
import fsMailRepository from './fsMailRepository';
import fsStorageRepo from './fsStorageRepo';
import TauriImage from './TauriImage';
const storageRepo = fsStorageRepo;
const useMailList = createUseMailList(fsMailRepository);
const Image = TauriImage;

storageRepo.getItem().then((config) => {
  i18n.changeLanguage((config as { lang: string } | undefined)?.lang || 'ko');
});

const Wrapper = DependenciesWrapper({
  usePlatform: () => undefined,
  storageRepo,
  useNavigationImpl: useStackNavigation,
  Image,
  useColorMode,
  fsJSON,
  mailRepository: fsMailRepository,
  useMailList,
  RizeLogo,
});

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <Wrapper>
      <App />
    </Wrapper>
  </React.StrictMode>
);
