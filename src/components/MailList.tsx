import { Box, SkeletonCircle, SkeletonText, UnorderedList } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { Virtuoso } from 'react-virtuoso';

import { MailT, RawMailT } from '../mailList/types';
import useNavigation from '../router/useNavigation';
import MailListItem from './MailListItem';
import NoSearchResult from './NoSearchResult';
interface Props {
  allMailCount: number;
  result: MailT[];
}

function MailList({ allMailCount, result }: Props) {
  const navigation = useNavigation();
  const [searchParams] = navigation.useSearchParams();

  const getIndex = (mailList: RawMailT[]) =>
    Math.min(
      mailList.findIndex((mail) => searchParams.get('mailId') === mail.id) + 4,
      mailList.length - 1
    );
  useEffect(() => {
    const visitedMail = document.getElementById('mail-'+ result[getIndex(result)]?.id);
    if(visitedMail){
      visitedMail.scrollIntoView();
    }
  }, []);

  return (
    <UnorderedList padding={0} margin={0}>
      {result.length !== 0 ? (
        <Virtuoso
          totalCount={result.length}
          style={{ height: window.innerHeight - 120 }}
          itemContent={(index) => (
            <MailListItem mail={result[index]} />
          )}
        />
      ) : allMailCount > result.length ? (
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

export default MailList;
