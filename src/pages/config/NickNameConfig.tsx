
import React, { useState } from 'react';
import { FormLabel, TextInput, VStack } from '../../components/rize-ui-web';
import { useTranslation, strs } from '../../i18n/i18n';
import useUsername from '../../config/useUsername';
import ConfigCard from './ConfigCard';

function NickNameConfig() {
	const { t } = useTranslation();
	const { before, after, setBefore, setAfter } = useUsername();

	const [beforeInput, setBeforeInput] = useState(before);
	const [afterInput, setAfterInput] = useState(after);

	return (
		<ConfigCard title={t(strs.닉네임_바꾸기)}>
			<VStack className="gap-3">
				<FormLabel className="flex flex-col gap-2 text-sm">
					<span className="font-medium text-[var(--rize-text)]">{t(strs.에서)}</span>
					<TextInput
						name="username-before"
						value={beforeInput}
						onChange={(e) => {
							setBeforeInput(e.currentTarget.value);
							setBefore(e.currentTarget.value);
						}}
					/>
				</FormLabel>
				<FormLabel className="flex flex-col gap-2 text-sm">
					<span className="font-medium text-[var(--rize-text)]">{t(strs.으로)}</span>
					<TextInput
						name="username-after"
						value={afterInput}
						onChange={(e) => {
							setAfterInput(e.currentTarget.value);
							setAfter(e.currentTarget.value);
						}}
					/>
				</FormLabel>
			</VStack>
			<div className="rounded-2xl bg-[var(--rize-surface)] p-4 text-sm leading-6 text-[var(--rize-text-secondary)]">
				<p className="mb-2 font-semibold text-[var(--rize-text)]">{t(strs.예시)}</p>
				<p>
					안녕 <strong className="text-[var(--rize-text)]">{before}</strong>, 오늘도 화이팅!
				</p>
				<p>
					안녕 <strong className="text-pink-600">{after}</strong>, 오늘도 화이팅!
				</p>
			</div>
		</ConfigCard>
	);
}

export default NickNameConfig;
