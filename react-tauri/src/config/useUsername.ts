import { UsernameT } from '../global';
import useConfig from './useConfig';

const USERNAME_KEY = 'username';

export const useUsername: () => UsernameT = () => {
  const config = useConfig();

  const [before, after] = (config.get(USERNAME_KEY) ?? ['{_nickname_}', '위즈원'])  as [string, string];

  const regex = new RegExp(before, 'g');
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

export default useUsername;
