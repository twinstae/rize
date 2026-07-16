import React from 'react';

import { IZONE, MEMBER_LIST } from '../constants';
import useTag from '../mailList/useTag';
import ProfileImage from './ProfileImage';
import { strs, useTranslation } from '../i18n/i18n';

function SelectedTag() {
	const { t } = useTranslation();
	const [tag] = useTag();
	return (
		<span
			data-testid="selected-tag"
			className="inline-flex max-w-32 items-center gap-1.5 truncate rounded-full bg-pink-50 px-2.5 py-1 text-xs font-semibold text-pink-600"
		>
			{MEMBER_LIST.includes(tag as IZONE) && (
				<ProfileImage member={tag} size="sm" className="h-4 w-4 object-cover" />
			)}
			{tag || t(strs.전체)}
		</span>
	);
}

export default SelectedTag;
