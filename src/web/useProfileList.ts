import { atom, useAtomValue } from 'jotai';

const profileList = [
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
	'instagram',
] as const;

const profileListAtom = atom([...profileList]);
export default function useProfileList(): string[] {
	return useAtomValue(profileListAtom);
}
