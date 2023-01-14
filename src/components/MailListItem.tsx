import React, { CSSProperties } from 'react';

import useUsername from '../config/useUsername';
import type { MailBodyT, RawMailT } from '../mailList/types';
import { toMailDetail } from '../router/paths';
import useNavigation from '../router/useNavigation';
import FavoriteStar from './FavoriteStar';
import ProfileImage from './ProfileImage';
import TagList from './TagList';
import { useMailList, useTags } from '../hooks/Dependencies';
import { getCachedRegex } from '../search/createRegexSearchIndex';

interface MailListItemProps {
  mail: RawMailT & MailBodyT & { bodyText: string };
  style?: CSSProperties;
}

function highlight(text: string, keyword: string){
  if (keyword === ''){
    return text;
  }
  const regex = getCachedRegex(keyword);
  
  const start = Math.max((text.match(regex)?.index ?? 0) - 20, 0);
  return text.slice(start, start+50).replace(regex, '<mark>$&</mark>');
}

function MailListItem({ mail, style }: MailListItemProps) {
  const navigation = useNavigation();
  const Link = navigation.Link;

  const { replaceUsername } = useUsername();
  const { isUnread } = useTags();
  const [keyword] = useMailList().useSearch();

  return (
    <li
      id={'mail-' + mail.id}
      className={`p-2 border-b-1 border-base-200 relative ${isUnread(mail.id) && 'unread'}`}
      style={style}
    >
      <Link to={toMailDetail(mail.id)}>
        <div style={{ position: 'relative' }}>
          <ProfileImage member={mail.member} size="base" className="mr-2"/>
          <FavoriteStar mailId={mail.id} />
          <div className="flex flex-row flex-wrap gap-1">
            <span>{mail.member}</span>
            <span className="text-gray-500 w-fit">{mail.time.slice(2,10)}</span>
            <TagList mailId={mail.id} />
          </div>
          <h3 className="p-0 m-0 overflow-hidden text-ellipsis font-bold"
            dangerouslySetInnerHTML={{
              __html:highlight(mail.subject, keyword)
            }}>
          </h3>
          <p
            className="w-full p-0 overflow-hidden text-ellipsis nowrap"
            dangerouslySetInnerHTML={{
              __html: highlight(replaceUsername(mail.bodyText), keyword)
            }}
          ></p>
        </div>
      </Link>
    </li>
  );
}

export default MailListItem;
