import { UnorderedList } from '@chakra-ui/react';
import React from 'react';
import { List } from 'react-virtualized';

import { useDependencies } from '../hooks/Dependencies';
import { withSuspense } from '../hooks/util';
import { MailT, RawMailT } from '../mailList/types';
import MailListItem from './MailListItem';
import NoSearchResult from './NoSearchResult';
interface Props {
  allMailList: MailT[];
  result: MailT[];
}

function MailList({ allMailList, result }: Props) {
  const { navigation } = useDependencies();
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
          width={435}
          height={580}
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
        <span>메일이 없습니다</span>
      )}
    </UnorderedList>
  );
}

export default withSuspense(MailList);
