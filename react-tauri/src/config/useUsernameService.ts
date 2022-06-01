import { UsernameServiceT } from "../global";
import useConfig, { ConfigT, useFakeConfig } from "./useConfig";

const USERNAME_KEY = "username";

export const createUseUsernameService: (
  useConfig: () => ConfigT
) => () => UsernameServiceT = () => () => {
  const config = useConfig();

  const [before, after] = (config.get(USERNAME_KEY) ?? ["{_nickname_}", "위즈원"])  as [string, string];

  const regex = new RegExp(before, "g");
  return {
    before,
    after,
    setBefore: (newBefore: string) => {
      config.set(USERNAME_KEY, [newBefore, after]);
    },
    setAfter: (newAfter: string) => {
      config.set(USERNAME_KEY, [before, newAfter]);
    },
    replaceUsername: (text: string) => text.replace(regex, after),
  };
};

export const usefakeUserNameService = createUseUsernameService(useFakeConfig);

const useUsernameService = createUseUsernameService(useConfig);

export default useUsernameService;
