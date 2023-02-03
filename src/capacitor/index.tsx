import React, { useEffect } from 'react';
import { Device } from '@capacitor/device';
import { App } from '@capacitor/app';
import { suspend } from 'suspend-react';
import AppMain from '../App';
import RizeLogo from '../components/RizeLogo';
import { DependenciesWrapper } from '../hooks/Dependencies';
import i18n from '../i18n/i18n';
import { createUseMailList } from '../mailList/useMailList';

import storageRepo from './storageRepo';
import useFsProfileList from './useFsProfileList';
import useNavigation from '../router/useNavigation';
import { useStackNavigation } from '../router/useStatckNavigation';
import { useAtom } from 'jotai';
import { isSplashEndAtom } from '../hooks/splashEndAtom';
import fsJSON from './fsJSON';
import mailRepository from './fsMailRepository';
import S3Image from './S3Image';
import useCacheSrcAtom from './useCacheSrc';
import { useColorMode } from '../theme/useColorMode';
// import mailRepository, { fakeFsJSON as fsJSON, updateFakeStatus } from '../mailList/fakeMailRepository';
// updateFakeStatus({ 'pm_list.json': false });
const useMailList = createUseMailList(mailRepository);

storageRepo.getItem('lang').then((lang) => {
	i18n.changeLanguage(lang);
});
let initiated = false;

const Wrapper = DependenciesWrapper({
	usePlatform: () => {
		useAtom(isSplashEndAtom);
		useAtom(useCacheSrcAtom);
		const navigation = useNavigation();
		useEffect(() => {
			if (initiated === false) {
				App.addListener('backButton', () => {
					navigation.goBack();
				});
				initiated = true;
			}
		});
		const { platform } = suspend(() => Device.getInfo(), ['platform']);
		return { platform };
	},
	storageRepo,
	useNavigationImpl: useStackNavigation,
	Image: S3Image,
	useColorMode,
	fsJSON,
	useMailList,
	mailRepository,
	useProfileList: useFsProfileList,
	RizeLogo,
});

const CapacitorApp = (
	<React.StrictMode>
		<Wrapper>
			<AppMain />
		</Wrapper>
	</React.StrictMode>
);

export default CapacitorApp;
