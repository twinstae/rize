import React from "react";
import { useTheme } from "../hooks/useTheme";
import { withTranslation } from "react-i18next";
import { strs } from "../i18n/i18n";

interface RawDarkModeButtonProps extends TranslationProps {}

export const RawDarkModeButton = ({ t }: RawDarkModeButtonProps) => {
  const { isDark, toggleDark } = useTheme();

  return (
    <button onClick={() => toggleDark()}>
      {t(isDark ? strs.다크 : strs.컬러)}
    </button>
  );
};

export default withTranslation()(RawDarkModeButton);
