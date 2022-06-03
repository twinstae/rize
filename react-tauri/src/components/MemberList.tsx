import React from 'react';

import { MEMBER_LIST } from '../constants';
import { useDependencies } from '../hooks/Dependencies';
import ProfileImage from './ProfileImage';

interface MemberListItemProps {
  name: string;
  text: string;
}

function MemberListItem({ name, text }: MemberListItemProps) {
  const { tag, setTag } = useDependencies();

  const selected = name === tag;
  return (
    <li key={name}>
      <button
        onClick={() => {
          setTag(name);
        }}
        style={{
          width: '16rem',
          textAlign: 'left',
          borderLeft: '2px solid ' + (selected ? '#ff69b4' : 'lightgrey'),
          padding: '0.5rem 1rem',
          transition: 'border 125ms ease',
        }}
        aria-selected={selected}
      >
        <ProfileImage member={name} size="sm" /> {text || name}
      </button>
    </li>
  );
}

function MemberList() {
  return (
    <ul
      style={{
        listStyle: 'none',
      }}
    >
      <MemberListItem name="" text="전체" />
      {MEMBER_LIST.map((name) => (
        <MemberListItem key={name} name={name} text={name} />
      ))}
    </ul>
  );
}

export default MemberList;
