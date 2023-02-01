
import React, { useState } from 'react';
import { FormLabel, TextInput } from '../../components/rize-ui-web';
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
			<FormLabel>
				<TextInput
					className="input-sm"
					name="username-before"
					value={beforeInput}
					onChange={(e) => {
						setBeforeInput(e.currentTarget.value);
						setBefore(e.currentTarget.value);
					}}
				/>
				{t(strs.에서)}
			</FormLabel>
			<FormLabel>
				<TextInput
					className="input-sm"
					name="username-after"
					value={afterInput}
					onChange={(e) => {
						setAfterInput(e.currentTarget.value);
						setAfter(e.currentTarget.value);
					}}
				/>
				{t(strs.으로)}
			</FormLabel>
			<div>
				<h4 className="font-bold">{t(strs.예시)}</h4>
				<span>
					안녕 <strong>{before}</strong>, 오늘도 화이팅!
				</span>
				<br />
				<span>
					안녕 <strong>{after}</strong>, 오늘도 화이팅!
				</span>
			</div>
		</ConfigCard>
	);
}

export default NickNameConfig;
