import {
  Divider,
} from '@chakra-ui/react';
import styled from '@emotion/styled';
import React from 'react';

import BackButton from '../components/BackButton';
import FavoriteStar from '../components/FavoriteStar';
import MailBody from '../components/MailBody';
import ProfileImage from '../components/ProfileImage';
import { useDependencies } from '../hooks/Dependencies';
import useNavigation from '../router/useNavigation';

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
  const navigation = useNavigation();
  const { toOriginalName, mailById } = useDependencies().useMailList();
  const mailId = navigation.params().id ?? 'm25731';

  const mail = mailById(mailId);

  if (mail === undefined) {
    return <span>로딩중 </span>;
  }

  return (
    <div style={{ padding: '0.5rem' }}>
      <BackButton />
      <Wrapper>
        <FavoriteStar mail={mail} />
        <ProfileImage member={mail.member} size='base' />
        <strong>{toOriginalName(mail.member)} </strong>
        <span
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            color: 'darkgray',
          }}>
          {mail.time}
        </span>
        <Title>{mail.subject}</Title>
      </Wrapper>
      <Divider />
      <MailBody mailBody={mail} />
      <BackButton />
    </div>
  );
}

export default MailDetailPage;
