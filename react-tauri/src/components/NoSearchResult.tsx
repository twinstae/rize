import { Center, Text } from '@chakra-ui/react';
import React from 'react';

function NoSearchResult() {
  return (
    <Center h="500px">
      <Text fontSize="4xl">검색결과가 없습니다</Text>
    </Center>
  );
}

export default NoSearchResult;
