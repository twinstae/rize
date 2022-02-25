import React, { CSSProperties } from "react";
import { useDependencies } from "../hooks/Dependencies";
import { toMailDetail } from "../router/paths";

import styled from "@emotion/styled";
import ProfileImage from "./ProfileImage";
import { Divider } from "@chakra-ui/react";

const Wrapper = styled.li`
  padding: 0.5rem;
`;

const Title = styled.h3`
  padding: 0;
  margin: 0.25rem 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 500;
`;

const Description = styled.p`
  margin: 0.25rem 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

interface MailListItemProps {
  mail: MailT;
  style?: CSSProperties;
  hide?: boolean;
}

function MailListItem({ mail, style, hide = false }: MailListItemProps) {
  const { navigation, toNick, usernameService } = useDependencies();
  const Link = navigation.Link;

  return (
    <Wrapper style={style}>
      <Link to={toMailDetail(mail.id)} style={{ padding: "14px" }}>
        <div>
          <ProfileImage member={mail.member} />
          <span style={{ fontWeight: 500 }}>{toNick(mail.member)} </span>
          <span
            style={{
              color: "darkgray",
            }}
          >
            {mail.time}
          </span>
          <Title>{mail.subject}</Title>
          {hide ? null : (
            <Description
              dangerouslySetInnerHTML={{
                __html: usernameService.replaceUsername(mail.preview),
              }}
            ></Description>
          )}
        </div>
      </Link>
      <Divider />
    </Wrapper>
  );
}

export default MailListItem;
