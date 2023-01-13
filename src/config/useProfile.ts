
import useConfig from '../config/useConfig';
import { useDependencies } from '../hooks/Dependencies';

function useProfile() {
  const profileList = useDependencies().useProfileList();
  const config = useConfig();

  return {
    profileList, 
    profile: (config.get('profile') ?? 'one-the-story') as string,
    setProfile: (value: typeof profileList[number]) => {
      config.set('profile', value);
    }
  };
}

export default useProfile;
