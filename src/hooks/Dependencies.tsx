import React, { useContext } from 'react';

import { StorageRepository } from '../global';
import { MailRepository } from '../mailList/types';
import { MailListResult } from '../mailList/useMailList';
import { Navigation } from '../router/useNavigation';
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
  useMailList?: () => MailListResult,
  mailRepository?: MailRepository
};

export const Dependencies = React.createContext<DependencyT>({});

export function useDependencies() {
  const dependencies = useContext(Dependencies);
  return dependencies as Required<typeof dependencies>;
}

export const DependenciesWrapper = (
  value: Partial<ReturnType<typeof useDependencies>>
) => createWrapper(Dependencies.Provider, { value });
