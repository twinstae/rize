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
  const { navigation, toNick } = useDependencies();

  return (
    <li
      className={liCss()}
      style={style}
      onClick={() => navigation.navigate(toMailDetail(mail.id))}
    >
      <div style={{ padding: "14px" }}>
        <span>{toNick(mail.member)}</span>
        <h3 className={titleCss()}>{mail.subject}</h3>
        <span className={timestampCss()}>{mail.time}</span>
        <p className={descriptionCss()}>{mail.preview}</p>
      </div>
    </li>
  );
}

export default MailListItem;
