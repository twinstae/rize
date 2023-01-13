import { atom, useAtomValue } from 'jotai';
import { Directory, Filesystem } from '@capacitor/filesystem';

async function getProfileList(){
  return Filesystem.readdir({
    path: 'output/img/profile',
    directory: Directory.Cache,
  })
    .then(result => result.files.map(f => f.name));
}

const profileListAtom = atom(getProfileList);
export default function useFsProfileList(): string[]{
  return useAtomValue(profileListAtom);
}