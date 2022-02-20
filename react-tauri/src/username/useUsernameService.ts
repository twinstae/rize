import fakeStorageRepo from "./fakeStorageRepo";
import useConfig from "./useConfig";

const USERNAME_KEY = "username";

export const createUseUsernameService: (
  repo: StorageRepository
) => () => UsernameServiceT = (repo) => () => {
  const query = useConfig(repo);

  const [before, after] =
    query.data && query.data[USERNAME_KEY]
      ? query.data[USERNAME_KEY]
      : ["<위즈원>", "위즈원"];

  const regex = new RegExp(before, "g");
  return {
    isSuccess: query.isSuccess,
    before,
    after,
    mutation: query.mutation,
    setBefore: (newBefore: string) => {
      query.mutation.mutate({ key: USERNAME_KEY, value: [newBefore, after] });
    },
    setAfter: (newAfter: string) => {
      query.mutation.mutate({ key: USERNAME_KEY, value: [before, newAfter] });
    },
    replaceUsername: (text: string) => text.replace(regex, after),
  };
};

const useUsernameService = createUseUsernameService(fakeStorageRepo);

export default useUsernameService;
