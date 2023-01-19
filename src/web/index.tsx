import React from 'react';

import App from '../App';
import RizeLogo from '../components/RizeLogo';
import { useColorMode, DependenciesWrapper } from '../hooks/Dependencies';
import i18n from '../i18n/i18n';
import { createUseMailList } from '../mailList/useMailList';
import { useStackNavigation } from '../router/useStatckNavigation';
import fakeStorageRepo from '../config/fakeStorageRepo';
import fakeMailRepository, { fakeFsJSON } from '../mailList/fakeMailRepository';
import { MockImage } from '../components/MockImage';
import { useAtom } from 'jotai';
import { isSplashEndAtom } from '../hooks/splashEndAtom';
import useProfileList from './useProfileList';
const storageRepo = fakeStorageRepo;
const useMailList = createUseMailList(fakeMailRepository);
const Image = MockImage;

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
	fsJSON: fakeFsJSON,
	mailRepository: fakeMailRepository,
	useMailList,
	useProfileList,
	RizeLogo,
});

const WebApp = (
	<React.StrictMode>
		<Wrapper>
			<App />
		</Wrapper>
	</React.StrictMode>
);

export default WebApp;
