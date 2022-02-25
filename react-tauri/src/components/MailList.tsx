import React from "react";
import MailListItem from "./MailListItem";
import { List } from "react-virtualized";
import { withSuspense } from "../hooks/util";
import useMailList from "../mailList/useMailList";
import { useSearchParams } from "react-router-dom";
import { UnorderedList } from "@chakra-ui/react";

interface Props {
  mode: TabMode;
}

function MailList({ mode }: Props) {
  const { data } = useMailList().mailList(mode);
  const [searchParams] = useSearchParams();
  const mailId = searchParams.get("mailId");

  const getIndex = (mailList: MailT[]) =>
    Math.min(
      mailList.findIndex((mail) => mailId === mail.id) + 4,
      mailList.length - 1
    );

  return data ? (
    <UnorderedList padding={0} margin={0}>
      <List
        width={435}
        height={580}
        rowCount={data.length}
        rowHeight={110}
        scrollToIndex={getIndex(data)}
        rowRenderer={({ key, index, style }) => (
          <MailListItem key={key} mail={data[index]} style={style} />
        )}
      />
    </UnorderedList>
  ) : null;
}

export default withSuspense(MailList);
