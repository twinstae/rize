import React, { CSSProperties } from "react";
import { useDependencies } from "../hooks/Dependencies";
import { toMailDetail } from "../router/paths";

import { css } from "@stitches/core";

const liCss = css({
  borderBottom: "1px solid lightgrey",
  listStyle: "none",
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
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

interface MailListItemProps {
  mail: MailT;
  style: CSSProperties;
}

function MailListItem({ mail, style }: MailListItemProps) {
  const { navigation, toNick, usernameService } = useDependencies();

  return (
    <li
      className={liCss()}
      style={style}
      onClick={() => navigation.navigate(toMailDetail(mail.id))}
    >
      <div style={{ padding: "14px" }}>
        <span>{toNick(mail.member)} </span>
        <span className={timestampCss()}> {mail.time}</span>
        <h3 className={titleCss()}>{mail.subject}</h3>
        <p className={descriptionCss()}>
          {usernameService.replaceUsername(mail.preview)}
        </p>
      </div>
    </li>
  );
}

export default MailListItem;
