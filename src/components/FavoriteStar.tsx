import { StarIcon } from '@chakra-ui/icons';
import React from 'react';

import { useDependencies } from '../hooks/Dependencies';
import { EmptyStarIcon } from '../icons';
import { FAVORITE } from '../mailList/useMailList';
import IconButtonWithTooltip from './IconButtonWithTooltip';

interface FavoriteStarProps {
  mailId: string;
}

function FavoriteStar({ mailId }: FavoriteStarProps) {
  const { addTagToMail, removeTagFromMail, isFavorited } =
    useDependencies().useMailList();
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
      className="rounded-full -top-2 -right-1 absolute tooltip-left"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite();
      }}
      icon={
        mailIsFavorited ? (
          <StarIcon color="gold" />
        ) : (
          <EmptyStarIcon color="gray.400" />
        )
      }
      aria-label={mailIsFavorited ? '중요' : '중요 표시'}
    />
  );
}

export default FavoriteStar;
