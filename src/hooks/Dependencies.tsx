import { atom, useAtom } from 'jotai';
import React, { useContext, useEffect } from 'react';

import { createUseMailList, MailListResult } from '../mailList/useMailList';

import { MockImage } from '../components/MockImage';
import fakeStorageRepo from '../config/fakeStorageRepo';
import type { StorageRepository } from '../global';
import fakeMailRepository, { fakeFsJSON } from '../mailList/fakeMailRepository';
import type { FsJSON,MailRepository } from '../mailList/types';
import { Navigation, useFakeNavigation } from '../router/useNavigation';
import { JsonValue } from '../types/json';
import { createWrapper } from './util';

type DependencyT = {
  useNavigationImpl?: () => Navigation;
  storageRepo?: StorageRepository<JsonValue>;
  useColorMode?: () => {
    colorMode: 'light' | 'dark',
    toggleColorMode: () => void,
  };
  Image?: React.FC<{
    path: string;
    style: React.CSSProperties;
    width: number;
  }>;
  fsJSON?: FsJSON,
  useMailList?: () => MailListResult,
  mailRepository?: MailRepository
  RizeLogo?: (props: { onAnimationEnd?: () => void }) => JSX.Element;
};


export const darkModeAtom = atom(false);

export function useColorMode(){
  const [darkMode, setDarkMode] = useAtom(darkModeAtom);
  return {
    colorMode: (darkMode ? 'dark' : 'light') as 'dark' | 'light',
    toggleColorMode: () => {
      setDarkMode(old => !old);
      document.getElementsByTagName('html')[0].setAttribute('data-theme', !darkMode ? 'dark' : 'light');
    }
  };
}

export const createFakeDependencies: () => DependencyT = () => ({
  useNavigationImpl: () => useFakeNavigation(),
  storageRepo: fakeStorageRepo,
  Image: MockImage,
  fsJSON: fakeFsJSON,
  useMailList: createUseMailList(fakeMailRepository),
  mailRepository: fakeMailRepository,
  useColorMode,
  RizeLogo: ({ onAnimationEnd }) => {
    useEffect(() => {
      onAnimationEnd?.();
    });
    return <h1> RIZ*E </h1>;
  }
});

const fakeDependencies = createFakeDependencies();
export const Dependencies = React.createContext<DependencyT>(fakeDependencies);

export function useDependencies() {
  return useContext(Dependencies) as Required<DependencyT>;
}

export const DependenciesWrapper = (
  value: Partial<ReturnType<typeof useDependencies>>
) => createWrapper(Dependencies.Provider, { value });

export function useMailList(){
  return useDependencies().useMailList();
}

export function useTags(){
  return useDependencies().useMailList().useTags();
}