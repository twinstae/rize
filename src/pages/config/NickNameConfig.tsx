import { Box, FormLabel, Input, VStack } from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import useUsername from '../../config/useUsername';
import { strs } from '../../i18n/i18n';
import ConfigHeading from './ConfigHeading';

function NickNameConfig() {
  const { t } = useTranslation();
  const {before, after, setBefore, setAfter, replaceUsername} = useUsername();

  return (
    <VStack align="stretch">
      <ConfigHeading title={t(strs.닉네임_바꾸기)}/>
      <FormLabel>
        <Input value={before} onChange={(e) => setBefore(e.target.value)} />{t(strs.에서)}
      </FormLabel>
      <FormLabel>
        <Input value={after} onChange={(e) => setAfter(e.target.value)} />{t(strs.으로)}
      </FormLabel>
      <Box>
        {t(strs.예시)}: {replaceUsername(`안녕 ${before}, 오늘도 화이팅!`)}
      </Box>
    </VStack>
  );
}

export default NickNameConfig;