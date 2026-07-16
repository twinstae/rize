import React from 'react';
import { FAVORITE, UNREAD } from '../mailList/mailListModel';
import { useTags } from '../hooks/Dependencies';

interface TagListProps {
	mailId: string;
}

function TagList({ mailId }: TagListProps) {
	const { useMailTags } = useTags();
	const tags = useMailTags(mailId);

	return (
		<ul className="flex min-w-0 gap-1 overflow-hidden">
			{tags
				.filter((tag) => tag !== FAVORITE && tag !== UNREAD)
				.map((content) => (
					<li
						key={content}
						className="max-w-20 truncate rounded-full bg-pink-50 px-1.5 py-0.5 text-[10px] font-semibold text-pink-600"
						aria-label={content}
					>
						{content}
					</li>
				))}
		</ul>
	);
}

export default TagList;
