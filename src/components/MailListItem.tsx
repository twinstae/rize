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
import useLang from '../config/useLang';

function ItemBody({
	subject,
	bodyText,
	labelId,
	date,
	tags,
}: {
	labelId: string;
	subject: string;
	bodyText: string;
	date: React.ReactNode;
	tags: React.ReactNode;
}) {
	const { replaceUsername } = useUsername();
	const [keyword] = useMailList().useSearch();

	return (
		<div className="min-w-0">
			<div className="flex min-w-0 items-baseline gap-2">
				<h3
					id={labelId}
					className="min-w-0 flex-1 truncate text-sm font-semibold leading-5 text-[var(--rize-text)]"
					// rome-ignore lint/security/noDangerouslySetInnerHtml: <for marked highlighed>
					dangerouslySetInnerHTML={{
						__html: highlight(subject, keyword),
					}}
				/>
				{date}
			</div>
			<div className="mt-0.5 flex min-w-0 items-center gap-2">
				<p
					className="min-w-0 flex-1 truncate text-xs leading-4 text-[var(--rize-muted)]"
					// rome-ignore lint/security/noDangerouslySetInnerHtml: <for marked highlighed>
					dangerouslySetInnerHTML={{
						__html: highlight(replaceUsername(bodyText), keyword),
					}}
				/>
				{tags}
			</div>
		</div>
	);
}
function ItemProfileImage({ member, mailId }: { mailId: string; member: string }) {
	const isUnread = useTags().useIsUnread(mailId);
	return (
		<div className="relative shrink-0">
			<ProfileImage
				member={member}
				size="md"
				className="h-10 w-10 border-2 border-white bg-[var(--rize-surface)] object-cover shadow-sm"
			/>
			{isUnread && (
				<span
					aria-label="unread"
					className="absolute -right-0.5 top-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-pink-500"
				/>
			)}
		</div>
	);
}

interface MailListItemProps {
	mail: RawMailT & MailBodyT & { bodyText: string };
	style?: CSSProperties;
	index: number
}

function MailListItem({ mail, style, index }: MailListItemProps) {
	const { Link } = useNavigation();
	const { lang } = useLang();

	const labelId = useId();

	const date = new Date(mail.time.replaceAll('/', '-').replace(' ', 'T'));
	return (
		<li
			className="group relative px-3 focus-within:ring-2 focus-within:ring-pink-400 sm:px-4"
			style={style}
			aria-labelledby={labelId}
		>
			<Link
				to={toMailDetail(mail.id)}
				data-index={index}
				aria-label={`${mail.member}, ${mail.subject}`}
				className="virtual-item flex h-full min-w-0 items-center gap-2.5 border-b border-slate-100 py-2 pr-9 transition-colors hover:bg-[var(--rize-hover)]"
			>
				<ItemProfileImage member={mail.member} mailId={mail.id} />
				<ItemBody
					labelId={labelId}
					subject={mail.subject}
					bodyText={mail.bodyText}
					date={
						<time
							className="shrink-0 text-[10px] font-medium tabular-nums text-[var(--rize-muted)]"
							dateTime={date.toISOString()}
						>
							<abbr
								className="no-underline"
								aria-label={new Intl.DateTimeFormat(lang, {
									weekday: 'long',
									year: 'numeric',
									month: 'long',
									day: 'numeric',
								}).format(date)}
							>
								{mail.time.slice(2, 10)}
							</abbr>
						</time>
					}
					tags={<TagList mailId={mail.id} />}
				/>
			</Link>
			<FavoriteStar mailId={mail.id} />
		</li>
	);
}

export default MailListItem;
