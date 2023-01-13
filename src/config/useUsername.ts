import { UsernameT } from '../global';
import useConfig from './useConfig';

const USERNAME_KEY = 'username';

export const useUsername: () => UsernameT = () => {
  const [[before, after], setUsername] = useConfig<[string, string]>(USERNAME_KEY, ['{_nickname_}', '위즈원']);

  const regex = new RegExp(before, 'g');
  return {
    before,
    after,
    setBefore: (newBefore: string) => {
      setUsername([newBefore, after]);
    },
    setAfter: (newAfter: string) => {
      setUsername([before, newAfter]);
    },
    replaceUsername: (text: string) => text.replace(regex, after),
  };
};

export default useUsername;
