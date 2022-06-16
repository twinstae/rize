import { Center, Text, UnorderedList } from '@chakra-ui/react';
import React from 'react';
import { Virtuoso } from 'react-virtuoso';

import { MailT } from '../mailList/types';
import MailListItem from './MailListItem';
interface Props {
  result: MailT[];
}

function MailList({ result }: Props) {
  return (
    <UnorderedList padding={0} margin={0}>
      {result.length !== 0 ? (
        <Virtuoso
          totalCount={result.length}
          style={{ height: window.innerHeight - 120 }}
          itemContent={index => <MailListItem mail={result[index]} />}
        />
      ) : (
        <Center h='500px'>
          <Text fontSize='4xl'>검색결과가 없습니다</Text>
        </Center>
      )}
    </UnorderedList>
  );
}

export default MailList;
