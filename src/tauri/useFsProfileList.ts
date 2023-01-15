import { atom, useAtomValue } from 'jotai';
import { fs } from '@tauri-apps/api';
import filterTruthy from '../filterTruthy';

async function getProfileList(){
  return fs.readDir('output/img/profile', {
    dir: fs.BaseDirectory.Download
  })
    .then(entries => filterTruthy(entries.map(entry => entry.name)));
}

const profileListAtom = atom(getProfileList);
export default function useFsProfileList(): string[]{
  return useAtomValue(profileListAtom);
}