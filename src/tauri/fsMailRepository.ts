import { readDir, BaseDirectory } from '@tauri-apps/plugin-fs';

import { fileList } from '../mailList/fakeMailRepository';
import { MailRepository } from '../mailList/types';
import fsJSON from './fsJSON';

const { readJSONfile, writeJSONfile } = fsJSON;

const fsMailRepository: MailRepository = {
	getAllMailList: async () => readJSONfile('pm_list.json'),
	getMailBodyDict: async () => readJSONfile('mail_body_dict.json'),
	getTagToMailDict: async () => readJSONfile('tag_to_mail_dict.json'),
	getMemberNameDict: async () => readJSONfile('member_name.json'),
	saveTagToMailDict: writeJSONfile('tag_to_mail_dict.json'),
	status: async () =>
		readDir('output', {
			dir: BaseDirectory.Download,
			recursive: false,
		})
			.then((result) => {
				const nameList = result.map((entry) => entry.name);
				return Object.fromEntries(fileList.map((name) => [name, nameList.includes(name)]));
			}),
};

export default fsMailRepository;
