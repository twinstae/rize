import React from 'react';

import useProfile from '../config/useProfile';
import { useDependencies, useMailList } from '../hooks/Dependencies';
import { rem } from '../theme/rem';

interface Props {
  member: string;
  size: keyof typeof sizes;
  theme?: string;
}

function getPath(member: string, theme?: string) {
  const { profile } = useProfile();
  const toOriginalName = useMailList().useToOriginalName();
  const selectedTheme = theme || profile;

  if (member === '') return 'img/izone-logo.png';
  if (member === '운영팀') return 'img/izone-logo.png';
  return `img/profile/${selectedTheme}/${toOriginalName(member)}.jpg`;
}

const sizes = {
  base: rem(3) / 4,
  md: rem(2) / 4,
  sm: rem(1.5) / 4,
};

const ProfileImage: React.FC<Props> = ({ member, size = 'base', theme }) => {
  const { Image } = useDependencies();

  return (
    <Image
      path={getPath(member, theme)}
      style={{
        float: 'left',
        borderRadius: '50%',
        marginRight: '0.5rem',
      }}
      width={sizes[size]}
    />
  );
};

export default ProfileImage;
