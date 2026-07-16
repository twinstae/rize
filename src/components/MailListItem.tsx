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
}: {
	labelId: string;
	subject: string;
	bodyText: string;
}) {
	const { replaceUsername } = useUsername();
	const [keyword] = useMailList().useSearch();

	return (
		<div className="min-w-0 flex-1">
			<h3
				id={labelId}
				className="m-0 truncate text-[15px] leading-5 font-semibold text-[var(--rize-text)]"
				// rome-ignore lint/security/noDangerouslySetInnerHtml: <for marked highlighed>
				dangerouslySetInnerHTML={{
					__html: highlight(subject, keyword),
				}}
			/>
			<p
				className="mt-0.5 truncate text-[13px] leading-[18px] text-[var(--rize-muted)]"
				// rome-ignore lint/security/noDangerouslySetInnerHtml: <for marked highlighed>
				dangerouslySetInnerHTML={{
					__html: highlight(replaceUsername(bodyText), keyword),
				}}
			/>
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
				className="h-11 w-11 border-2 border-white bg-[var(--rize-surface)] object-cover shadow-sm"
			/>
			{isUnread && (
				<span
					aria-label="unread"
					className="absolute -right-0.5 top-0 h-3 w-3 rounded-full border-2 border-white bg-pink-500"
				/>
			)}
		</div>
	);
}

interface MailListItemProps {
	mail: RawMailT & MailBodyT & { bodyText: string };
	style?: CSSProperties;
	index: number;
}

function MailListItem({ mail, style, index }: MailListItemProps) {
	const { Link } = useNavigation();
	const { lang } = useLang();

	const labelId = useId();

	const date = new Date(mail.time.replaceAll('/', '-').replace(' ', 'T'));
	return (
		<li
			className="group px-4 focus-within:ring-2 focus-within:ring-pink-400/60 sm:px-5"
			style={style}
			aria-labelledby={labelId}
		>
			<Link
				to={toMailDetail(mail.id)}
				data-index={index}
				aria-label={`${mail.member}, ${mail.subject}`}
				className="virtual-item flex h-full min-w-0 items-center gap-3 border-b border-[var(--rize-border)] py-3.5 transition-colors hover:bg-[var(--rize-hover)]"
			>
				<ItemProfileImage member={mail.member} mailId={mail.id} />
				<ItemBody labelId={labelId} subject={mail.subject} bodyText={mail.bodyText} />
				<div className="flex shrink-0 flex-col items-end gap-2 self-stretch py-0.5">
					<time
						className="text-xs font-medium tabular-nums text-[var(--rize-muted)]"
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
					<FavoriteStar mailId={mail.id} inline />
					<TagList mailId={mail.id} />
				</div>
			</Link>
		</li>
	);
}

export default MailListItem;
