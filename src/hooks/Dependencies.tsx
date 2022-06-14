import { atom, useAtom } from 'jotai';
import React, { useContext, useEffect } from 'react';

import { MockImage } from '../components/MockImage';
import fakeStorageRepo from '../config/fakeStorageRepo';
import { StorageRepository } from '../global';
import fakeMailRepository from '../mailList/fakeMailRepository';
import { FsJSON,MailRepository } from '../mailList/types';
import { createUseMailList, MailListResult } from '../mailList/useMailList';
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
  RizeLogo?: (props: { onAnimationEnd: () => void }) => JSX.Element;
};

const fakeFs: Record<string, unknown> = {};
const fakeFsJSON = {
  writeJSONfile: (path: string) => async (dict: JsonValue) => {
    fakeFs[path] = dict;
  },
  readJSONfile: async <T extends JsonValue>(path: string): Promise<T> => fakeFs[path] as T
};

const useFakeMailList = createUseMailList(fakeMailRepository);

const darkModeAtom = atom(false);

export const Dependencies = React.createContext<DependencyT>({
  useNavigationImpl: () => useFakeNavigation(),
  storageRepo: fakeStorageRepo,
  Image: MockImage,
  fsJSON: fakeFsJSON,
  useMailList: useFakeMailList,
  mailRepository: fakeMailRepository,
  useColorMode: () => {
    const [darkMode, setDarkMode] = useAtom(darkModeAtom);
    return {
      colorMode: (darkMode ? 'dark' : 'light') as 'dark' | 'light',
      toggleColorMode: () => {
        setDarkMode(old => !old);
      }
    };
  },
  RizeLogo: ({ onAnimationEnd }) => {
    useEffect(() => {
      setTimeout(() => { onAnimationEnd(); }, 50);
    });
    return <h1> RIZ*E </h1>;
  }
});

export function useDependencies() {
  return useContext(Dependencies) as Required<DependencyT>;
}

export const DependenciesWrapper = (
  value: Partial<ReturnType<typeof useDependencies>>
) => createWrapper(Dependencies.Provider, { value });
