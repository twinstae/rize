import { atom, useAtom } from "jotai";
import { useMemo } from "react";
import { MEMBER_LIST, toOriginalName } from "../constants";
import atomWithAsyncInit from "../hooks/atomWithAsyncInit";
import fakeMailRepository from "./fakeMailRepository";

interface MailListResult {
  mailList: (mode: TabMode, tag: string) => MailT[];
  mailById: (id: string) => MailBodyT;
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
    console.log("update");
    const rawMailList = get(rawMailListAtom);
    const tagToMailDict = get(tagToMailDictAtom);
    const mailToTagDict = get(mailToTagDictAtom);

    const unreadSet = new Set(tagToMailDict[UNREAD]);
    const favoriteSet = new Set(tagToMailDict[FAVORITE]);
    return rawMailList.map((mail) => ({
      ...mail,
      isFavorited: favoriteSet.has(mail.id),
      isUnread: unreadSet.has(mail.id),
      tags: mailToTagDict[mail.id] || [],
    }));
  });

  return (): MailListResult => {
    const [mailList] = useAtom(mailListAtom);
    const [mailBodyDict] = useAtom(mailBodyDictAtom);
    const [tagToMailDict] = useAtom(tagToMailDictAtom);

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
      if (MEMBER_LIST.includes(tag)) {
        return (mail) => toOriginalName(mail.member) === tag;
      }

      if (tag === "" || tagToMailDict[tag] === undefined) {
        return () => true;
      }
      return (mail) => tagToMailDict[tag].includes(mail.id);
    };

    console.log("useMailList");
    return {
      mailList: (mode, tag) => {
        console.log(mode, tag, "computed");
        return useMemo(
          () =>
            mailList.filter((item) => byMode(mode)(item) && byTag(tag)(item)),
          [mailList, mode, tag]
        );
      },
      mailById: (id) => mailBodyDict[id] || { body: "", images: [] },
    };
  };
};

const useMailList = createUseMailList(fakeMailRepository);

export default useMailList;
