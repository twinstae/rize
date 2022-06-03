import { Box, Select } from '@chakra-ui/react';
import React from 'react';
import { withTranslation } from 'react-i18next';

import useLang from '../../config/useLang';
import { strs, TranslationProps } from '../../i18n/i18n';
import ConfigHeading from './ConfigHeading';

function LangConfig({t}: TranslationProps) {
  const {lang, setLang, langList} = useLang();
  return (
    <Box>
      <ConfigHeading title={t(strs.언어)}/>
      <Select placeholder={t(strs.언어_선택하기)} value={lang} onChange={(e) => {
        setLang(e.target.value);
      }}>
        {langList.map(lang => (
          <option key={lang} value={lang}>{t(strs[lang])}</option>
        ))}
      </Select>
    </Box>
  );
}

export default withTranslation()(LangConfig);