import { css } from "@stitches/core";
import React from "react";
import MailListItem from "../../components/MailListItem";
import fakeMailRepository from "../../mailList/fakeMailRepository";
import { createUseMailList } from "../../mailList/useMailList";
import { List, ListRowRenderer } from "react-virtualized";

const mailListCss = css({
  padding: "0",
});

const useMailList = createUseMailList(fakeMailRepository);

function MailListPage() {
  const { isLoading, data, error } = useMailList();

  if (isLoading || data === undefined) return <span>로딩중</span>;

  if (error) return <span>{JSON.stringify(error)}</span>;

  const rowRenderer: ListRowRenderer = ({ key, index, style }) => {
    return <MailListItem key={key} mail={data[index]} style={style} />;
  };

  return (
    <List
      className={mailListCss()}
      width={500}
      height={660}
      rowCount={data.length}
      rowHeight={128}
      rowRenderer={rowRenderer}
    />
  );
}

export default MailListPage;
