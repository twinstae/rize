import React, { useEffect, useRef } from 'react';

import { MEMBER_LIST } from '../constants';
import useTag from '../mailList/useTag';
import ProfileImage from './ProfileImage';
import { strs, useTranslation } from '../i18n/i18n';

interface MemberListItemProps {
	name: string;
	text: string;
}

function MemberListItem({ name, text }: MemberListItemProps) {
	const [tag, setTag] = useTag();
	const ref = useRef<HTMLInputElement>(null);
	const id = React.useId();

	const checked = name === tag || text === tag;

	useEffect(() => {
		if (tag === name && ref.current !== document.activeElement) {
			ref.current?.focus();
		}
	}, [tag]);
	return (
		<div>
			<input
				id={id}
				ref={ref}
				type="radio"
				tabIndex={checked ? 0 : -1}
				value={name}
				name="selected-member"
				checked={checked}
				onChange={(e) => {
					setTag(e.target.value);
				}}
				className="member-item peer sr-only"
				onKeyDown={(event) => {
					if (
						['ArrowDown', 'ArrowRight'].includes(event.key) &&
						MEMBER_LIST.indexOf(tag as (typeof MEMBER_LIST)[number]) === MEMBER_LIST.length - 1
					) {
						event.preventDefault();
						setTag('');
					}
					if (['ArrowUp', 'ArrowLeft'].includes(event.key) && tag === '') {
						event.preventDefault();
						setTag(MEMBER_LIST['11']);
					}
				}}
			/>
			<label
				htmlFor={id}
				className="mb-1 flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold text-[var(--rize-text)] transition hover:bg-[var(--rize-surface)] peer-checked:bg-pink-50 peer-checked:text-pink-600 peer-focus-visible:ring-2 peer-focus-visible:ring-pink-400"
			>
				<ProfileImage
					member={name}
					size="sm"
					className="h-8 w-8 border border-white bg-[var(--rize-surface)] object-cover shadow-sm"
				/>
				<span className="truncate">{text}</span>
				{checked && <span className="ml-auto h-2 w-2 rounded-full bg-pink-500" />}
			</label>
		</div>
	);
}

function MemberList() {
	const { t } = useTranslation();
	return (
		<div className="h-fit w-full py-1" role="radiogroup">
			<MemberListItem name="" text={t(strs.전체)} />
			{MEMBER_LIST.map((name) => (
				<MemberListItem key={name} name={name} text={name} />
			))}
		</div>
	);
}

export default MemberList;
