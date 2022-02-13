import { useEffect, useState } from "react";

interface MailListQuery {
  data: undefined | MailT[];
  isLoading: boolean;
}

export const createUseMailList: (
  mailRepository: MailRepository
) => () => MailListQuery = (mailRepository) => () => {
  const [data, setData] = useState(undefined as undefined | MailT[]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    mailRepository
      .getAllMailList()
      .then(setData)
      .finally(() => setIsLoading(false));
  }, []);

  return {
    data,
    isLoading,
  };
};
