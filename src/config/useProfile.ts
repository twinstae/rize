
import useConfig from '../config/useConfig';

export const profileList = [
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
] as const;

function useProfile() {
  const config = useConfig();

  return {
    profile: (config.get('profile') ?? 'one-the-story') as string,
    setProfile: (value: typeof profileList[number]) => {
      config.set('profile', value);
    }
  };
}

export default useProfile;
