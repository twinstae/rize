import React from 'react';
import { FAVORITE, UNREAD } from '../mailList/useMailList';
import { useTags } from '../hooks/Dependencies';

interface TagListProps {
  mailId: string;
}

function TagList({ mailId }: TagListProps) {
  const { useMailTags } = useTags();
  const tags = useMailTags(mailId);

  return (
    <>
      {tags
        .filter((tag) => tag !== FAVORITE && tag !== UNREAD)
        .map((content) => (
          <li key={content}>
            <span className="badge badge-primary">
              {content}
            </span>
          </li>
        ))}
    </>
  );
}

export default TagList;
