import { atom, useAtom } from 'jotai';
import React, { useContext, useEffect } from 'react';

import { createUseMailList, MailListResult } from '../mailList/useMailList';

import { ImageProps, MockImage } from '../components/MockImage';
import fakeStorageRepo from '../config/fakeStorageRepo';
import type { StorageRepository } from '../global';
import fakeMailRepository, { fakeFsJSON } from '../mailList/fakeMailRepository';
import type { FsJSON, MailRepository } from '../mailList/types';
import { Navigation, useFakeNavigation } from '../router/useNavigation';
import { createWrapper } from './util';

type DependencyT = {
	usePlatform: () => void;
	useNavigationImpl?: () => Navigation;
	storageRepo?: StorageRepository<string>;
	useColorMode?: () => {
		colorMode: 'light' | 'dark';
		toggleColorMode: () => void;
	};
	Image?: React.FC<ImageProps>;
	fsJSON?: FsJSON;
	useMailList?: () => MailListResult;
	mailRepository?: MailRepository;
	useProfileList: () => string[];
	RizeLogo?: (props: { onAnimationEnd?: () => void }) => JSX.Element;
};

export const darkModeAtom = atom(false);

export function useColorMode() {
	const [darkMode, setDarkMode] = useAtom(darkModeAtom);
	useEffect(() => {
		document.getElementsByTagName('html')[0].setAttribute('data-theme', darkMode ? 'dark' : 'izone');
	}, [darkMode]);
	return {
		colorMode: (darkMode ? 'dark' : 'light') as 'dark' | 'light',
		toggleColorMode: () => {
			setDarkMode((old) => !old);
		},
	};
}

export const createFakeDependencies: () => DependencyT = () => ({
	usePlatform: () => undefined,
	useNavigationImpl: () => useFakeNavigation(),
	storageRepo: fakeStorageRepo,
	Image: MockImage,
	fsJSON: fakeFsJSON,
	useMailList: createUseMailList(fakeMailRepository),
	mailRepository: fakeMailRepository,
	useProfileList: () => ['la-vie-en-rose', 'violeta'],
	useColorMode,
	RizeLogo: ({ onAnimationEnd }) => {
		useEffect(() => {
			onAnimationEnd?.();
		});
		return <h1> RIZ*E </h1>;
	},
});

const fakeDependencies = createFakeDependencies();
export const DependenciesContext = React.createContext<DependencyT>(fakeDependencies);

export function useDependencies() {
	return useContext(DependenciesContext) as Required<DependencyT>;
}

export const DependenciesWrapper = (value: ReturnType<typeof useDependencies>) =>
	createWrapper(DependenciesContext.Provider, { value });

export function useMailList() {
	return useDependencies().useMailList();
}

export function useTags() {
	return useDependencies().useMailList().useTags();
}
