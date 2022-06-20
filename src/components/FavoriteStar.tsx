import { StarIcon } from '@chakra-ui/icons';
import React from 'react';

import { useDependencies } from '../hooks/Dependencies';
import { EmptyStarIcon } from '../icons';
import { FAVORITE } from '../mailList/useMailList';
import IconButtonWithTooltip from './IconButtonWithTooltip';


interface FavoriteStarProps {
  mail: {
    isFavorited: boolean;
    id: string;
  };
}

function FavoriteStar({ mail }: FavoriteStarProps) {
  const { addTagToMail, removeTagFromMail } = useDependencies().useMailList();
  const toggleFavorite = () => {
    if (mail.isFavorited) {
      removeTagFromMail(FAVORITE, mail.id);
    } else {
      addTagToMail(FAVORITE, mail.id);
    }
  };

  return (
    <IconButtonWithTooltip
      variant="ghost"
      position="absolute"
      right="1"
      top="-2"
      borderRadius="full"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite();
      }}
      icon={
        mail.isFavorited ? (
          <StarIcon color="gold" />
        ) : (
          <EmptyStarIcon color="gray.400" />
        )
      }
      aria-label={mail.isFavorited ? '중요' : '중요 표시하기'}
    />
  );
}

export default FavoriteStar;
