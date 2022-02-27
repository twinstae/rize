import { Atom, atom, useAtom } from "jotai";
import { MEMBER_LIST, toOriginalName } from "../constants";
import atomWithAsyncInit from "../hooks/atomWithAsyncInit";
import fakeMailRepository from "./fakeMailRepository";

interface MailListResult {
  mailList: (mode: TabMode, tag: string) => MailT[];
  mailById: (id: string) => MailBodyT;
  tagsById: (id: string) => string[];
  isFavoritedById: (id: string) => boolean;
  isUnreadById: (id: string) => boolean;
}

const STALE_TIME = 1000 * 60 * 60;
const UNREAD = "읽지 않음";
const FAVORITE = "💖";

export const createUseMailList = (mailRepository: MailRepository) => {
  const mailListAtom = atomWithAsyncInit(mailRepository.getAllMailList, []);
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

  const unreadMailSetAtom = atom(
    (get) => new Set(get(tagToMailDictAtom)[UNREAD])
  );
  const favotireMailSetAtom = atom(
    (get) => new Set(get(tagToMailDictAtom)[FAVORITE])
  );

  return (): MailListResult => {
    const [mailList] = useAtom(mailListAtom);
    const [mailBodyDict] = useAtom(mailBodyDictAtom);
    const [tagToMailDict] = useAtom(tagToMailDictAtom);
    const [mailToTagDict] = useAtom(mailToTagDictAtom);
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
        return mailList.filter(
          (item) => byMode(mode)(item) && byTag(tag)(item)
        );
      },
      mailById: (id) => mailBodyDict[id] || {},
      tagsById: (id) => mailToTagDict[id] || [],
      isFavoritedById: (id) => favotireMailSet.has(id),
      isUnreadById: (id) => unreadMailSet.has(id),
    };
  };
};

const useMailList = createUseMailList(fakeMailRepository);

export default useMailList;
