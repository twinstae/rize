import { Directory, Filesystem } from '@capacitor/filesystem';

import { debugLogger, withDebugLog } from '../debug/debugLog';
import { fileList } from '../mailList/fakeMailRepository';
import { MailRepository } from '../mailList/types';
import fsJSON from './fsJSON';

const logger = debugLogger.fs();

const { readJSONfile, writeJSONfile } = fsJSON;
const fsMailRepository: MailRepository = {
	getAllMailList: async () => readJSONfile('pm_list.json'),
	getMailBodyDict: async () => readJSONfile('mail_body_dict.json'),
	getTagToMailDict: async () => readJSONfile('tag_to_mail_dict.json'),
	getMemberNameDict: async () => readJSONfile('member_name.json'),
	saveTagToMailDict: writeJSONfile('tag_to_mail_dict.json'),
	status: async () =>
		withDebugLog(logger, 'readdir', { path: 'output', direction: 'in' }, () =>
			Filesystem.readdir({
				path: 'output',
				directory: Directory.Cache,
			}).then((result) =>
				Object.fromEntries(fileList.map((name) => [name, result.files.map((f) => f.name).includes(name)])),
			),
		),
};

export default fsMailRepository;
