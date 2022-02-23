import React from "react";
import MailListItem from "../../components/MailListItem";
import { List } from "react-virtualized";
import { withSuspense } from "../../hooks/util";
import useMailList from "../../mailList/useMailList";
import { useSearchParams } from "react-router-dom";

function MailListPage() {
  const { data } = useMailList().mailList;
  const [searchParams] = useSearchParams();
  const mailId = searchParams.get("mailId");

  const getIndex = (mailList: MailT[]) =>
    Math.min(
      mailList.findIndex((mail) => mailId === mail.id) + 5,
      mailList.length - 1
    );

  return data ? (
    <List
      width={400}
      height={660}
      rowCount={data.length}
      rowHeight={110}
      scrollToIndex={getIndex(data)}
      rowRenderer={({ key, index, style }) => (
        <MailListItem key={key} mail={data[index]} style={style} />
      )}
    />
  ) : null;
}

export default withSuspense(MailListPage);
