import React from 'react';

import EmptyStarIcon from './icons/EmptyStarIcon';
import { FAVORITE } from '../mailList/useMailList';
import IconButtonWithTooltip from './IconButtonWithTooltip';
import { useTags } from '../hooks/Dependencies';
import StarIcon from './icons/StarIcon';

interface FavoriteStarProps {
	mailId: string;
}

function FavoriteStar({ mailId }: FavoriteStarProps) {
	const { addTagToMail, removeTagFromMail, isFavorited } = useTags();
	const mailIsFavorited = isFavorited(mailId);
	const toggleFavorite = () => {
		if (mailIsFavorited) {
			removeTagFromMail(FAVORITE, mailId);
		} else {
			addTagToMail(FAVORITE, mailId);
		}
	};

	return (
		<IconButtonWithTooltip
			className="rounded-full top-0 right-0 absolute tooltip-left"
			onClick={(e) => {
				e.preventDefault();
				e.stopPropagation();
				toggleFavorite();
			}}
			icon={mailIsFavorited ? <StarIcon className="text-yellow-400" /> : <EmptyStarIcon className="text-slate-400" />}
			aria-label={mailIsFavorited ? '중요 취소' : '중요 표시'}
		/>
	);
}

export default FavoriteStar;
