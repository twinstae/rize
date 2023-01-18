import { atom, useAtom } from 'jotai';

export const currentTagAtom = atom('');
function useTag() {
	return useAtom(currentTagAtom);
}

export default useTag;
