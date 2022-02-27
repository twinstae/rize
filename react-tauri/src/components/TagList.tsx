import React from "react";
import { Tag, ListItem, UnorderedList, HStack } from "@chakra-ui/react";
import useMailList from "../mailList/useMailList";

interface TagListProps {
  id: string;
}

function TagList({ id }: TagListProps) {
  const tags = useMailList().tagsById(id);
  return (
    <UnorderedList styleType="none">
      <HStack>
        {tags.map((content) => (
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
