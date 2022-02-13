import { useQuery } from "react-query";

export const createUseMailList =
  (mailRepository: MailRepository) => (): ReturnType<typeof useQuery> => {
    return useQuery("MailList", () => mailRepository.getAllMailList());
  };
