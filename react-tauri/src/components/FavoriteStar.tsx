import React from "react";
import { StarIcon } from "@chakra-ui/icons";
import useMailList from "../mailList/useMailList";

interface FavoriteStarProps {
  isFavorited: boolean;
}

function FavoriteStar({ isFavorited }: FavoriteStarProps) {
  return isFavorited ? (
    <StarIcon color="gold" position="absolute" right="3" aria-label="중요" />
  ) : null;
}

export default FavoriteStar;
