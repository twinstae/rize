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
// import fakeMailRepository, { fakeFsJSON, updateFakeStatus } from '../mailList/fakeMailRepository';
// import fakeStorageRepo from '../config/fakeStorageRepo';
// const fsJSON = fakeFsJSON;
const mailRepository = fsMailRepository;
const storageRepo = fsStorageRepo;
const useMailList = createUseMailList(mailRepository);
const Image = TauriImage;

storageRepo.getItem('lang').then((lang) => {
	i18n.changeLanguage(lang);
});

// updateFakeStatus({ 'pm_list.json': false });

const Wrapper = DependenciesWrapper({
	usePlatform: () => {
		useAtom(isSplashEndAtom);
	},
	storageRepo,
	useNavigationImpl: useStackNavigation,
	Image,
	useColorMode,
	fsJSON,
	mailRepository,
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
