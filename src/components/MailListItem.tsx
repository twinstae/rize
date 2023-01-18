import React, { CSSProperties, useId } from 'react';

import useUsername from '../config/useUsername';
import type { MailBodyT, RawMailT } from '../mailList/types';
import { toMailDetail } from '../router/paths';
import useNavigation from '../router/useNavigation';
import FavoriteStar from './FavoriteStar';
import ProfileImage from './ProfileImage';
import TagList from './TagList';
import { useMailList, useTags } from '../hooks/Dependencies';
import highlight from '../search/highlight';

interface MailListItemProps {
	mail: RawMailT & MailBodyT & { bodyText: string };
	style?: CSSProperties;
}

function MailListItem({ mail, style }: MailListItemProps) {
	const navigation = useNavigation();
	const Link = navigation.Link;

	const { replaceUsername } = useUsername();
	const { isUnread } = useTags();
	const [keyword] = useMailList().useSearch();

	const labelId = useId();
	return (
		<li
			className={`p-2 border-b-1 border-base-200 relative ${isUnread(mail.id) && 'unread'}`}
			style={style}
			aria-labelledby={labelId}
		>
			<Link to={toMailDetail(mail.id)}>
				<div className="relative">
					<ProfileImage member={mail.member} size="base" className="mr-2" />
					<FavoriteStar mailId={mail.id} />
					<div className="flex flex-row flex-wrap gap-1">
						<span>{mail.member}</span>
						<span className="text-gray-500 w-fit">{mail.time.slice(2, 10)}</span>
						<TagList mailId={mail.id} />
					</div>
					<label id={labelId}>
						<h3
							className="p-0 m-0 overflow-hidden text-ellipsis font-bold"
							dangerouslySetInnerHTML={{
								__html: highlight(mail.subject, keyword),
							}}
						></h3>
						<p
							className="w-full p-0 overflow-hidden text-ellipsis nowrap"
							dangerouslySetInnerHTML={{
								__html: highlight(replaceUsername(mail.bodyText), keyword),
							}}
						></p>
					</label>
				</div>
			</Link>
		</li>
	);
}

export default MailListItem;
