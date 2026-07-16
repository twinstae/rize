import React from 'react';
import { suspend } from 'suspend-react';
import { platform as getPlatform } from '@tauri-apps/plugin-os';

import App from '../App';
import RizeLogo from '../components/RizeLogo';
import { DependenciesWrapper } from '../hooks/Dependencies';
import i18n from '../i18n/i18n';
import { createUseMailList } from '../mailList/useMailList';
import { useStackNavigation } from '../router/useStatckNavigation';
import fsJSON from './fsJSON';
import mailRepository from './fsMailRepository';
import storageRepo from './fsStorageRepo';
import Image from './TauriImage';
import { openBrowser } from './openBrowser';
import useProfileList from './useFsProfileList';
import { useColorMode } from '../theme/useColorMode';

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
		const platform = suspend(
			async () => getPlatform(),
			['platform']
		) as string;
		return { platform };
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
	openBrowser,
});

const TauriApp = (
	<React.StrictMode>
		<Wrapper>
			<App />
		</Wrapper>
	</React.StrictMode>
);

export default TauriApp;
