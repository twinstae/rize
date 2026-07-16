import React from 'react';

import EmptyStarIcon from './icons/EmptyStarIcon';
import { FAVORITE } from '../mailList/mailListModel';
import IconButtonWithTooltip from './IconButtonWithTooltip';
import { useTags } from '../hooks/Dependencies';
import StarIcon from './icons/StarIcon';
import { strs, useTranslation } from '../i18n/i18n';

interface FavoriteStarProps {
	mailId: string;
	inline?: boolean;
}

function FavoriteStar({ mailId, inline = false }: FavoriteStarProps) {
	const { t } = useTranslation();
	const { useToggleTagToMail, useIsFavorited } = useTags();
	const toggleTagToMail = useToggleTagToMail();
	const mailIsFavorited = useIsFavorited(mailId);

	const toggleFavorite = () => {
		toggleTagToMail(FAVORITE, mailId);
	};

	return (
		<IconButtonWithTooltip
			className={
				inline
					? ''
					: 'absolute right-3 top-1/2 -translate-y-1/2 opacity-80 transition-opacity group-hover:opacity-100'
			}
			onClick={(e: React.MouseEvent) => {
				e.preventDefault();
				e.stopPropagation();
				toggleFavorite();
			}}
			direction="left"
			circle="circle"
			size="sm"
			variant="ghost"
			icon={
				mailIsFavorited ? (
					<StarIcon className="text-amber-400" />
				) : (
					<EmptyStarIcon className="text-[var(--rize-muted)]" />
				)
			}
			ariaLabel={mailIsFavorited ? t(strs.중요_취소) : t(strs.중요_표시)}
		/>
	);
}

export default FavoriteStar;
