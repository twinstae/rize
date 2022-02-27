import React, { useEffect } from "react";
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
  setCount: (count: number) => void;
}

function MailList({ mode, setCount }: Props) {
  const { tag } = useDependencies();
  const [searchParams] = useSearchParams();
  const mailId = searchParams.get("mailId");

  const getIndex = (mailList: MailT[]) =>
    Math.min(
      mailList.findIndex((mail) => mailId === mail.id) + 4,
      mailList.length - 1
    );

  const allMailList = useMailList().mailList("all", "");
  const { isInResult } = useSearch(allMailList);
  const mailList = useMailList().mailList(mode, tag);
  const result = mailList.filter((mail) => isInResult(mail.id));

  useEffect(() => {
    setCount(result!.length);
  }, [result]);
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
