import { atom, useAtom, useAtomValue } from 'jotai';
import { useMemo } from 'react';

import { IZONE, MEMBER_LIST } from '../constants';
import atomWithAsyncInit from '../hooks/atomWithAsyncInit';
import atomWithPersit from '../hooks/atomWithPersist';
import { fileList } from './fakeMailRepository';
import {
  addTagToMail,
  removeTagFromMail,
  reverseTagToMail,
  TabMode,
  toOriginalName,
} from './mailListModel';
import { MailBodyT, MailRepository, MailT } from './types';

export interface MailListResult {
  mailList: (mode: TabMode, tag: string) => (MailT & MailBodyT)[];
  mailById: (id: string) => (MailT & MailBodyT) | undefined;
  addTagToMail: (tag: string, mail: string) => void;
  removeTagFromMail: (tag: string, mail: string) => void;
  toOriginalName: (member: string) => IZONE | '운영팀';
  status: { [fileName: string]: boolean | undefined };
  isFavorited: (mailId: string) => boolean;
  isUnread: (mailId: string) => boolean;
  getTags: (mailId: string) => string[];
}

export const UNREAD = '읽지 않음';
export const FAVORITE = '💖';

const initTagToMailDict = {
  [UNREAD]: [],
  [FAVORITE]: [],
};

export const createUseMailList = (mailRepository: MailRepository) => {
  const mailBodyDictAtom = atomWithAsyncInit(
    mailRepository.getMailBodyDict,
    {}
  );

  const nameToNumberDictAtom = atomWithAsyncInit(
    mailRepository.getMemberNameDict,
    {}
  );

  const tagToMailDictAtom = atomWithPersit(
    initTagToMailDict as Record<string, string[]>,
    {
      getItem: mailRepository.getTagToMailDict,
      setItem: mailRepository.saveTagToMailDict,
    }
  );

  const statusAtom = atomWithAsyncInit<{
    [fileName: string]: boolean | undefined;
  }>(
    mailRepository.status,
    Object.fromEntries(fileList.map((name) => [name, undefined]))
  );

  const mailToTagDictAtom = atom((get) =>
    reverseTagToMail(get(tagToMailDictAtom))
  );

  const rawMailListAtom = atomWithAsyncInit(mailRepository.getAllMailList, []);

  const mailListAtom = atom<(MailT & MailBodyT)[]>((get) => {
    const rawMailList = get(rawMailListAtom);
    const mailBodyDict = get(mailBodyDictAtom);
    const nameToNumberDict = get(nameToNumberDictAtom);

    return rawMailList.map((mail) => ({
      ...mail,
      ...mailBodyDict[mail.id],
      member: toOriginalName(nameToNumberDict)(mail.member),
    }));
  });

  return (): MailListResult => {
    
    const [tagToMailDict, setTagToMailDict] = useAtom(tagToMailDictAtom);

    const unreadSet = new Set(tagToMailDict[UNREAD]);
    const favoriteSet = new Set(tagToMailDict[FAVORITE]);
    const isFavorited = (mailId: string) => favoriteSet.has(mailId);
    const isUnread = (mailId: string) => unreadSet.has(mailId);
    return {
      mailList: (mode, tag) => {
        const mailList = useAtomValue(mailListAtom);
        const byMode = (mail: MailT): boolean => {
          if (mode === 'unread') {
            return isUnread(mail.id);
          }
          if (mode === 'favorite') {
            return isFavorited(mail.id);
          }

          return true;
        };

        const byTag: (mail: MailT) => boolean = (mail) => {
          if (MEMBER_LIST.includes(tag as IZONE)) {
            return mail.member === tag;
          }

          if (tag === '' || tagToMailDict[tag] === undefined) {
            return true;
          }
          return tagToMailDict[tag].includes(mail.id);
        };

        return useMemo(() => {
          if (mode === 'all' && tag === '') {
            return mailList;
          }

          if (mode === 'all') {
            return mailList.filter(byTag);
          }
          if (!tag) {
            return mailList.filter(byMode);
          }
          return mailList.filter((mail) => byMode(mail) && byTag(mail));
        }, [mailList, tagToMailDict, mode, tag]);
      },
      mailById: (id) => {
        const mailList = useAtomValue(mailListAtom);
        const mailBodyDict = useAtomValue(mailBodyDictAtom);

        const mail = mailList.find((mail) => mail.id === id);
        const mailBody = mailBodyDict[id];
        if (mail && mailBody) {
          return {
            ...mail,
            ...mailBody,
          };
        }

        return undefined;
      },
      addTagToMail: (tag: string, targetMailId: string) => {
        setTagToMailDict(addTagToMail(tag, targetMailId));
      },
      removeTagFromMail: (tag: string, targetMailId: string) => {
        setTagToMailDict(removeTagFromMail(tag, targetMailId));
      },
      toOriginalName: toOriginalName(useAtomValue(nameToNumberDictAtom)),
      status: useAtomValue(statusAtom),
      isFavorited,
      isUnread,
      getTags: (mailId: string) => useAtomValue(mailToTagDictAtom).get(mailId) ?? [],
    };
  };
};
