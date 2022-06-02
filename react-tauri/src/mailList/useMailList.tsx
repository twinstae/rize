import { atom, useAtom } from "jotai";
import { useMemo } from "react";
import { IZONE, MEMBER_LIST, TabMode, toOriginalName } from "../constants";
import { MailBodyT, MailRepository, MailT } from "./types";
import atomWithAsyncInit from "../hooks/atomWithAsyncInit";
import atomWithPersit from "../hooks/atomWithPersist";
import fakeMailRepository from "./fakeMailRepository";
import fsMailRepository from "./fsMailRepository";

interface MailListResult {
  mailList: (mode: TabMode, tag: string) => MailT[];
  mailById: (id: string) => MailBodyT;
  addTagToMail: (tag: string, mail: string) => void;
}

const UNREAD = "읽지 않음";
const FAVORITE = "💖";

export const createUseMailList = (mailRepository: MailRepository) => {
  const rawMailListAtom = atomWithAsyncInit(mailRepository.getAllMailList, []);
  const mailBodyDictAtom = atomWithAsyncInit(
    mailRepository.getMailBodyDict,
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
      entry[1]!.forEach(mailId => {
        const oldTags = acc.get(mailId) ?? []
        oldTags.push(entry[0])
        acc.set(mailId, oldTags)
      })
      return acc
    }, new Map())
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
    const [tagToMailDict, setTagToMailDict] = useAtom(tagToMailDictAtom);

    const byMode: (mode: TabMode) => (mail: MailT) => boolean = (mode) => {
      if (mode === "unread") {
        return (mail) => mail.isUnread;
      }
      if (mode === "favorite") {
        return (mail) => mail.isFavorited;
      }

      return () => true;
    };

    const byTag: (tag: string) => (item: MailT) => boolean = (tag) => {
      if (MEMBER_LIST.includes(tag as IZONE)) {
        return (mail) => toOriginalName(mail.member) === tag;
      }

      if (tag === "" || tagToMailDict[tag] === undefined) {
        return () => true;
      }
      return (mail) => tagToMailDict[tag]!.includes(mail.id);
    };

    return {
      mailList: (mode, tag) => {
        return useMemo(
          () =>
            mailList.filter((item) => byMode(mode)(item) && byTag(tag)(item)),
          [mailList, mode, tag]
        );
      },
      mailById: (id) => mailBodyDict[id] ?? { body: "", images: [] },
      addTagToMail: (tag: string, mail: string) => {
        setTagToMailDict((old: Record<string, string[]>) => {
          const newDict = JSON.parse(JSON.stringify(old))
          newDict[tag].push(mail)
          return newDict
        })
      }
    };
  };
};

const useMailList = createUseMailList(fakeMailRepository);

export default useMailList;
