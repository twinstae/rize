
import useConfig from '../config/useConfig';

const profileList: readonly string[] = [
  'la-vie-en-rose',
  'violeta',
  'fiesta',
  // "secret-diary-id",
  'the-secret-story-of-swan',
  'panorama',
  'eating-trip-3',
  'birthday',
  'one-the-story',
  // "latest",
  // "instagram"
];

function useProfile() {
  
  const config = useConfig();

  return {
    profile: (config.get('profile') ?? 'one-the-story') as string,
    setProfile: (value: string) => {
      if(! profileList.includes(value)) throw Error(value + '는 프로필 목록에 없습니다');
      config.set('profile', value);
    },
    profileList
  };
}

export default useProfile;