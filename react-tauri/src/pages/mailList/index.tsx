import React from "react";
import MailListItem from "../../components/MailListItem";
import { List } from "react-virtualized";
import { withSuspense } from "../../hooks/util";
import useMailList from "../../mailList/useMailList";
import { useDependencies } from "../../hooks/Dependencies";
import { useSearchParams } from "react-router-dom";

function MailListPage() {
  const { data } = useMailList().mailList;
  const [searchParams] = useSearchParams();
  const mailId = searchParams.get("mailId");

  return data ? (
    <List
      width={500}
      height={660}
      rowCount={data.length}
      rowHeight={110}
      rowRenderer={({ key, index, style }) => {
        return <MailListItem key={key} mail={data[index]} style={style} />;
      }}
      scrollToIndex={Math.min(
        data.findIndex((mail) => mailId === mail.id) + 5,
        data.length - 1
      )}
    />
  ) : null;
}

export default withSuspense(MailListPage);
