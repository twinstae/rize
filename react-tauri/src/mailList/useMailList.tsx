import { Atom, atom, useAtom } from "jotai";
import { useMemo } from "react";
import { useQuery, UseQueryResult } from "react-query";
import { MEMBER_LIST, toOriginalName } from "../constants";
import fakeMailRepository from "./fakeMailRepository";

interface MailListResult {
  mailList: (mode: TabMode, tag: string) => UseQueryResult<MailT[], Error>;
  mailById: (id: string) => UseQueryResult<MailBodyT | undefined, Error>;
}

const STALE_TIME = 1000 * 60 * 60;
const UNREAD = "읽지 않음";
const FAVORITE = "💖";

const atomWithAsyncInit: <T>(init: () => Promise<T>, fallback: T) => Atom<T> = (
  init,
  fallback
) => {
  const baseAtom = atom(fallback);
  baseAtom.onMount = (setValue) => {
    init().then(setValue);
  };

  return baseAtom;
};

export const createUseMailList = (mailRepository: MailRepository) => {
  const tagToMailDictAtom = atomWithAsyncInit(mailRepository.getTagToMailDict, {
    [UNREAD]: [],
    [FAVORITE]: [],
  });

  const unreadMailSetAtom = atom(
    (get) => new Set(get(tagToMailDictAtom)[UNREAD])
  );
  const favotireMailSetAtom = atom(
    (get) => new Set(get(tagToMailDictAtom)[FAVORITE])
  );

  return (): MailListResult => {
    const [tagToMailDict] = useAtom(tagToMailDictAtom);
    const [unreadMailSet] = useAtom(unreadMailSetAtom);
    const [favotireMailSet] = useAtom(favotireMailSetAtom);

    const byMode: (mode: TabMode) => (item: MailT) => boolean = (mode) => {
      if (mode === "unread") {
        return (mail) => unreadMailSet.has(mail.id);
      }
      if (mode === "favorite") {
        return (mail) => favotireMailSet.has(mail.id);
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

    return {
      mailList: (mode, tag) => {
        return useQuery("MailList", () => mailRepository.getAllMailList(), {
          staleTime: STALE_TIME,
          suspense: true,
          select: (items) =>
            items.filter((item) => byMode(mode)(item) && byTag(tag)(item)),
        });
      },
      mailById: (id) =>
        useQuery("MailBodyDict", () => mailRepository.getMailBodyDict(), {
          staleTime: STALE_TIME,
          suspense: true,
          select: (mailBodyDict) => mailBodyDict[id],
        }),
    };
  };
};

const useMailList = createUseMailList(fakeMailRepository);

export default useMailList;
