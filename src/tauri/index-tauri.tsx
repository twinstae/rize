import '../i18n/i18n';
import '../index.css';
import 'uno.css';
import 'normalize.css';
import '@stackflow/basic-ui/index.css';

import React from 'react';
import { createRoot } from 'react-dom/client';

import App from '../App';
import RizeLogo from '../components/RizeLogo';
import { useColorMode, DependenciesWrapper } from '../hooks/Dependencies';
import QueryWrapper from '../hooks/QueryWrapper';
import { pipeWrapper } from '../hooks/util';
import i18n from '../i18n/i18n';
import { createUseMailList } from '../mailList/useMailList';
import { useStackNavigation } from '../router/useStatckNavigation';
import fsJSON from './fsJSON';
import fsMailRepository from './fsMailRepository';
import fsStorageRepo from './fsStorageRepo';
import TauriImage from './TauriImage';
// import { MockImage } from '../components/MockImage';
// import fakeStorageRepo from '../config/fakeStorageRepo';
// import fakeMailRepository from '../mailList/fakeMailRepository';

const storageRepo = fsStorageRepo;
const useMailList = createUseMailList(fsMailRepository);

storageRepo.getItem().then((config) => {
  i18n.changeLanguage((config as { lang: string } | undefined)?.lang || 'ko');
});

const Wrapper = pipeWrapper(
  QueryWrapper,
  DependenciesWrapper({
    storageRepo,
    useNavigationImpl: useStackNavigation,
    Image: TauriImage,
    useColorMode,
    fsJSON,
    useMailList,
    RizeLogo,
  })
);

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <Wrapper>
      <App />
    </Wrapper>
  </React.StrictMode>
);
