import { readTextFile, writeTextFile, BaseDirectory } from '@tauri-apps/plugin-fs';

import { JsonValue } from '../types/json';

const cache = new Map();

const readJSONfile = async (path: string) => {
	if (cache.has(path)) {
		return cache.get(path);
	}
	return readTextFile('output/' + path, {
		baseDir: BaseDirectory.Download,
	})
		.then(JSON.parse)
		.then((data) => {
			cache.set(path, data);
			return data;
		})
		.finally(() => console.log('loaded', path));
};

const writeJSONfile =
	(path: string) =>
	async (dict: JsonValue): Promise<void> => {
		return writeTextFile('output/' + path, JSON.stringify(dict), {
			baseDir: BaseDirectory.Download,
		}).then(() => {
			cache.set(path, dict);
		});
	};

const fsJSON = {
	readJSONfile,
	writeJSONfile,
};

export default fsJSON;
