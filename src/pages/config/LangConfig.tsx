import React from 'react';
import { useTranslation } from '../../i18n/i18n';

import useLang from '../../config/useLang';
import { strs } from '../../i18n/i18n';
import ConfigCard from './ConfigCard';

function LangConfig() {
	const { lang, setLang, langList } = useLang();
	const { t } = useTranslation();
	return (
		<ConfigCard title={`${t(strs.언어_선택하기)} : ${lang}`}>
			<label>
				{t(strs.언어)}{' '}
				{lang && (
					<select
						className="select select-bordered select-sm"
						defaultValue={lang}
						onChange={(e) => {
							setLang(e.currentTarget.value);
						}}
					>
						{langList.map((value) => (
							<option key={value} value={value}>
								{t(strs[value])}
							</option>
						))}
					</select>
				)}
			</label>
		</ConfigCard>
	);
}

export default LangConfig;
