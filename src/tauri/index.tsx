import React from 'react';

import App from '../App';
import RizeLogo from '../components/RizeLogo';
import { useColorMode, DependenciesWrapper } from '../hooks/Dependencies';
import i18n from '../i18n/i18n';
import { createUseMailList } from '../mailList/useMailList';
import { useStackNavigation } from '../router/useStatckNavigation';
import fsJSON from './fsJSON';
import mailRepository from './fsMailRepository';
import storageRepo from './fsStorageRepo';
import Image from './TauriImage';
import useProfileList from './useFsProfileList';
import { useAtom } from 'jotai';
import { isSplashEndAtom } from '../hooks/splashEndAtom';
// import fakeMailRepository, { fakeFsJSON } from '../mailList/fakeMailRepository';
// import fakeStorageRepo from '../config/fakeStorageRepo';
// import { MockImage } from '../components/MockImage';
// import useProfileList from '../web/useProfileList';

// const fsJSON = fakeFsJSON;
const useMailList = createUseMailList(mailRepository);

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
	useProfileList,
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
