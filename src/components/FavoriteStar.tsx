import React from 'react';

import EmptyStarIcon from './icons/EmptyStarIcon';
import { FAVORITE } from '../mailList/mailListModel';
import IconButtonWithTooltip from './IconButtonWithTooltip';
import { useTags } from '../hooks/Dependencies';
import StarIcon from './icons/StarIcon';
import { strs, useTranslation } from '../i18n/i18n';

interface FavoriteStarProps {
	mailId: string;
}

function FavoriteStar({ mailId }: FavoriteStarProps) {
	const { t } = useTranslation();
	const { useToggleTagToMail, useIsFavorited } = useTags();
	const toggleTagToMail = useToggleTagToMail();
	const mailIsFavorited = useIsFavorited(mailId);

	const toggleFavorite = () => {
		toggleTagToMail(FAVORITE, mailId);
	};

	return (
		<IconButtonWithTooltip
			className="top-0 right-0 absolute"
			onClick={(e: React.MouseEvent) => {
				e.preventDefault();
				e.stopPropagation();
				toggleFavorite();
			}}
			direction="left"
			circle="circle"
			size="sm"
			icon={mailIsFavorited ? <StarIcon className="text-yellow-400" /> : <EmptyStarIcon className="text-slate-400" />}
			ariaLabel={mailIsFavorited ? t(strs.중요_취소) : t(strs.중요_표시)}
		/>
	);
}

export default FavoriteStar;
