import { useQuery, UseQueryResult } from "react-query";

export const createUseMailList =
  (mailRepository: MailRepository) => (): UseQueryResult<MailT[], Error> => {
    return useQuery("MailList", () => mailRepository.getAllMailList());
  };
