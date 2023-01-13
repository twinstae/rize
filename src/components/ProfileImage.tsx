import React, { useRef } from 'react';

import useProfile from '../config/useProfile';
import { useDependencies, useMailList } from '../hooks/Dependencies';
import { rem } from '../theme/rem';
import useNavigation from '../router/useNavigation';
import paths from '../router/paths';

interface Props {
  member: string;
  size: keyof typeof sizes;
  theme?: string;
  className?: string;
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

const ProfileImage: React.FC<Props> = ({ member, size = 'base', theme, className }) => {
  const { Image } = useDependencies();
  const { current, navigate } = useNavigation();
  const timeoutRef = useRef<NodeJS.Timeout | number | undefined>(undefined);

  function job(){
    if (current() !== paths.CONFIG){
      navigate(paths.CONFIG);
    }
  }
  const duration = 2000;
  function start(){
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(job, duration);
  }

  function end(){
    clearTimeout(timeoutRef.current);
  }

  return (
    <Image
      path={getPath(member, theme)}
      style={{
        float: 'left',
        borderRadius: '50%',
      }}
      onMouseDown={() => { start()}}
      onMouseOut={() => { end() }}
      onMouseUp={() => { end() }}
      className={className}
      width={sizes[size]}
    />
  );
};

export default ProfileImage;
