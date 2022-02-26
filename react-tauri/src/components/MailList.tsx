import React from "react";
import MailListItem from "./MailListItem";
import { List } from "react-virtualized";
import { withSuspense } from "../hooks/util";
import useMailList from "../mailList/useMailList";
import { useSearchParams } from "react-router-dom";
import { UnorderedList } from "@chakra-ui/react";
import NoSearchResult from "./NoSearchResult";

interface Props {
  mode: TabMode;
  isInResult: (id: string) => boolean;
}

function MailList({ mode, isInResult }: Props) {
  const { data } = useMailList().mailList(mode);
  const [searchParams] = useSearchParams();
  const mailId = searchParams.get("mailId");

  const getIndex = (mailList: MailT[]) =>
    Math.min(
      mailList.findIndex((mail) => mailId === mail.id) + 4,
      mailList.length - 1
    );

  const result = data! && data?.filter((mail) => isInResult(mail.id));

  return result.length !== 0 ? (
    <UnorderedList padding={0} margin={0}>
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
    </UnorderedList>
  ) : data!.length > result.length ? (
    <NoSearchResult />
  ) : (
    <span>메일이 없습니다</span>
  );
}

export default withSuspense(MailList);
