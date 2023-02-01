import React from 'react';

import { IZONE, MEMBER_LIST } from '../constants';
import useTag from '../mailList/useTag';
import ProfileImage from './ProfileImage';
import { strs, useTranslation } from '../i18n/i18n';
import { HStack, Text } from './rize-ui-web';

function SelectedTag() {
	const { t } = useTranslation();
	const [tag] = useTag();
	return (
		<HStack data-testid="selected-tag" className='text-lg'>
			{<ProfileImage member={MEMBER_LIST.includes(tag as IZONE) ? tag : ''} size="md" />}
			<Text className='ml-2'>{tag || t(strs.전체)}</Text>
		</HStack>
	);
}

export default SelectedTag;
