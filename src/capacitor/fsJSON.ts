import { Directory, Encoding, Filesystem } from '@capacitor/filesystem';

import { JsonValue } from '../types/json';

const readJSONfile = (path: string) =>
	Filesystem.readFile({
		path: 'output/' + path,
		directory: Directory.Cache,
		encoding: Encoding.UTF8,
	}).then((result) => JSON.parse(result.data));

const writeJSONfile = (path: string) => async (dict: JsonValue): Promise<void> => {
	return Filesystem.writeFile({
		path: 'output/' + path,
		data: JSON.stringify(dict),
		directory: Directory.Cache,
		encoding: Encoding.UTF8,
	})
		.catch(() => {
			return Filesystem.mkdir({
				path: 'output',
				directory: Directory.Cache,
			})
				.catch((error) => {
					if (error.message === 'Current directory does already exist.') return;
					throw error;
				})
				.then(() => writeJSONfile(path)(dict));
		})
		.then(() => undefined);
};

const fsJSON = {
	writeJSONfile,
	readJSONfile,
};

export default fsJSON;
