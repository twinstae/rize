import { atom, useAtomValue } from "jotai";
import { fs } from '@tauri-apps/api';

async function getProfileList(){
    return fs.readDir('output/img/profile', {
        dir: fs.BaseDirectory.Download
    })
    .then(entries => entries.map(entry => entry.name ?? '').filter(name => name))
    .catch(() => ['la-vie-en-rose', 'instagram']);
}

const profileListAtom = atom(getProfileList);
export default function useFsProfileList(): string[]{
    return useAtomValue(profileListAtom);
}