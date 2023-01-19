import React from 'react';

import { IZONE, MEMBER_LIST } from '../constants';
import useTag from '../mailList/useTag';
import ProfileImage from './ProfileImage';
import { strs, useTranslation } from '../i18n/i18n';

function SelectedTag() {
	const { t } = useTranslation();
	const [tag] = useTag();
	return (
		<span data-testid="selected-tag" className='text-lg'>
			{<ProfileImage member={MEMBER_LIST.includes(tag as IZONE) ? tag : ''} size="sm" />}
			<span className='ml-2'>{tag || t(strs.전체)}</span>
		</span>
	);
}

export default SelectedTag;
