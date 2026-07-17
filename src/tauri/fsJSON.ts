import { readTextFile, writeTextFile, BaseDirectory } from '@tauri-apps/plugin-fs';

import { debugLogger, summarizeValue, withDebugLog } from '../debug/debugLog';
import { JsonValue } from '../types/json';

const cache = new Map();
const logger = debugLogger.fs();

const readJSONfile = async (path: string) => {
	if (cache.has(path)) {
		logger.debug('read cache hit {path}', { path, direction: 'in' });
		return cache.get(path);
	}
	return withDebugLog(logger, 'readJSONfile', { path, direction: 'in' }, () =>
		readTextFile('output/' + path, {
			baseDir: BaseDirectory.Download,
		})
			.then(JSON.parse)
			.then((data) => {
				cache.set(path, data);
				return data;
			}),
	);
};

const writeJSONfile =
	(path: string) =>
	async (dict: JsonValue): Promise<void> => {
		return withDebugLog(
			logger,
			'writeJSONfile',
			{ path, direction: 'out', payload: summarizeValue(dict) },
			() =>
				writeTextFile('output/' + path, JSON.stringify(dict), {
					baseDir: BaseDirectory.Download,
				}).then(() => {
					cache.set(path, dict);
				}),
		);
	};

const fsJSON = {
	readJSONfile,
	writeJSONfile,
};

export default fsJSON;
