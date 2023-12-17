import { readTextFile, writeTextFile, BaseDirectory } from '@tauri-apps/plugin-fs';

import { JsonValue } from '../types/json';

const cache = new Map();

const readJSONfile = async (path: string) => {
	if (cache.has(path)) {
		return cache.get(path);
	}
	return readTextFile('output/' + path, {
		dir: BaseDirectory.Download,
	})
		.then(JSON.parse)
		.then((data) => {
			cache.set(path, data);
			return data;
		})
		.finally(() => console.log('loaded', path));
};

const writeJSONfile = (path: string) => async (dict: JsonValue): Promise<void> => {
	return writeTextFile(
		{
			path: 'output/' + path,
			contents: JSON.stringify(dict),
		},
		{
			dir: BaseDirectory.Download,
		},
	)
		.then(() => {
			cache.set(path, dict);
		});
};

const fsJSON = {
	readJSONfile,
	writeJSONfile,
};

export default fsJSON;
