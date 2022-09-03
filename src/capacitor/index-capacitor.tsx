import '../i18n/i18n';
import '../index.css';
import 'uno.css';
import 'normalize.css';
import '@stackflow/basic-ui/index.css';

import { App } from '@capacitor/app';
import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';

import AppMain from '../App';
import RizeLogo from '../components/RizeLogo';
import { DependenciesWrapper } from '../hooks/Dependencies';
import QueryWrapper from '../hooks/QueryWrapper';
import { pipeWrapper, WrapperT } from '../hooks/util';
import i18n from '../i18n/i18n';
import fakeMailRepository from '../mailList/fakeMailRepository';
import { createUseMailList } from '../mailList/useMailList';
import { useStackNavigation } from '../router/useStatckNavigation';
import fsJSON from './fsJSON';
import S3Image from './S3Image';
import storageRepo from './storageRepo';

const mailRepository = fakeMailRepository;
const useMailList = createUseMailList(mailRepository);

storageRepo.getItem().then((config) => {
  i18n.changeLanguage((config as { lang: string }).lang);
});

const Wrapper = pipeWrapper(
  QueryWrapper,
  DependenciesWrapper({
    storageRepo,
    useNavigationImpl: useStackNavigation,
    Image: S3Image,
    useColorMode: () => ({
      colorMode: 'light',
      toggleColorMode: () => undefined,
    }),
    fsJSON,
    useMailList,
    mailRepository,
    RizeLogo,
  })
);

// const CapacitorWrpper: WrapperT = ({ children }) => {
//   const navigation = useStackNavigation();
//   useEffect(() => {
//     App.addListener('backButton', () => {
//       navigation.goBack();
//     });

//     return () => {
//       App.removeAllListeners();
//     };
//   });
//   return children;
// };

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <Wrapper>
      <AppMain />
    </Wrapper>
  </React.StrictMode>
);
