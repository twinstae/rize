import React from 'react';

import useProfile from '../config/useProfile';
import { toOriginalName } from '../constants';
import { useDependencies } from '../hooks/Dependencies';

interface Props {
  member: string;
  size: keyof typeof sizes;
  theme?: string;
}

function getPath(member: string, theme?: string) {
  const {profile} = useProfile();
  const selectedTheme = theme || profile;

  if (member === '') return 'img/izone-logo.png';
  if (member === '운영팀') return 'img/izone-logo.png';

  return `img/profile/${selectedTheme}/${toOriginalName(member)}.jpg`;
}

const sizes = {
  base: '3rem',
  md: '2rem',
  sm: '1.5rem',
};

const ProfileImage: React.FC<Props> = ({ member, size = 'base', theme }) => {
  const { Image } = useDependencies();

  return (
    <Image
      path={getPath(member, theme)}
      style={{
        width: sizes[size],
        float: 'left',
        borderRadius: '50%',
        marginRight: '0.5rem',
      }}
    />
  );
};

export default ProfileImage;
