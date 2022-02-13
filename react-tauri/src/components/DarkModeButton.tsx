import React from "react";
import { useTheme } from "../theme/useTheme";

export const RawDarkModeButton = () => {
  const { isDark, toggleDark } = useTheme();

  return (
    <button onClick={() => toggleDark()}>{isDark ? "다크" : "컬러"}</button>
  );
};

export default RawDarkModeButton;
