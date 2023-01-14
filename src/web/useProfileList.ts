import { atom, useAtomValue } from 'jotai';

async function getProfileList(){
  return [
    'la-vie-en-rose',
    'violeta',
    'fiesta',
    'secret-diary-id',
    'the-secret-story-of-swan',
    'panorama',
    'eating-trip-3',
    'birthday',
    'one-the-story',
    'latest',
    'instagram'
  ];
}

const profileListAtom = atom(getProfileList);
export default function useProfileList(): string[]{
  return useAtomValue(profileListAtom);
}