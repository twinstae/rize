import { atom, useAtom } from 'jotai';

const currentTagAtom = atom('');
function useTag(){
  return useAtom(currentTagAtom);
}

export default useTag;