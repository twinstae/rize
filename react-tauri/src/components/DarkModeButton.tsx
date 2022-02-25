import React from "react";
import { withTranslation } from "react-i18next";
import { strs } from "../i18n/i18n";
import { useDependencies } from "../hooks/Dependencies";

interface RawDarkModeButtonProps extends TranslationProps {}

export const RawDarkModeButton = ({ t }: RawDarkModeButtonProps) => {
  const { isDark, toggleDark } = useDependencies();

  return (
    <button onClick={() => toggleDark()}>
      {t(isDark ? strs.다크 : strs.컬러)}
    </button>
  );
};

export default withTranslation()(RawDarkModeButton);
