import { FormLabel, Input, VStack } from '../../components/rize-ui';
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
  const { before, after, setBefore, setAfter, replaceUsername } = useUsername();

  const [beforeInput, setBeforeInput] = useState(before);
  const [afterInput, setAfterInput] = useState(after);

  return (
    <VStack className="card bg-base-100 ring-1 ring-slate-300 shadow-xl p-4">
      <ConfigHeading title={t(strs.닉네임_바꾸기)} />
      <FormLabel>
        <Input
          className="input-sm"
          value={beforeInput}
          onChange={(e) => {
            setBeforeInput(e.target.value);
            debounceSetBefore(e.target.value, setBefore);
          }}
        />
        <span className="label-text">{t(strs.에서)}</span>
      </FormLabel>
      <FormLabel>
        <Input
          className="input-sm"
          value={afterInput}
          onChange={(e) => {
            setAfterInput(e.target.value);
            debounceSetAfter(e.target.value, setAfter);
          }}
        />
        <span className="label-text">{t(strs.으로)}</span>
      </FormLabel>
      <div>
        <h4 className="font-bold">{t(strs.예시)}</h4>
        <span>안녕 <strong>{beforeInput}</strong>, 오늘도 화이팅!</span>
        <br />
        <span>안녕 <strong>{replaceUsername(before)}</strong>, 오늘도 화이팅!</span>
      </div>
    </VStack>
  );
}

export default NickNameConfig;
