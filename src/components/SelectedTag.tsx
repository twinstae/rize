import React from 'react';

import { IZONE, MEMBER_LIST } from '../constants';
import useTag from '../mailList/useTag';
import ProfileImage from './ProfileImage';

function SelectedTag() {
  const [tag] = useTag();
  return tag ? (
    <span data-testid="selected-tag" className='text-lg'>
      {MEMBER_LIST.includes(tag as IZONE) && <ProfileImage member={tag} size="sm" />} <span className='ml-2'>{tag}</span>
    </span>
  ) : null;
}

export default SelectedTag;
