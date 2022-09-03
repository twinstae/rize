import React from 'react';

import { MEMBER_LIST } from '../constants';
import useTag from '../mailList/useTag';
import ProfileImage from './ProfileImage';

interface MemberListItemProps {
  name: string;
  text: string;
}

function MemberListItem({ name, text }: MemberListItemProps) {
  const [tag, setTag] = useTag();

  const selected = name === tag;
  return (
    <li>
      <button
        onClick={() => {
          setTag(name);
        }}
        style={{
          width: '100%',
          textAlign: 'left',
          borderLeft: '3px solid ' + (selected ? '#ff69b4' : 'lightgrey'),
          transition: 'border 125ms ease',
          borderRadius: '0',
          marginBottom: '0.5rem',
          padding: '0.25rem'
        }}
        className="mb-2 p-1 pl-3"
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
