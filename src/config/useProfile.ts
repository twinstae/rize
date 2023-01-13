
import useConfig from '../config/useConfig';
import { useDependencies } from '../hooks/Dependencies';

function useProfile() {
  const profileList = useDependencies().useProfileList();
  const [profile, setProfile] = useConfig<string>('profile', 'one-the-story');

  return {
    profileList, 
    profile: profile as string,
    setProfile: (value: typeof profileList[number]) => {
      setProfile(value);
    }
  };
}

export default useProfile;
