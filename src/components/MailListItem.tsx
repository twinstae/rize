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
import { HStack, VStack } from './rize-ui-web';

function ItemBody({ subject, bodyText, labelId }: { labelId: string, subject: string, bodyText: string }){
	const { replaceUsername } = useUsername();
	const [keyword] = useMailList().useSearch();

	return (
		<>
			<h3
				id={labelId}
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
		</>
	);
}
function ItemProfileImage({ member, mailId }: { mailId: string, member: string }){
	const isUnread = useTags().useIsUnread(mailId);
	return (
		<ProfileImage member={member} size="base" className={`${isUnread ? 'unread' : ''} mr-2`} />
	);
}

interface MailListItemProps {
	mail: RawMailT & MailBodyT & { bodyText: string };
	style?: CSSProperties;
	index: number
}

function MailListItem({ mail, style, index }: MailListItemProps) {
	const { Link } = useNavigation();

	const labelId = useId();
	return (
		<li
			className="p-1 border-b-1 border-base-200 relative focus-within:ring-2"
			style={style}
			aria-labelledby={labelId}
		>
			<FavoriteStar mailId={mail.id} />
			<Link to={toMailDetail(mail.id)} data-index={index} className="virtual-item">
				<ItemProfileImage member={mail.member} mailId={mail.id} />
				<VStack>
					<HStack className="gap-2">
						<span>{mail.member}</span>
						<time className="text-gray-500 w-fit" dateTime={mail.time.replaceAll('/', '-')}>{mail.time.slice(2, 10)}</time>
						<TagList mailId={mail.id} />
					</HStack>
					<ItemBody labelId={labelId} subject={mail.subject} bodyText={mail.bodyText} />
				</VStack>
			</Link>
		</li>
	);
}

export default MailListItem;
