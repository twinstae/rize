import { atom, useAtomValue } from 'jotai';
import { readDir, BaseDirectory } from '@tauri-apps/plugin-fs';
import filterTruthy from '../filterTruthy';

async function getProfileList() {
	return readDir('output/img/profile', {
		dir: BaseDirectory.Download,
	})
		.then((entries) =>
			filterTruthy(entries.filter((entry) => entry.children !== undefined).map((entry) => entry.name)),
		);
}

const profileListAtom = atom(getProfileList);
export default function useFsProfileList(): string[] {
	return useAtomValue(profileListAtom);
}
