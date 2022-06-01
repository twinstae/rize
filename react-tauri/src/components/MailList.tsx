import React from "react";
import MailListItem from "./MailListItem";
import { List } from "react-virtualized";
import { withSuspense } from "../hooks/util";
import { UnorderedList } from "@chakra-ui/react";
import NoSearchResult from "./NoSearchResult";
import { useDependencies } from "../hooks/Dependencies";
import { MailT, RawMailT } from "../mailList/types";
interface Props {
  allMailList: MailT[];
  result: MailT[];
}

function MailList({ allMailList, result }: Props) {
  const { navigation } = useDependencies();
  const { mailId } = navigation.params()

  const getIndex = (mailList: RawMailT[]) =>
    Math.min(
      mailList.findIndex((mail) => mailId === mail.id) + 4,
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
