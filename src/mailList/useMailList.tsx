import { useMemo } from 'react';
import { atom, useAtom, useAtomValue } from 'jotai';
import { waitForAll } from 'jotai/utils';
import { atomsWithQuery } from 'jotai-tanstack-query';

import { IZONE, MEMBER_LIST } from '../constants';
import atomWithPersit from '../hooks/atomWithPersist';
import {
  addTagToMail,
  removeTagFromMail,
  reverseTagToMail,
  TabMode,
  toOriginalName,
} from './mailListModel';
import { MailBodyT, MailRepository, MailT } from './types';
import { useQueryClient } from '@tanstack/react-query';

export interface MailListResult {
  waitForAll: () => void;
  mailList: (mode: TabMode, tag: string) => (MailT & MailBodyT)[];
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
  }
}

export const UNREAD = '읽지 않음';
export const FAVORITE = '💖';

const initTagToMailDict = {
  [UNREAD]: [],
  [FAVORITE]: [],
};

export function createUseMailList(mailRepository: MailRepository) {
  const [mailBodyDictAtom] = atomsWithQuery(() => ({
    queryKey: ['mail_body_dict.json'],
    queryFn: mailRepository.getMailBodyDict,
  }));

  const [nameToNumberDictAtom] = atomsWithQuery(() => ({
    queryKey: ['member_name.json'],
    queryFn: mailRepository.getMemberNameDict,
  }));

  const [tagToMailDictAtom] = atomsWithQuery(() => ({
    queryKey: ['tag_to_mail_dict.json'],
    queryFn: mailRepository.getTagToMailDict,
  }));

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
        temp('done!');
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

    return rawMailList.map((mail) => ({
      ...mail,
      ...mailBodyDict[mail.id],
      member: toOriginalName(nameToNumberDict)(mail.member),
    }));
  });

  const useTags = () => {
    const tagToMailDict = useAtomValue(tagToMailDictAtom);
    const queryClient = useQueryClient();
    const dict = useAtomValue(mailToTagDictAtom);

    const unreadSet = new Set(tagToMailDict[UNREAD]);
    const favoriteSet = new Set(tagToMailDict[FAVORITE]);
   
    const setTagToMailDict = (updater: (oldState: Record<string, string[]>) => Record<string, string[]>) => {
      const oldState = queryClient.getQueryData(['tag_to_mail_dict.json']) as Record<string, string[]>;
      const newState = updater(oldState);
      queryClient.setQueryData(['tag_to_mail_dict.json'], newState);
      mailRepository.saveTagToMailDict(newState);
    };

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

  return (): MailListResult => {
    return {
      waitForAll: () => {
        useAtomValue(waitForAll([statusAtom, tagToMailDictAtom, mailBodyDictAtom, nameToNumberDictAtom, rawMailListAtom, waitAtom]));
      },
      mailList: (mode, tag) => {
        const { tagToMailDict, isUnread, isFavorited } = useTags();
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
    };
  };
}
