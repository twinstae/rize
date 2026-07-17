import { atom, useAtomValue } from 'jotai';
import { readDir, BaseDirectory } from '@tauri-apps/plugin-fs';
import { debugLogger, withDebugLog } from '../debug/debugLog';
import filterTruthy from '../filterTruthy';

const logger = debugLogger.fs();

async function getProfileList() {
	return withDebugLog(logger, 'readDir', { path: 'output/img/profile', direction: 'in' }, () =>
		readDir('output/img/profile', {
			baseDir: BaseDirectory.Download,
		}).then((entries) => filterTruthy(entries.filter((entry) => entry.isDirectory).map((entry) => entry.name))),
	);
}

const profileListAtom = atom(getProfileList);
export default function useFsProfileList(): string[] {
	return useAtomValue(profileListAtom);
}
