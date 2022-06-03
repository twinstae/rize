import { HStack } from '@chakra-ui/react';
import styled from '@emotion/styled';
import React, { CSSProperties } from 'react';

import useUsername from '../config/useUsername';
import { useDependencies } from '../hooks/Dependencies';
import { MailT } from '../mailList/types';
import { toMailDetail } from '../router/paths';
import FavoriteStar from './FavoriteStar';
import ProfileImage from './ProfileImage';
import TagList from './TagList';

const Wrapper = styled.li`
  padding: 0.5rem;
  border-bottom: 1px solid var(--chakra-colors-gray-300);

  &.unread::before {
    content: "●";
    color: #f06d9c;
    position: absolute;
    margin-top: -8px;
    text-shadow: 1px 1px 5px gray;
  }
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
  const { navigation, toNick } = useDependencies();
  const Link = navigation.Link;

  const usernameService = useUsername();
  
  return (
    <Wrapper style={style} className={mail.isUnread ? 'unread' : undefined}>
      <Link to={toMailDetail(mail.id)}>
        <div>
          <ProfileImage member={mail.member} size="base" />
          <FavoriteStar isFavorited={mail.isFavorited} mailId={mail.id} />
          <HStack>
            <span>{toNick(mail.member)} </span>
            <DatiTimeText>{mail.time}</DatiTimeText>
            <TagList tags={mail.tags} />
          </HStack>
          <Title>
            <strong>{mail.subject}</strong>
          </Title>
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
