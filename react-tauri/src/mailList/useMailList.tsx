import { useQuery, UseQueryResult } from "react-query";
import fakeMailRepository from "./fakeMailRepository";

interface MailListResult {
  mailList: (mode: TabMode) => UseQueryResult<MailT[], Error>;
  mailById: (id: string) => UseQueryResult<MailBodyT | undefined, Error>;
}

const select: Record<TabMode, (items: MailT[]) => MailT[]> = {
  all: (items: MailT[]) => items,
  unread: (items: MailT[]) => items,
  favorite: (items: MailT[]) => items,
};

export const createUseMailList =
  (mailRepository: MailRepository) => (): MailListResult => {
    return {
      mailList: (mode) =>
        useQuery("MailList", () => mailRepository.getAllMailList(), {
          staleTime: 1000 * 60 * 60,
          suspense: true,
          select: select[mode],
        }),
      mailById: (id) =>
        useQuery("MailBodyDict", () => mailRepository.getMailBodyDict(), {
          select: (mailBodyDict) => mailBodyDict[id],
          staleTime: 1000 * 60 * 60,
          suspense: true,
        }),
    };
  };

const useMailList = createUseMailList(fakeMailRepository);

export default useMailList;
