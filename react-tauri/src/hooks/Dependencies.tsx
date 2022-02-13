import React, { useContext } from "react";

type DependencyT = {
  setTag?: (tag: string) => void;
  navigateMailDetail?: (mailId: string) => void;
  toNick?: (member: IZONE) => string;
};

export const Dependencies = React.createContext<DependencyT>({});

export function useDependencies() {
  const dependencies = useContext(Dependencies);
  return dependencies as Required<typeof dependencies>;
}

export const DependenciesWrapper =
  (dependencies: Partial<ReturnType<typeof useDependencies>>) =>
  ({ children }: ChildrenProps) =>
    (
      <Dependencies.Provider value={dependencies}>
        {children}
      </Dependencies.Provider>
    );
