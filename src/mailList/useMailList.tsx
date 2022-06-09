import { atom, useAtom, useAtomValue } from 'jotai';
import { useMemo } from 'react';

import { IZONE } from '../constants';
import atomWithAsyncInit from '../hooks/atomWithAsyncInit';
import atomWithPersit from '../hooks/atomWithPersist';
import { useDependencies } from '../hooks/Dependencies';
import { addTagToMail, filterByModeAndTag, removeTagFromMail, reverseTagToMail, TabMode, toOriginalName } from './mailListModel';
import { MailBodyT, MailRepository, MailT } from './types';

export interface MailListResult {
  mailList: (mode: TabMode, tag: string) => MailT[];
  mailById: (id: string) => MailT & MailBodyT | undefined;
  addTagToMail: (tag: string, mail: string) => void;
  removeTagFromMail: (tag: string, mail: string) => void;
  toOriginalName: (member: string) => IZONE | '운영팀'
  status: {
    pmList: boolean;
    mailBodyDict: boolean;
    memberName: boolean;
  }
}

export const UNREAD = '읽지 않음';
export const FAVORITE = '💖';

const initTagToMailDict = {
  [UNREAD]: [],
  [FAVORITE]: [],
};

const isEmptyObject = (obj: object) => Object.keys(obj).length !== 0;

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

  const tagToMailDictAtom = atomWithPersit(initTagToMailDict as Record<string, string[]>, {
    getItem: mailRepository.getTagToMailDict,
    setItem: mailRepository.saveTagToMailDict,
  });

  const mailToTagDictAtom = atom((get) => {
    const tagToMailDict = get(tagToMailDictAtom);

    return reverseTagToMail(tagToMailDict);
  });

  const statusAtom = atom((get) => {
    return {
      pmList: get(mailListAtom).length > 0,
      mailBodyDict: isEmptyObject(get(mailBodyDictAtom)),
      memberName: isEmptyObject(get(nameToNumberDictAtom)),
    };
  });

  const mailListAtom = atom((get) => {
    const rawMailList = get(rawMailListAtom);
    const tagToMailDict = get(tagToMailDictAtom);
    const mailToTagDict = get(mailToTagDictAtom);
    const nameToNumberDict = get(nameToNumberDictAtom);

    const unreadSet = new Set(tagToMailDict[UNREAD]);
    const favoriteSet = new Set(tagToMailDict[FAVORITE]);
    return rawMailList.map((mail) => ({
      ...mail,
      member: toOriginalName(nameToNumberDict)(mail.member),
      isFavorited: favoriteSet.has(mail.id),
      isUnread: unreadSet.has(mail.id),
      tags: mailToTagDict.get(mail.id) ?? [],
    }));
  });

  return (): MailListResult => {
    const mailList = useAtomValue(mailListAtom);
    const mailBodyDict = useAtomValue(mailBodyDictAtom);
    const nameToNumberDict = useAtomValue(nameToNumberDictAtom);
    const [tagToMailDict, setTagToMailDict] = useAtom(tagToMailDictAtom);
    const status = useAtomValue(statusAtom);

    return {
      mailList: (mode, tag) => {
        return useMemo(
          () => mailList.filter(filterByModeAndTag(tagToMailDict)(mode,tag)),
          [mailList, tagToMailDict, mode, tag]
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
        setTagToMailDict(addTagToMail(tag, targetMailId));
      },
      removeTagFromMail: (tag: string, targetMailId: string) => {
        setTagToMailDict(removeTagFromMail(tag, targetMailId));
      },
      toOriginalName: toOriginalName(nameToNumberDict),
      status,
    };
  };
};

function useMailList(){
  const { useMailList } = useDependencies();
  return useMailList();
}

export default useMailList;