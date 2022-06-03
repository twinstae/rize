import { Divider } from '@chakra-ui/react';
import styled from '@emotion/styled';
import React from 'react';

import BackButton from '../components/BackButton';
import FavoriteStar from '../components/FavoriteStar';
import MailBody from '../components/MailBody';
import ProfileImage from '../components/ProfileImage';
import { useDependencies } from '../hooks/Dependencies';
import { withSuspense } from '../hooks/util';
import useMailList from '../mailList/useMailList';

const Title = styled.h3`
  padding: 0;
  margin: 0.25rem 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 500;
`;

const Wrapper = styled.header`
  padding: 0.5rem;
`;

function MailDetailPage() {
  const { navigation, toNick } = useDependencies();
  const mailId = navigation.params().id ?? 'm25731';

  const mail = useMailList()
    .mailList('all', '')
    .find((mail) => mail.id === mailId);
  const mailBody = useMailList().mailById(mailId);

  return (
    <div style={{padding: '0.5rem'}}>
      <BackButton />
      <Wrapper>
        {mail ? (
          <>
            <FavoriteStar isFavorited={mail.isFavorited} mailId={mail.id}/>
            <ProfileImage member={mail.member} size="base" />
            <strong>{toNick(mail.member)} </strong>
            <span
              style={{
                color: 'darkgray',
              }}
            >
              {mail.time}
            </span>
            <Title>{mail.subject}</Title>
          </>
        ) : null}
      </Wrapper>
      <Divider />
      {mailBody && <MailBody mailBody={mailBody} />}
    </div>
  );
}

export default withSuspense(MailDetailPage);
