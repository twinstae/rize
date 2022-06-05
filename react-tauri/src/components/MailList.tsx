import { Box, SkeletonCircle, SkeletonText, UnorderedList } from '@chakra-ui/react';
import React from 'react';
import { List } from 'react-virtualized';

import { withSuspense } from '../hooks/util';
import { MailT, RawMailT } from '../mailList/types';
import useNavigation from '../router/useNavigation';
import MailListItem from './MailListItem';
import NoSearchResult from './NoSearchResult';
interface Props {
  allMailList: MailT[];
  result: MailT[];
}

function MailList({ allMailList, result }: Props) {
  const navigation = useNavigation();
  const [searchParams] = navigation.useSearchParams();

  const getIndex = (mailList: RawMailT[]) =>
    Math.min(
      mailList.findIndex((mail) => searchParams.get('mailId') === mail.id) + 4,
      mailList.length - 1
    );

  return (
    <UnorderedList padding={0} margin={0}>
      {result.length !== 0 ? (
        <List
          width={window.innerWidth}
          height={window.innerHeight - 120}
          rowCount={result.length}
          rowHeight={100}
          scrollToIndex={getIndex(result)}
          style={{
            overflowY: 'scroll'
          }}
          rowRenderer={({ key, index, style }) => (
            <MailListItem key={key} mail={result[index]} style={style} />
          )}
        />
      ) : allMailList.length > result.length ? (
        <NoSearchResult />
      ) : (
        <Box>
          {Array(8).fill(0).map((_, i) => (
            <Box key={i} color="gray.500">
              <SkeletonCircle size="10" float="left" m="2"/> IZ*ONE RIZE
              <SkeletonText noOfLines={2} height="16" mt="8"/>
            </Box>
          ))}
        </Box>
      )}
    </UnorderedList>
  );
}

export default withSuspense(MailList);
