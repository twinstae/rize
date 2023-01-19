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
		<ul>
			{tags
				.filter((tag) => tag !== FAVORITE && tag !== UNREAD)
				.map((content) => (
					<li key={content} className="badge badge-primary" aria-label={content}>
						{content}
					</li>
				))}
		</ul>
	);
}

export default TagList;
