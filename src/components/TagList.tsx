import React from 'react';
import { FAVORITE } from '../mailList/useMailList';
import { useTags } from '../hooks/Dependencies';

interface TagListProps {
  mailId: string;
}

function TagList({ mailId }: TagListProps) {
  const { useMailTags } = useTags();
  const tags = useMailTags(mailId);

  return (
    <ul>
      {tags
        .filter((tag) => tag !== FAVORITE)
        .map((content) => (
          <li key={content}>
            <span className="badge badge-primary">
              {content}
            </span>
          </li>
        ))}
    </ul>
  );
}

export default TagList;
