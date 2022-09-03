import { HStack, ListItem, Tag, UnorderedList } from '@chakra-ui/react';
import React from 'react';

import { useDependencies } from '../hooks/Dependencies';
import { FAVORITE } from '../mailList/useMailList';

interface TagListProps {
  mailId: string;
}

function TagList({ mailId }: TagListProps) {
  const { getTags } = useDependencies().useMailList();
  const tags = getTags(mailId);
  return (
    <UnorderedList styleType="none">
      <HStack>
        {tags
          .filter((tag) => tag !== FAVORITE)
          .map((content) => (
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
