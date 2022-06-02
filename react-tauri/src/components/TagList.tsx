import React from "react";
import { Tag, ListItem, UnorderedList, HStack } from "@chakra-ui/react";
import { FAVORITE } from "../mailList/useMailList";

interface TagListProps {
  tags: string[];
}

function TagList({ tags }: TagListProps) {
  return (
    <UnorderedList styleType="none">
      <HStack>
        {tags.filter(tag => tag !== FAVORITE).map((content) => (
          <ListItem key={content}>
            <Tag size="sm" colorScheme="izone" borderRadius="full">
              {content}
            </Tag>
          </ListItem>
        ))}
      </HStack>
    </UnorderedList>
  );
}

export default TagList;
