import React from "react";
import { useTheme } from "../theme/useTheme";
import { withTranslation } from "react-i18next";

interface RawDarkModeButtonProps extends TranslationProps {}

export const RawDarkModeButton = ({ t }: RawDarkModeButtonProps) => {
  const { isDark, toggleDark } = useTheme();

  return (
    <button onClick={() => toggleDark()}>{t(isDark ? "다크" : "컬러")}</button>
  );
};

export default withTranslation()(RawDarkModeButton);
