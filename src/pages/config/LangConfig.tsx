import { Box, Select } from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import useLang from '../../config/useLang';
import { strs } from '../../i18n/i18n';
import ConfigHeading from './ConfigHeading';

function LangConfig() {
  const {lang, setLang, langList} = useLang();
  const { t } = useTranslation();
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

export default LangConfig;