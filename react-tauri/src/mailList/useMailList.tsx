import { atom, useAtom } from "jotai";
import { useMemo } from "react";
import { MEMBER_LIST, toOriginalName } from "../constants";
import atomWithAsyncInit from "../hooks/atomWithAsyncInit";
import fakeMailRepository from "./fakeMailRepository";

interface MailListResult {
  mailList: (mode: TabMode, tag: string) => MailT[];
  mailById: (id: string) => MailBodyT;
  tagsById: (id: string) => string[];
}

const UNREAD = "읽지 않음";
const FAVORITE = "💖";

export const createUseMailList = (mailRepository: MailRepository) => {
  const rawMailListAtom = atomWithAsyncInit(mailRepository.getAllMailList, []);
  const mailBodyDictAtom = atomWithAsyncInit(
    mailRepository.getMailBodyDict,
    {}
  );

  const tagToMailDictAtom = atomWithAsyncInit(mailRepository.getTagToMailDict, {
    [UNREAD]: [],
    [FAVORITE]: [],
  });

  const mailToTagDictAtom = atomWithAsyncInit(
    mailRepository.getMailToTagDict,
    {}
  );

  const mailListAtom = atom((get) => {
    const rawMailList = get(rawMailListAtom);
    const tagToMailDict = get(tagToMailDictAtom);

    const unreadSet = new Set(tagToMailDict[UNREAD]);
    const favoriteSet = new Set(tagToMailDict[FAVORITE]);
    return rawMailList.map((mail) => ({
      ...mail,
      isFavorited: favoriteSet.has(mail.id),
      isUnread: unreadSet.has(mail.id),
    }));
  });

  return (): MailListResult => {
    const [mailList] = useAtom(mailListAtom);
    const [mailBodyDict] = useAtom(mailBodyDictAtom);
    const [tagToMailDict] = useAtom(tagToMailDictAtom);
    const [mailToTagDict] = useAtom(mailToTagDictAtom);

    const byMode: (mode: TabMode) => (mail: MailT) => boolean = (mode) => {
      if (mode === "unread") {
        return (mail) => mail.isUnread;
      }
      if (mode === "favorite") {
        return (mail) => mail.isFavorited;
      }

      return () => true;
    };

    const byTag: (tag: string) => (item: RawMailT) => boolean = (tag) => {
      if (MEMBER_LIST.includes(tag)) {
        return (mail) => toOriginalName(mail.member) === tag;
      }

      if (tag === "" || tagToMailDict[tag] === undefined) {
        return () => true;
      }
      return (mail) => tagToMailDict[tag].includes(mail.id);
    };

    return {
      mailList: (mode, tag) => {
        return useMemo(
          () =>
            mailList.filter((item) => byMode(mode)(item) && byTag(tag)(item)),
          [mailList, mode, tag]
        );
      },
      mailById: (id) => mailBodyDict[id] || {},
      tagsById: (id) => mailToTagDict[id] || [],
    };
  };
};

const useMailList = createUseMailList(fakeMailRepository);

export default useMailList;
