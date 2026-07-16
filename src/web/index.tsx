import React from 'react';

import App from '../App';
import RizeLogo from '../components/RizeLogo';
import { DependenciesWrapper } from '../hooks/Dependencies';
import i18n from '../i18n/i18n';
import { createUseMailList } from '../mailList/useMailList';
import { useStackNavigation } from '../router/useStatckNavigation';
import fakeStorageRepo from '../config/fakeStorageRepo';
import fakeMailRepository, { fakeFsJSON, fakeMailDefaults } from '../mailList/fakeMailRepository';
import WebImage from './WebImage';
import { splashEnd } from '../hooks/splashEndAtom';
import useProfileList from './useProfileList';
import { useColorMode } from '../theme/useColorMode';

const storageRepo = fakeStorageRepo;
const useMailList = createUseMailList(fakeMailRepository, fakeMailDefaults);
const Image = WebImage;

splashEnd();

storageRepo.getItem('lang').then((lang) => {
	i18n.changeLanguage(lang);
});

const Wrapper = DependenciesWrapper({
	usePlatform: () => ({ platform: 'web' }),
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
