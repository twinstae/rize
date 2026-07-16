import React from 'react';
import { useTranslation } from '../../i18n/i18n';

import useLang from '../../config/useLang';
import { strs } from '../../i18n/i18n';
import ConfigCard from './ConfigCard';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '../../components/ui/select';

function LangConfig() {
	const { lang, setLang, langList } = useLang();
	const { t } = useTranslation();

	const items = langList.map((value) => ({
		value,
		label: t(strs[value]),
	}));

	return (
		<ConfigCard title={`${t(strs.언어_선택하기)} : ${lang}`}>
			<div className="flex max-w-xs flex-col gap-2 text-sm text-[var(--rize-text-secondary)]">
				<Select
					value={lang}
					onValueChange={(value) => {
						if (value) {
							setLang(value);
						}
					}}
					items={items}
				>
					<SelectLabel>{t(strs.언어)}</SelectLabel>
					<SelectTrigger className="w-full">
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							{langList.map((value) => (
								<SelectItem key={value} value={value}>
									{t(strs[value])}
								</SelectItem>
							))}
						</SelectGroup>
					</SelectContent>
				</Select>
			</div>
		</ConfigCard>
	);
}

export default LangConfig;
