import React from 'react';
import { createIcon, StarIcon } from '@chakra-ui/icons';
import { IconButton } from '@chakra-ui/react';
import useMailList, { FAVORITE } from '../mailList/useMailList';

const EmpryStarIcon = createIcon({
  d: 'M287.9 0C297.1 0 305.5 5.25 309.5 13.52L378.1 154.8L531.4 177.5C540.4 178.8 547.8 185.1 550.7 193.7C553.5 202.4 551.2 211.9 544.8 218.2L433.6 328.4L459.9 483.9C461.4 492.9 457.7 502.1 450.2 507.4C442.8 512.7 432.1 513.4 424.9 509.1L287.9 435.9L150.1 509.1C142.9 513.4 133.1 512.7 125.6 507.4C118.2 502.1 114.5 492.9 115.1 483.9L142.2 328.4L31.11 218.2C24.65 211.9 22.36 202.4 25.2 193.7C28.03 185.1 35.5 178.8 44.49 177.5L197.7 154.8L266.3 13.52C270.4 5.249 278.7 0 287.9 0L287.9 0zM287.9 78.95L235.4 187.2C231.9 194.3 225.1 199.3 217.3 200.5L98.98 217.9L184.9 303C190.4 308.5 192.9 316.4 191.6 324.1L171.4 443.7L276.6 387.5C283.7 383.7 292.2 383.7 299.2 387.5L404.4 443.7L384.2 324.1C382.9 316.4 385.5 308.5 391 303L476.9 217.9L358.6 200.5C350.7 199.3 343.9 194.3 340.5 187.2L287.9 78.95z',
  viewBox: '0 0 540 540',
  displayName: 'EmpryStarIcon',
});

interface FavoriteStarProps {
  isFavorited: boolean;
  mailId: string;
}

function FavoriteStar({ isFavorited, mailId }: FavoriteStarProps) {
  const { addTagToMail, removeTagFromMail } = useMailList();
  return isFavorited ? (
    <IconButton
      variant="ghost"
      position="absolute"
      right="3"
      borderRadius="full"
      icon={<StarIcon color="gold" />}
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        removeTagFromMail(FAVORITE, mailId)
      }}
      aria-label="중요"
    />
  ) : (
    <IconButton
      variant="ghost"
      position="absolute"
      right="3"
      borderRadius="full"
      icon={<EmpryStarIcon color="gray.400" />}
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        addTagToMail(FAVORITE, mailId)
      }}
      aria-label="중요 표시하기"
    />
  );
}

export default FavoriteStar;
