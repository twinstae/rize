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
			<label className="flex flex-col gap-2 text-sm text-[var(--rize-text-secondary)]">
				<span className="font-medium text-[var(--rize-text)]">{t(strs.언어)}</span>
				{lang && (
					<select
						className="rize-input input-sm w-full max-w-xs"
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
