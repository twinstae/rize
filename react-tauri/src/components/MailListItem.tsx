import React from "react";
import { useDependencies } from "../hooks/Dependencies";
import { toMailDetail } from "../router/paths";

import { css } from "@stitches/core";

const liCss = css({
  padding: "0.5rem",
  margin: "0",
  borderBottom: "1px solid lightgrey",
  listStyle: "none",
  lineHeight: 1.25,
});

const titleCss = css({
  padding: 0,
  margin: "0.25rem 0",
});

const timestampCss = css({
  color: "darkgray",
});

const descriptionCss = css({
  margin: "0.25rem 0 ",
});

interface MailListItemProps {
  mail: MailT;
}

function MailListItem({ mail }: MailListItemProps) {
  const { navigate, toNick } = useDependencies();

  return (
    <li className={liCss()} onClick={() => navigate(toMailDetail(mail.id))}>
      <span>{toNick(mail.member)}</span>
      <h3 className={titleCss()}>{mail.subject}</h3>
      <span className={timestampCss()}>{mail.time}</span>
      <p className={descriptionCss()}>{mail.preview}</p>
    </li>
  );
}

export default MailListItem;
