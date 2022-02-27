import React from "react";
import { withTranslation } from "react-i18next";
import { strs } from "../i18n/i18n";
import { useDependencies } from "../hooks/Dependencies";
import { Button } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

interface RawDarkModeButtonProps extends TranslationProps {}

export const RawDarkModeButton = ({ t }: RawDarkModeButtonProps) => {
  const { isDark, toggleDark } = useDependencies();

  return (
    <Button onClick={() => toggleDark()} marginLeft="2" variant="ghost">
      {isDark ? <MoonIcon /> : <SunIcon />}
      {t(isDark ? strs.다크 : strs.밝게)}
    </Button>
  );
};

export default withTranslation()(RawDarkModeButton);
