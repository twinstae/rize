import React, { CSSProperties } from "react";
import { useDependencies } from "../hooks/Dependencies";
import { toMailDetail } from "../router/paths";

import { css } from "@stitches/core";
import ProfileImage from "./ProfileImage";

const liCss = css({
  borderBottom: "1px solid lightgrey",
  listStyle: "none",
});

const titleCss = css({
  padding: 0,
  margin: "0.25rem 0",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
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
  style?: CSSProperties;
  hide?: boolean;
}

function MailListItem({ mail, style, hide = false }: MailListItemProps) {
  const { navigation, toNick, usernameService } = useDependencies();
  const Link = navigation.Link;

  return (
    <li className={liCss()} style={style}>
      <Link to={toMailDetail(mail.id)}>
        <div style={{ padding: "14px" }}>
          <ProfileImage member={mail.member} />
          <span>{toNick(mail.member)} </span>
          <span className={timestampCss()}> {mail.time}</span>
          <h3 className={titleCss()}>{mail.subject}</h3>
          {hide ? null : (
            <p
              className={descriptionCss()}
              dangerouslySetInnerHTML={{
                __html: usernameService.replaceUsername(mail.preview),
              }}
            ></p>
          )}
        </div>
      </Link>
    </li>
  );
}

export default MailListItem;
