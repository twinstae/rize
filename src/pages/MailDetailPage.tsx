import styled from '@emotion/styled';
import React from 'react';

import BackButton from '../components/BackButton';
import FavoriteStar from '../components/FavoriteStar';
import MailBody from '../components/MailBody';
import ProfileImage from '../components/ProfileImage';
import useNavigation, { useSearchParam } from '../router/useNavigation';
import paths from '../router/paths';
import { useMailList } from '../hooks/Dependencies';

const Title = styled.h3`
  padding: 0;
  margin: 0.25rem 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 500;
`;

const Wrapper = styled.header`
  padding: 1rem;
  position: relative;
`;

function MailDetailPage() {
  const navigation = useNavigation();
  const mailId = useSearchParam('mailId') ?? '';
  const toOriginalName = useMailList().useToOriginalName();
  const mail = useMailList().useMailById(mailId);

  if (mail === undefined) {
    navigation.redirect(paths.MAIL_LIST);
    return <></>;
  }

  return (
    <div className="p-1 bg-base-100">
      <BackButton />
      <Wrapper>
        <FavoriteStar mailId={mail.id} />
        <ProfileImage member={mail.member} size="base" />
        <strong>{toOriginalName(mail.member)} </strong>
        <span className="text-gray-500 absolute top-0 right-10">
          {mail.time}
        </span>
        <Title>{mail.subject}</Title>
      </Wrapper>
      <MailBody mailBody={mail} />
      <BackButton direction="top" />
    </div>
  );
}

export default MailDetailPage;
