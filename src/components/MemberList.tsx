import React from 'react';

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

	const selected = name === tag;
	return (
		<li className="flex flex-col gap-2 w-10/12">
			<button
				onClick={() => {
					setTag(name);
				}}
				className="member-item mb-2 p-1 pl-3 text-left border-l-3"
				aria-selected={selected}
			>
				<ProfileImage member={name} size="sm" /> {text}
			</button>
		</li>
	);
}

function MemberList() {
	const { t } = useTranslation();
	return (
		<ul className="list-none w-full h-fit">
			<MemberListItem name="" text={t(strs.전체)} />
			{MEMBER_LIST.map((name) => (
				<MemberListItem key={name} name={name} text={name} />
			))}
		</ul>
	);
}

export default MemberList;
