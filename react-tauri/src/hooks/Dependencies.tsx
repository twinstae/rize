import React, { useContext } from "react";
import { createWrapper } from "./util";

type DependencyT = {
  setTag?: (tag: string) => void;
  navigate?: (path: string) => void;
  toNick?: (member: IZONE) => string;
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
