import React, { CSSProperties } from "react";
import { useDependencies } from "../hooks/Dependencies";
import { toMailDetail } from "../router/paths";

import styled from "@emotion/styled";
import ProfileImage from "./ProfileImage";

const Wrapper = styled.li`
  padding: 0.5rem;
  border-bottom: 1px solid var(--chakra-colors-gray-300);
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

const DatiTimeText = styled.span`
  color: darkgray;
`;

interface MailListItemProps {
  mail: MailT;
  style?: CSSProperties;
}

function MailListItem({ mail, style }: MailListItemProps) {
  const { navigation, toNick, usernameService } = useDependencies();
  const Link = navigation.Link;

  return (
    <Wrapper style={style}>
      <Link to={toMailDetail(mail.id)}>
        <div>
          <ProfileImage member={mail.member} size="base" />
          <strong>{toNick(mail.member)} </strong>
          <DatiTimeText>{mail.time}</DatiTimeText>
          <Title>{mail.subject}</Title>
          <Description
            dangerouslySetInnerHTML={{
              __html: usernameService.replaceUsername(mail.preview),
            }}
          ></Description>
        </div>
      </Link>
    </Wrapper>
  );
}

export default MailListItem;
