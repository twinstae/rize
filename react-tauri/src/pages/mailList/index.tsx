import React from "react";
import MailListItem from "../../components/MailListItem";
import { List, ListRowRenderer } from "react-virtualized";
import { renderQuery } from "../../hooks/util";
import useMailList from "../../mailList/useMailList";

function MailListPage() {
  const query = useMailList().mailList;

  return renderQuery(query, (data) => {
    const rowRenderer: ListRowRenderer = ({ key, index, style }) => {
      return <MailListItem key={key} mail={data[index]} style={style} />;
    };

    return (
      <List
        width={500}
        height={660}
        rowCount={data.length}
        rowHeight={110}
        rowRenderer={rowRenderer}
      />
    );
  });
}

export default MailListPage;
