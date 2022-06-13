import { Box, FormLabel, Input, VStack } from '@chakra-ui/react';
import debounce from 'lodash/debounce';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import useUsername from '../../config/useUsername';
import { strs } from '../../i18n/i18n';
import ConfigHeading from './ConfigHeading';

const debounceSetBefore = debounce((text, setBefore) => setBefore(text), 200);
const debounceSetAfter = debounce((text, setAfter) => setAfter(text), 200);

function NickNameConfig() {
  const { t } = useTranslation();
  const {before, after, setBefore, setAfter, replaceUsername} = useUsername();

  const [beforeInput, setBeforeInput] = useState(before);
  const [afterInput, setAfterInput] = useState(after);

  return (
    <VStack align="stretch">
      <ConfigHeading title={t(strs.닉네임_바꾸기)}/>
      <FormLabel>
        <Input value={beforeInput} onChange={(e) => {
          setBeforeInput(e.target.value);
          debounceSetBefore(e.target.value, setBefore);
        }} />{t(strs.에서)}
      </FormLabel>
      <FormLabel>
        <Input value={afterInput} onChange={(e) => {
          setAfterInput(e.target.value);
          debounceSetAfter(e.target.value, setAfter);
        }} />{t(strs.으로)}
      </FormLabel>
      <Box>
        <h4>{t(strs.예시)}</h4>
        <span>안녕 {beforeInput}, 오늘도 화이팅!</span>
        <br />
        <span>{replaceUsername(`안녕 ${before}, 오늘도 화이팅!`)}</span>
      </Box>
    </VStack>
  );
}

export default NickNameConfig;
