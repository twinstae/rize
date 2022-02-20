import { useQuery, UseQueryResult } from "react-query";
import fakeMailRepository from "./fakeMailRepository";

interface MailListResult {
  mailList: UseQueryResult<MailT[], Error>;
  mailById: (id: string) => UseQueryResult<MailBodyT | undefined, Error>;
}

export const createUseMailList =
  (mailRepository: MailRepository) => (): MailListResult => {
    return {
      mailList: useQuery("MailList", () => mailRepository.getAllMailList()),
      mailById: (id) =>
        useQuery("MailBodyDict", () => mailRepository.getMailBodyDict(), {
          select: (mailBodyDict) => mailBodyDict[id],
        }),
    };
  };

const useMailList = createUseMailList(fakeMailRepository);

export default useMailList;
