import React, { CSSProperties } from 'react';

import useUsername from '../config/useUsername';
import { MailT } from '../mailList/types';
import { toMailDetail } from '../router/paths';
import useNavigation from '../router/useNavigation';
import FavoriteStar from './FavoriteStar';
import ProfileImage from './ProfileImage';
import TagList from './TagList';
import { useTags } from '../hooks/Dependencies';

interface MailListItemProps {
  mail: MailT;
  style?: CSSProperties;
}

function MailListItem({ mail, style }: MailListItemProps) {
  const navigation = useNavigation();
  const Link = navigation.Link;

  const usernameService = useUsername();
  const { isUnread } = useTags();

  const unread = isUnread(mail.id);
  return (
    <div
      id={'mail-' + mail.id}
      className={`p-2 border-b-2 border-base-200 ${unread && 'unread'}`}
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
          <h3 className="p-0 m-0 overflow-hidden text-ellipsis font-bold">{mail.subject}</h3>
          <p
            className="w-full p-0 overflow-hidden text-ellipsis nowrap"
            dangerouslySetInnerHTML={{
              __html: usernameService.replaceUsername(mail.preview),
            }}
          ></p>
        </div>
      </Link>
    </div>
  );
}

export default MailListItem;
