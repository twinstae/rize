import { atom, useAtom, useAtomValue } from 'jotai';
import { waitForAll } from 'jotai/utils';
import { atomsWithQuery } from 'jotai-tanstack-query';

import { IZONE, MEMBER_LIST } from '../constants';
import {
  addTagToMail,
  removeTagFromMail,
  reverseTagToMail,
  toOriginalName,
} from './mailListModel';
import type { MailBodyT, MailRepository, MailT, RawMailT } from './types';
import createFlexSearchIndex from '../search/createFlexSearchIndex';
import { currentTagAtom } from './useTag';
import atomWithAsyncInit from '../hooks/atomWithAsyncInit';

export interface MailListResult {
  waitForAll: () => void;
  mailList: () => {
    all: (RawMailT & MailBodyT)[];
    unread: (RawMailT & MailBodyT)[];
    favorite: (RawMailT & MailBodyT)[];
};
  useMailById: (id: string) => (MailT & MailBodyT) | undefined;
  useToOriginalName: () => (member: string) => IZONE | '운영팀';
  useStatus: () => { [fileName: string]: boolean | undefined };
  useTags: () => {
    tagToMailDict: Record<string, string[]>;
    isFavorited: (mailId: string) => boolean;
    isUnread: (mailId: string) => boolean;
    useMailTags: (mailId: string) => string[];
    addTagToMail: (tag: string, mail: string) => void;
    removeTagFromMail: (tag: string, mail: string) => void;
  },
  useSearch: () => [string, (keyword: string) => void]
}

export const UNREAD = '읽지 않음';
export const FAVORITE = '💖';

export function createUseMailList(mailRepository: MailRepository) {
  const [mailBodyDictAtom] = atomsWithQuery(() => ({
    queryKey: ['mail_body_dict.json'],
    queryFn: mailRepository.getMailBodyDict,
  }));

  const [nameToNumberDictAtom] = atomsWithQuery(() => ({
    queryKey: ['member_name.json'],
    queryFn: mailRepository.getMemberNameDict,
  }));

  const tagToMailDictAtom = atomWithAsyncInit(
    {
      [UNREAD]: [],
      [FAVORITE]: []
    },
    mailRepository.getTagToMailDict,
    mailRepository.saveTagToMailDict
  );

  let temp: (value: unknown) => void;
  const suspender = new Promise((resolve) => {
    temp = resolve;
  });
 
  const waitAtom = atom(async () => suspender);
  const [statusAtom] = atomsWithQuery(() => ({
    queryKey: ['status'],
    queryFn: async () => {
      const status = await mailRepository.status();
      if (Object.values(status).every(v => v === true)){
        setTimeout(() => {
          temp('done!');
        }, 1000);
      }
      return status;
    },
  }));

  const mailToTagDictAtom = atom((get) =>
    reverseTagToMail(get(tagToMailDictAtom))
  );
  const [rawMailListAtom] = atomsWithQuery(() => ({
    queryKey: ['pm_list.json'],
    queryFn: mailRepository.getAllMailList,
  }));

  const mailListAtom = atom<(MailT & MailBodyT)[]>((get) => {
    const rawMailList = get(rawMailListAtom);
    const mailBodyDict = get(mailBodyDictAtom);
    const nameToNumberDict = get(nameToNumberDictAtom);

    return rawMailList?.map((mail) => ({
      ...mail,
      ...mailBodyDict[mail.id],
      member: toOriginalName(nameToNumberDict)(mail.member),
    })) || [];
  });

  const useTags = () => {
    const [tagToMailDict, setTagToMailDict] = useAtom(tagToMailDictAtom);
    const dict = useAtomValue(mailToTagDictAtom);

    const unreadSet = new Set(tagToMailDict[UNREAD]);
    console.log(unreadSet);
    const favoriteSet = new Set(tagToMailDict[FAVORITE]);

    return {
      tagToMailDict,
      isFavorited: (mailId: string) => favoriteSet.has(mailId),
      isUnread: (mailId: string) => unreadSet.has(mailId),
      useMailTags: (mailId: string) => {
        return dict.get(mailId) ?? [];
      },
      addTagToMail: (tag: string, targetMailId: string) => {
        setTagToMailDict(addTagToMail(tag, targetMailId));
      },
      removeTagFromMail: (tag: string, targetMailId: string) => {
        setTagToMailDict(removeTagFromMail(tag, targetMailId));
      },
    };
  };

  const indexAtom = atom((get) => createFlexSearchIndex(get(mailListAtom).map(mail => ({
    ...mail,
    body: mail.body?.replace(new RegExp('&nbsp;', 'g'), ' ') ?? ''
  }))));

  const keywordAtom = atom('');

  const filtertedMailListAtom = atom((get) => {
    const tag = get(currentTagAtom);
    const tagToMailDict = get(tagToMailDictAtom);
    const mailList = get(mailListAtom);
    const index = get(indexAtom);
    const keyword = get(keywordAtom);
    const searchResult = index.search(keyword);
    const inSearchResult = (id: string) => searchResult.has(id);

    const tagSet = tagToMailDict[tag];
    const createByTag = (tag: string) => {
      if (MEMBER_LIST.includes(tag as IZONE)) {
        return (mail: MailT) => mail.member === tag;
      }
      if (tag === '' || tagSet === undefined) {
        return () => true;
      }
      return (mail: MailT) => tagSet.includes(mail.id);
    };
    const byTag = createByTag(tag);
    const unreadSet = new Set(tagToMailDict[UNREAD]);
    const favoriteSet = new Set(tagToMailDict[FAVORITE]);
    
    const allMailList = tag 
      ? mailList.filter(mail => byTag(mail))
      : mailList;

    if (keyword === ''){
      return {
        'all': allMailList,
        'unread': allMailList.filter((mail) => unreadSet.has(mail.id)),
        'favorite': allMailList.filter((mail) => favoriteSet.has(mail.id))
      };
    }

    return {
      'all': allMailList.filter((mail) => inSearchResult(mail.id)),
      'unread': allMailList.filter((mail) => unreadSet.has(mail.id) && inSearchResult(mail.id)),
      'favorite': allMailList.filter((mail) => favoriteSet.has(mail.id) && inSearchResult(mail.id))
    };
  });

  return (): MailListResult => {
    return {
      waitForAll: () => {
        useAtomValue(waitForAll([statusAtom, waitAtom, filtertedMailListAtom]));
      },
      mailList: () => useAtomValue(filtertedMailListAtom),
      useMailById: (id) => {
        const mailList = useAtomValue(mailListAtom);
        return mailList.find((mail) => mail.id === id);
      },
      useToOriginalName: () => {
        const nameToNumber = useAtomValue(nameToNumberDictAtom);
        return toOriginalName(nameToNumber);
      },
      useStatus: () => useAtomValue(statusAtom),
      useTags,
      useSearch: () => useAtom(keywordAtom),
    };
  };
}
