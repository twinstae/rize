import styled from '@emotion/styled';
import React, { CSSProperties } from 'react';

import useUsername from '../config/useUsername';
import { MailT } from '../mailList/types';
import { toMailDetail } from '../router/paths';
import useNavigation from '../router/useNavigation';
import FavoriteStar from './FavoriteStar';
import ProfileImage from './ProfileImage';
import TagList from './TagList';
import { useTags } from '../hooks/Dependencies';

const Wrapper = styled.li`
  padding: 0.5rem;
  border-bottom: 1px solid #ddd;
  background-color: hsla(var(--b1)/var(--tw-bg-opacity,1));
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
}

function MailListItem({ mail, style }: MailListItemProps) {
  const navigation = useNavigation();
  const Link = navigation.Link;

  const usernameService = useUsername();
  const { isUnread } = useTags();

  return (
    <Wrapper
      id={'mail-' + mail.id}
      className={isUnread(mail.id) ? 'unread' : undefined}
      style={style}
    >
      <Link to={toMailDetail(mail.id)}>
        <div style={{ position: 'relative' }}>
          <ProfileImage member={mail.member} size="base" />
          <FavoriteStar mailId={mail.id} />
          <div className="flex flex-row flex-wrap gap-1">
            <span>{mail.member}</span>
            <span className="text-gray-500 w-fit">{mail.time.slice(2,10)}</span>
            <TagList mailId={mail.id} />
          </div>
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
