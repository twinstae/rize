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
		if (tag === name && ref.current !== document.activeElement){
			ref.current?.focus();
		}
	}, [tag]);
	return (
		<>
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
				className="member-item sr-only"
				onKeyDown={(event) => {
					if (['ArrowDown', 'ArrowRight'].includes(event.key) && MEMBER_LIST.indexOf(tag as typeof MEMBER_LIST[number]) === (MEMBER_LIST.length - 1)){
						event.preventDefault();
						setTag('');
					}
					if (['ArrowUp', 'ArrowLeft'].includes(event.key) && tag === ''){
						event.preventDefault();
						setTag(MEMBER_LIST['11']);
					}
				}}
			/>
			<label htmlFor={id} className="flex flex-row gap-2 p-2 border-l-3">
				<ProfileImage member={name} size="sm" /> {text}
			</label>
		</>
	);
}

function MemberList() {
	const { t } = useTranslation();
	return (
		<div className="w-full h-fit" role="radiogroup">
			<MemberListItem name="" text={t(strs.전체)} />
			{MEMBER_LIST.map((name) => (
				<MemberListItem key={name} name={name} text={name} />
			))}
		</div>
	);
}

export default MemberList;
