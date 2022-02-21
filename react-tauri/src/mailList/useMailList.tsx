import { useQuery, UseQueryResult } from "react-query";
import fakeMailRepository from "./fakeMailRepository";

interface MailListResult {
  mailList: UseQueryResult<MailT[], Error>;
  mailById: (id: string) => UseQueryResult<MailBodyT | undefined, Error>;
}

export const createUseMailList =
  (mailRepository: MailRepository) => (): MailListResult => {
    return {
      mailList: useQuery("MailList", () => mailRepository.getAllMailList(), {
        staleTime: 1000 * 60 * 60,
        suspense: true,
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
