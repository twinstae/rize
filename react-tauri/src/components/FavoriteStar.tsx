import { StarIcon } from "@chakra-ui/icons";
import React from "react";
import useMailList from "../mailList/useMailList";

interface FavoriteStarProps {
  id: string;
}

function FavoriteStar({ id }: FavoriteStarProps) {
  const isFavorited = useMailList().isFavoritedById(id);
  return isFavorited ? (
    <StarIcon color="gold" position="absolute" right="3" />
  ) : null;
}

export default FavoriteStar;
