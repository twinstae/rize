import React, { useContext } from "react";
import { Navigation } from "../router/useNavigation";
import { createWrapper } from "./util";

type DependencyT = {
  setTag?: (tag: string) => void;
  navigation?: Navigation;
  toNick?: (member: IZONE) => string;
  usernameService?: UsernameServiceT;
  Image?: React.FC<{
    path: string;
    style: React.CSSProperties;
  }>;
};

export const Dependencies = React.createContext<DependencyT>({});

export function useDependencies() {
  const dependencies = useContext(Dependencies);
  return dependencies as Required<typeof dependencies>;
}

export const DependenciesWrapper = (
  dependencies: Partial<ReturnType<typeof useDependencies>>
) =>
  createWrapper(Dependencies.Provider, {
    value: dependencies,
  });
