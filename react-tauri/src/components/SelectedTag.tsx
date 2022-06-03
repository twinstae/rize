import React from 'react';

import { IZONE, MEMBER_LIST } from '../constants';
import { useDependencies } from '../hooks/Dependencies';
import ProfileImage from './ProfileImage';

function SelectedTag() {
  const { tag } = useDependencies();
  return tag ? (
    <>
      {MEMBER_LIST.includes(tag as IZONE) && <ProfileImage member={tag} size="sm" />}
      <span>{tag}</span>
    </>
  ) : null;
}

export default SelectedTag;
