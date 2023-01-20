import { Directory, Encoding, Filesystem } from '@capacitor/filesystem';

import { JsonValue } from '../types/json';
const directory = Directory.Cache;
const readJSONfile = (path: string) =>
	Filesystem.readFile({
		path: 'output/' + path,
		directory,
		encoding: Encoding.UTF8,
	}).then((result) => JSON.parse(result.data));

const writeJSONfile = (path: string) => async (dict: JsonValue): Promise<void> => {
	console.log(dict);
	return Filesystem.writeFile({
		path: 'output/' + path,
		data: JSON.stringify(dict),
		directory,
		encoding: Encoding.UTF8,
	})
		.catch((e) => {
			if (e.message.includes('NO_DATA')){
				throw e;
			}
			return Filesystem.mkdir({
				path: 'output',
				directory,
				recursive: true,
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
