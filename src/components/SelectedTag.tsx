import React from 'react';

import { IZONE, MEMBER_LIST } from '../constants';
import useTag from '../mailList/useTag';
import ProfileImage from './ProfileImage';

function SelectedTag() {
  const [tag] = useTag();
  return tag ? (
    <span data-testid="selected-tag">
      {MEMBER_LIST.includes(tag as IZONE) && <ProfileImage member={tag} size="sm" />}
      {tag}
    </span>
  ) : null;
}

export default SelectedTag;
