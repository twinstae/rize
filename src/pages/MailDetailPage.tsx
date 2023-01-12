import React from 'react';

import BackButton from '../components/BackButton';
import FavoriteStar from '../components/FavoriteStar';
import MailBody from '../components/MailBody';
import ProfileImage from '../components/ProfileImage';
import useNavigation, { useSearchParam } from '../router/useNavigation';
import paths from '../router/paths';
import { useMailList } from '../hooks/Dependencies';

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
    <div className="p-1 h-fit relative">
      <BackButton />
      <header className="p-4 relative">
        <FavoriteStar mailId={mail.id} />
        <ProfileImage member={mail.member} size="base" />
        <strong>{toOriginalName(mail.member)} </strong>
        <span className="text-gray-500 absolute top-0 right-10">
          {mail.time}
        </span>
        <h3 className="p-0 m-0 overflow-hidden text-ellipsis font-bold">{mail.subject}</h3>
      </header>
      <MailBody mailBody={mail} />
      <BackButton direction="top" className="absolute bottom-2 right-4 btn-primary p-2 btn-circle"/>
    </div>
  );
}

export default MailDetailPage;
