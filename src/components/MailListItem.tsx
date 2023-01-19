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

function ItemBody({ subject, bodyText, labelId }: { labelId: string, subject: string, bodyText: string }){
	const { replaceUsername } = useUsername();
	const [keyword] = useMailList().useSearch();

	return (
		<label id={labelId}>
			<h3
				className="p-0 m-0 overflow-hidden text-ellipsis font-bold"
				// rome-ignore lint/security/noDangerouslySetInnerHtml: <for marked highlighed>
				dangerouslySetInnerHTML={{
					__html: highlight(subject, keyword),
				}}
			/>
			<p
				className="w-full p-0 overflow-hidden text-ellipsis nowrap"
				// rome-ignore lint/security/noDangerouslySetInnerHtml: <for marked highlighed>
				dangerouslySetInnerHTML={{
					__html: highlight(replaceUsername(bodyText), keyword),
				}}
			/>
		</label>
	);
}
function ItemProfileImage({ member, mailId }: { mailId: string, member: string }){
	const isUnread = useTags().useIsUnread(mailId);
	return (
		<ProfileImage member={member} size="base" className={isUnread ? 'unread' : undefined} />
	);
}

interface MailListItemProps {
	mail: RawMailT & MailBodyT & { bodyText: string };
	style?: CSSProperties;
}

function MailListItem({ mail, style }: MailListItemProps) {
	const { Link } = useNavigation();

	const labelId = useId();
	return (
		<li
			className="p-2 border-b-1 border-base-200 relative focus-within:ring-2"
			style={style}
			aria-labelledby={labelId}
		>
			<Link to={toMailDetail(mail.id)}>
				<div className="relative">
					<ItemProfileImage member={mail.member} mailId={mail.id} />
					<FavoriteStar mailId={mail.id} />
					<div className="flex flex-row flex-wrap gap-1">
						<span>{mail.member}</span>
						<span className="text-gray-500 w-fit">{mail.time.slice(2, 10)}</span>
						<TagList mailId={mail.id} />
					</div>
					<ItemBody labelId={labelId} subject={mail.subject} bodyText={mail.bodyText} />
				</div>
			</Link>
		</li>
	);
}

export default MailListItem;
