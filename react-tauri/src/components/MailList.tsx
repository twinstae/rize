import React from "react";
import MailListItem from "./MailListItem";
import { List } from "react-virtualized";
import { withSuspense } from "../hooks/util";
import { useSearchParams } from "react-router-dom";
import { UnorderedList } from "@chakra-ui/react";
import NoSearchResult from "./NoSearchResult";
import useSearch from "../search/useSearch";
import useMailList from "../mailList/useMailList";
import { useDependencies } from "../hooks/Dependencies";

interface Props {
  mode: TabMode;
}

function MailList({ mode }: Props) {
  const { tag } = useDependencies();
  const [searchParams] = useSearchParams();
  const mailId = searchParams.get("mailId");

  const getIndex = (mailList: MailT[]) =>
    Math.min(
      mailList.findIndex((mail) => mailId === mail.id) + 4,
      mailList.length - 1
    );

  const { isInResult } = useSearch();
  const { data } = useMailList().mailList(mode, tag);
  const result = data!.filter((mail) => isInResult(mail.id));

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
      ) : data!.length > result.length ? (
        <NoSearchResult />
      ) : (
        <span>메일이 없습니다</span>
      )}
    </UnorderedList>
  );
}

export default withSuspense(MailList);
