import React, { useContext, useState } from "react";

type ThemeT = {
  isDark: boolean;
  toggleDark: () => void;
};

export const Theme = React.createContext<ThemeT>({
  isDark: false,
  toggleDark: () => {},
});

export function useTheme() {
  return useContext(Theme);
}

export const ThemeWrapper = ({ children }: ChildrenProps) => {
  const [isDark, setDark] = useState(true);

  return (
    <Theme.Provider
      value={{ isDark, toggleDark: () => setDark((prev) => !prev) }}
    >
      {children}
    </Theme.Provider>
  );
};
