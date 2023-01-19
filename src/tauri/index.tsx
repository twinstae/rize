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
// import fsJSON from './fsJSON';
// import fsMailRepository from './fsMailRepository';
// import fsStorageRepo from './fsStorageRepo';
import TauriImage from './TauriImage';
import { useAtom } from 'jotai';
import { isSplashEndAtom } from '../hooks/splashEndAtom';
import useFsProfileList from './useFsProfileList';
import fakeMailRepository, { fakeFsJSON, updateFakeStatus } from '../mailList/fakeMailRepository';
import fakeStorageRepo from '../config/fakeStorageRepo';
const storageRepo = fakeStorageRepo;
const useMailList = createUseMailList(fakeMailRepository);
const Image = TauriImage;

storageRepo.getItem('lang').then((lang) => {
	i18n.changeLanguage(lang);
});

updateFakeStatus({ 'pm_list.json': false });

const Wrapper = DependenciesWrapper({
	usePlatform: () => {
		useAtom(isSplashEndAtom);
	},
	storageRepo,
	useNavigationImpl: useStackNavigation,
	Image,
	useColorMode,
	fsJSON: fakeFsJSON,
	mailRepository: fakeMailRepository,
	useMailList,
	useProfileList: useFsProfileList,
	RizeLogo,
});

const TauriApp = (
	<React.StrictMode>
		<Wrapper>
			<App />
		</Wrapper>
	</React.StrictMode>
);

export default TauriApp;
