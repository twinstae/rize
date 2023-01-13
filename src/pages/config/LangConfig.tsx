import React from 'react';
import { useTranslation } from '../../i18n/i18n';

import useLang from '../../config/useLang';
import { strs } from '../../i18n/i18n';
import ConfigHeading from './ConfigHeading';

function LangConfig() {
  const { lang, setLang, langList } = useLang();
  const { t } = useTranslation();
  return (
    <div className="card bg-base-100 ring-1 ring-slate-300 shadow-xl p-4">
      <ConfigHeading title={t(strs.언어_선택하기) + ' : ' + lang} />
      <label>
        {t(strs.언어)}{' '}
        <select
          className="select select-bordered select-sm"
          value={lang}
          onChange={(e) => {
            setLang(e.target.value);
          }}
        >
          {langList.map((lang) => (
            <option key={lang} value={lang}>
              {t(strs[lang])}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}

export default LangConfig;
