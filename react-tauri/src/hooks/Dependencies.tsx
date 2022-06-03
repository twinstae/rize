import React, { useContext } from 'react';

import { StorageRepository } from '../global';
import { Navigation } from '../router/useNavigation';
import { JsonValue } from '../types/json';
import { createWrapper } from './util';

type DependencyT = {
  tag?: string;
  setTag?: (tag: string) => void;
  navigation?: Navigation;
  toNick?: (member: string) => string;
  storageRepo?: StorageRepository<JsonValue>;
  isDark?: boolean;
  toggleDark?: () => void;
  Image?: React.FC<{
    path: string;
    style: React.CSSProperties;
    width: number;
    height: number;
  }>;
};

export const Dependencies = React.createContext<DependencyT>({});

export function useDependencies() {
  const dependencies = useContext(Dependencies);
  return dependencies as Required<typeof dependencies>;
}

export const DependenciesWrapper = (
  value: Partial<ReturnType<typeof useDependencies>>
) => createWrapper(Dependencies.Provider, { value });
