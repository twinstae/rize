import { atom, useAtom } from 'jotai';
import { useMemo } from 'react';

import { IZONE, MEMBER_LIST, memberNameDict, TabMode } from '../constants';
import atomWithAsyncInit from '../hooks/atomWithAsyncInit';
import atomWithPersit from '../hooks/atomWithPersist';
import { useDependencies } from '../hooks/Dependencies';
import { MailBodyT, MailRepository, MailT } from './types';

export interface MailListResult {
  mailList: (mode: TabMode, tag: string) => MailT[];
  mailById: (id: string) => MailT & MailBodyT | undefined;
  addTagToMail: (tag: string, mail: string) => void;
  removeTagFromMail: (tag: string, mail: string) => void;
  toOriginalName: (member: string) => IZONE | '운영팀'
}

export const UNREAD = '읽지 않음';
export const FAVORITE = '💖';

const jsonClone: <T>(old: T) => T = (old) => JSON.parse(JSON.stringify(old));

export const createUseMailList = (mailRepository: MailRepository) => {
  const rawMailListAtom = atomWithAsyncInit(mailRepository.getAllMailList, []);
  const mailBodyDictAtom = atomWithAsyncInit(
    mailRepository.getMailBodyDict,
    {}
  );

  const nameToNumberDictAtom = atomWithAsyncInit(
    mailRepository.getMemberNameDict,
    {}
  );

  const tagToMailDictAtom = atomWithPersit({
    [UNREAD]: [],
    [FAVORITE]: [],
  } as Record<string, string[]>, {
    getItem: mailRepository.getTagToMailDict,
    setItem: mailRepository.saveTagToMailDict,
  });

  const mailToTagDictAtom = atom((get) => {
    const tagToMailDict = get(tagToMailDictAtom);

    return Object.entries(tagToMailDict).reduce((acc, entry) => {
      (entry[1] ?? []).forEach(mailId => {
        const oldTags = acc.get(mailId) ?? [];
        oldTags.push(entry[0]);
        acc.set(mailId, oldTags);
      });
      return acc;
    }, new Map());
  });

  const mailListAtom = atom((get) => {
    const rawMailList = get(rawMailListAtom);
    const tagToMailDict = get(tagToMailDictAtom);
    const mailToTagDict = get(mailToTagDictAtom);

    const unreadSet = new Set(tagToMailDict[UNREAD]);
    const favoriteSet = new Set(tagToMailDict[FAVORITE]);
    return rawMailList.map((mail) => ({
      ...mail,
      isFavorited: favoriteSet.has(mail.id),
      isUnread: unreadSet.has(mail.id),
      tags: mailToTagDict.get(mail.id) ?? [],
    }));
  });

  return (): MailListResult => {
    const [mailList] = useAtom(mailListAtom);
    const [mailBodyDict] = useAtom(mailBodyDictAtom);
    const [nameToNumberDict] = useAtom(nameToNumberDictAtom);
    const [tagToMailDict, setTagToMailDict] = useAtom(tagToMailDictAtom);


    const toOriginalName = (raw: string) => memberNameDict[nameToNumberDict[raw]];

    const byMode: (mode: TabMode) => (mail: MailT) => boolean = (mode) => {
      if (mode === 'unread') {
        return (mail) => mail.isUnread;
      }
      if (mode === 'favorite') {
        return (mail) => mail.isFavorited;
      }

      return () => true;
    };

    const byTag: (tag: string) => (item: MailT) => boolean = (tag) => {
      if (MEMBER_LIST.includes(tag as IZONE)) {
        return (mail) => toOriginalName(mail.member) === tag;
      }

      if (tag === '' || tagToMailDict[tag] === undefined) {
        return () => true;
      }
      return (mail) => (tagToMailDict[tag] ?? []).includes(mail.id);
    };

    return {
      mailList: (mode, tag) => {
        return useMemo(
          () =>
            mailList.filter((item) => byMode(mode)(item) && byTag(tag)(item)),
          [mailList, mode, tag]
        );
      },
      mailById: (id) => {
        const mail = mailList.find((mail) => mail.id === id);
        const mailBody = mailBodyDict[id];
        if (mail && mailBody) {
          return {
            ...mail,
            ...mailBody
          };
        }

        return undefined;
      },
      addTagToMail: (tag: string, targetMailId: string) => {
        setTagToMailDict((old: Record<string, string[]>) => {
          const newDict = jsonClone(old);

          (newDict[tag] ?? []).push(targetMailId);
          return newDict;
        });
      },
      removeTagFromMail: (tag: string, targetMailId: string) => {
        setTagToMailDict((old: Record<string, string[]>) => {
          const newDict = jsonClone(old);
          newDict[tag] = (newDict[tag] || []).filter(mailId => targetMailId !== mailId);
          return newDict;
        });
      },
      toOriginalName
    };
  };
};

function useMailList(){
  const { useMailList } = useDependencies();
  return useMailList();
}

export default useMailList;
