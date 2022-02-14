import { css } from "@stitches/core";
import React from "react";
import MailListItem from "../../components/MailListItem";
import fakeMailRepository from "../../mailList/fakeMailRepository";
import { createUseMailList } from "../../mailList/useMailList";

const mailListCss = css({
  padding: "0",
});

const useMailList = createUseMailList(fakeMailRepository);

function MailListPage() {
  const { isLoading, data, error } = useMailList();

  if (isLoading) return <span>로딩중</span>;

  if (error) return <span>{JSON.stringify(error)}</span>;
  return (
    <ul className={mailListCss()}>
      {data?.map((mail) => (
        <MailListItem mail={mail} />
      ))}
    </ul>
  );
}

export default MailListPage;
