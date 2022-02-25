import React from "react";
import { withTranslation } from "react-i18next";
import { strs } from "../i18n/i18n";
import { useDependencies } from "../hooks/Dependencies";
import { Button } from "@chakra-ui/react";

interface RawDarkModeButtonProps extends TranslationProps {}

export const RawDarkModeButton = ({ t }: RawDarkModeButtonProps) => {
  const { isDark, toggleDark } = useDependencies();

  return (
    <Button onClick={() => toggleDark()} marginLeft="2">
      {t(isDark ? strs.다크 : strs.컬러)}
    </Button>
  );
};

export default withTranslation()(RawDarkModeButton);
